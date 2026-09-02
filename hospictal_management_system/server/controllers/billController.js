import Bill from "../models/Bill.js";
import Patient from "../models/Patient.js";
import { generateInvoiceNumber } from "../utils/generateId.js";
import AuditLog from "../models/AuditLog.js";

export const getBills = async (req, res) => {
  try {
    const { patient, paymentStatus, search } = req.query;
    let filter = {};

    if (patient) filter.patient = patient;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    if (search) {
      filter.$or = [
        { invoiceNumber: { $regex: search, $options: "i" } }
      ];
    }

    const bills = await Bill.find(filter)
      .populate("patient", "patientId name age gender phone")
      .populate("generatedBy", "name empId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: bills.length, bills });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const generateBill = async (req, res) => {
  try {
    const { patientId, appointmentId, services, discount = 0, tax = 0, paymentMethod } = req.body;

    if (!patientId || !services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: "Patient and at least one billable service line item are required." });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient record not found." });

    let subtotal = 0;
    const formattedServices = services.map(s => {
      const price = Number(s.price) || 0;
      const quantity = Number(s.quantity) || 1;
      const amount = price * quantity;
      subtotal += amount;
      return {
        name: s.name,
        category: s.category || "Consultation",
        price,
        quantity,
        amount
      };
    });

    const numDiscount = Number(discount) || 0;
    const numTax = Number(tax) || 0;
    const total = Math.max(0, subtotal - numDiscount + numTax);

    const count = await Bill.countDocuments();
    const invoiceNumber = generateInvoiceNumber(count);

    const bill = await Bill.create({
      invoiceNumber,
      patient: patientId,
      appointment: appointmentId || undefined,
      services: formattedServices,
      subtotal,
      discount: numDiscount,
      tax: numTax,
      total,
      paidAmount: 0,
      paymentStatus: "Pending",
      paymentMethod: paymentMethod || "Cash",
      generatedBy: req.user._id
    });

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "GENERATE_BILL",
      module: "BILLING",
      details: `Generated Invoice ${invoiceNumber} for ${patient.name}. Total: ₹${total}`
    }).catch(err => console.error(err.message));

    const populated = await Bill.findById(bill._id)
      .populate("patient", "patientId name age gender phone address")
      .populate("generatedBy", "name empId");

    return res.status(201).json({ success: true, message: `Invoice ${invoiceNumber} generated.`, bill: populated });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const recordPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountPaid, paymentMethod } = req.body;

    const bill = await Bill.findById(id).populate("patient");
    if (!bill) return res.status(404).json({ message: "Bill invoice not found." });

    const newPaidAmount = (bill.paidAmount || 0) + Number(amountPaid);
    bill.paidAmount = newPaidAmount;

    if (paymentMethod) bill.paymentMethod = paymentMethod;

    if (newPaidAmount >= bill.total) {
      bill.paymentStatus = "Paid";
    } else if (newPaidAmount > 0) {
      bill.paymentStatus = "Partially Paid";
    }

    await bill.save();

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "RECORD_PAYMENT",
      module: "BILLING",
      details: `Recorded payment of ₹${amountPaid} for invoice ${bill.invoiceNumber}. Status: ${bill.paymentStatus}`
    }).catch(err => console.error(err.message));

    return res.status(200).json({
      success: true,
      message: `Payment of ₹${amountPaid} recorded. Invoice status: ${bill.paymentStatus}`,
      bill
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
