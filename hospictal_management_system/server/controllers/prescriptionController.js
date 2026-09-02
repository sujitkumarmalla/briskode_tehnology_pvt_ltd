import Prescription from "../models/Prescription.js";
import Medicine from "../models/Medicine.js";
import PharmacySale from "../models/PharmacySale.js";
import Notification from "../models/Notification.js";
import { generatePrescriptionId, generateInvoiceNumber } from "../utils/generateId.js";
import AuditLog from "../models/AuditLog.js";

export const createPrescription = async (req, res) => {
  try {
    const { patientId, consultationId, appointmentId, medicines } = req.body;

    if (!patientId || !medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ message: "Patient and at least one prescribed medicine are required." });
    }

    const count = await Prescription.countDocuments();
    const prescriptionId = generatePrescriptionId(count);

    const prescription = await Prescription.create({
      prescriptionId,
      patient: patientId,
      consultation: consultationId || undefined,
      appointment: appointmentId || undefined,
      doctor: req.user._id,
      medicines,
      status: "Pending"
    });

    // Send notification to Pharmacy
    await Notification.create({
      recipient: "PHARMACIST",
      title: "New Prescription",
      message: `Doctor ${req.user.name} created prescription ${prescriptionId}.`,
      type: "prescription"
    });

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "CREATE_PRESCRIPTION",
      module: "DOCTOR",
      details: `Created prescription ${prescriptionId}`
    }).catch(err => console.error(err.message));

    const populated = await Prescription.findById(prescription._id)
      .populate("patient", "patientId name age gender")
      .populate("doctor", "name empId specialization");

    return res.status(201).json({
      success: true,
      message: `Prescription created. ID: ${prescriptionId}`,
      prescription: populated
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrescriptions = async (req, res) => {
  try {
    const { patient, doctor, status } = req.query;
    let filter = {};

    if (patient) filter.patient = patient;
    if (doctor) filter.doctor = doctor;
    if (status) filter.status = status;

    // If doctor role and no explicit patient filter, default to doctor's prescriptions
    if (req.user.role === "DOCTOR" && !patient) {
      filter.doctor = req.user._id;
    }

    const prescriptions = await Prescription.find(filter)
      .populate("patient", "patientId name age gender phone bloodGroup")
      .populate("doctor", "name empId specialization")
      .populate("medicines.medicine", "name category stockQuantity sellingPrice")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: prescriptions.length, prescriptions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const dispensePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, discount = 0 } = req.body;

    const prescription = await Prescription.findById(id).populate("patient doctor medicines.medicine");
    if (!prescription) return res.status(404).json({ message: "Prescription not found." });

    if (prescription.status === "Dispensed") {
      return res.status(400).json({ message: "Prescription has already been dispensed." });
    }

    // Calculate totals & update inventory stock
    let subtotal = 0;
    const saleMedicines = [];

    for (const item of prescription.medicines) {
      const qty = item.quantity || 1;
      let price = 0;

      if (item.medicine && item.medicine._id) {
        const medDoc = await Medicine.findById(item.medicine._id);
        if (medDoc) {
          if (medDoc.stockQuantity < qty) {
            return res.status(400).json({
              message: `Insufficient stock for ${medDoc.name}. Available: ${medDoc.stockQuantity}, Required: ${qty}`
            });
          }
          medDoc.stockQuantity -= qty;
          await medDoc.save();
          price = medDoc.sellingPrice || 0;
        }
      }

      const itemTotal = price * qty;
      subtotal += itemTotal;

      saleMedicines.push({
        medicine: item.medicine?._id || undefined,
        name: item.medicineName,
        quantity: qty,
        price,
        total: itemTotal
      });
    }

    const total = Math.max(0, subtotal - Number(discount));

    const salesCount = await PharmacySale.countDocuments();
    const saleId = generateInvoiceNumber(salesCount);

    // Create Pharmacy Sale record
    const sale = await PharmacySale.create({
      saleId,
      prescription: prescription._id,
      patient: prescription.patient._id,
      patientName: prescription.patient.name,
      medicines: saleMedicines,
      subtotal,
      discount,
      total,
      paymentMethod: paymentMethod || "Cash",
      soldBy: req.user._id
    });

    // Update prescription status
    prescription.status = "Dispensed";
    prescription.dispensedBy = req.user._id;
    prescription.dispensedAt = new Date();
    await prescription.save();

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "DISPENSE_PRESCRIPTION",
      module: "PHARMACY",
      details: `Dispensed prescription ${prescription.prescriptionId}. Total: ₹${total}`
    }).catch(err => console.error(err.message));

    return res.status(200).json({
      success: true,
      message: `Prescription ${prescription.prescriptionId} dispensed successfully. Invoice: ${saleId}`,
      sale,
      prescription
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
