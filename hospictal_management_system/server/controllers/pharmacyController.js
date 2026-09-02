import Medicine from "../models/Medicine.js";
import PharmacySale from "../models/PharmacySale.js";
import Notification from "../models/Notification.js";
import { generateInvoiceNumber } from "../utils/generateId.js";
import AuditLog from "../models/AuditLog.js";

export const getMedicines = async (req, res) => {
  try {
    const { search, category, lowStock, expiringSoon } = req.query;
    let filter = {};

    if (category) filter.category = category;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { genericName: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { manufacturer: { $regex: search, $options: "i" } }
      ];
    }

    if (lowStock === "true") {
      filter.$expr = { $lte: ["$stockQuantity", "$minimumStock"] };
    }

    if (expiringSoon === "true") {
      const thirtyDays = new Date();
      thirtyDays.setDate(thirtyDays.getDate() + 30);
      filter.expiryDate = { $lte: thirtyDays };
    }

    const medicines = await Medicine.find(filter).sort({ name: 1 });
    return res.status(200).json({ success: true, count: medicines.length, medicines });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addMedicine = async (req, res) => {
  try {
    const {
      name,
      genericName,
      category,
      manufacturer,
      batchNumber,
      expiryDate,
      purchasePrice,
      sellingPrice,
      stockQuantity,
      minimumStock,
      unit
    } = req.body;

    if (!name || !category || !expiryDate || sellingPrice === undefined || stockQuantity === undefined) {
      return res.status(400).json({ message: "Name, category, expiry date, selling price, and stock quantity are required." });
    }

    const medicine = await Medicine.create({
      name,
      genericName,
      category,
      manufacturer,
      batchNumber,
      expiryDate,
      purchasePrice: purchasePrice || 0,
      sellingPrice,
      stockQuantity,
      minimumStock: minimumStock || 10,
      unit: unit || "Tablets"
    });

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "ADD_MEDICINE",
      module: "PHARMACY",
      details: `Added medicine ${medicine.name} (Qty: ${medicine.stockQuantity})`
    }).catch(err => console.error(err.message));

    return res.status(201).json({ success: true, message: "Medicine added to inventory.", medicine });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ message: "Medicine not found." });

    // Check if stock low
    if (medicine.stockQuantity <= medicine.minimumStock) {
      await Notification.create({
        recipient: "PHARMACIST",
        title: "Low Stock Alert",
        message: `Medicine ${medicine.name} is running low (${medicine.stockQuantity} remaining).`,
        type: "inventory"
      });
    }

    return res.status(200).json({ success: true, message: "Medicine updated.", medicine });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Medicine deleted from inventory." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDirectSale = async (req, res) => {
  try {
    const { patientName, medicines, discount = 0, paymentMethod } = req.body;

    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ message: "At least one medicine item is required for sale." });
    }

    let subtotal = 0;
    const saleMedicines = [];

    for (const item of medicines) {
      const medDoc = await Medicine.findById(item.medicineId);
      if (!medDoc) return res.status(404).json({ message: `Medicine item not found.` });

      if (medDoc.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${medDoc.name}. Available: ${medDoc.stockQuantity}`
        });
      }

      medDoc.stockQuantity -= item.quantity;
      await medDoc.save();

      const itemTotal = medDoc.sellingPrice * item.quantity;
      subtotal += itemTotal;

      saleMedicines.push({
        medicine: medDoc._id,
        name: medDoc.name,
        quantity: item.quantity,
        price: medDoc.sellingPrice,
        total: itemTotal
      });
    }

    const total = Math.max(0, subtotal - Number(discount));
    const count = await PharmacySale.countDocuments();
    const saleId = generateInvoiceNumber(count);

    const sale = await PharmacySale.create({
      saleId,
      patientName: patientName || "Walk-in Customer",
      medicines: saleMedicines,
      subtotal,
      discount,
      total,
      paymentMethod: paymentMethod || "Cash",
      soldBy: req.user._id
    });

    return res.status(201).json({ success: true, message: "Sale completed.", sale });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPharmacySales = async (req, res) => {
  try {
    const sales = await PharmacySale.find()
      .populate("soldBy", "name empId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: sales.length, sales });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
