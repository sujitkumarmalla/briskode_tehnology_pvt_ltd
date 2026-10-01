import Ward from "../models/Ward.js";
import Patient from "../models/Patient.js";
import AuditLog from "../models/AuditLog.js";

export const getWards = async (req, res) => {
  try {
    const wards = await Ward.find().populate("assignedPatients", "name patientId phone");
    const data = wards.map(ward => {
      const occupied = ward.assignedPatients.length;
      return {
        _id: ward._id,
        name: ward.name,
        totalSeats: ward.totalSeats,
        price: ward.price,
        occupied: occupied,
        available: ward.totalSeats - occupied,
        assignedPatients: ward.assignedPatients
      };
    });
    res.status(200).json({ success: true, wards: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addWard = async (req, res) => {
  try {
    const { name, totalSeats, price } = req.body;
    const existing = await Ward.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "Ward already exists" });
    }
    const newWard = await Ward.create({ name, totalSeats, price });
    res.status(201).json({ success: true, ward: newWard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignPatient = async (req, res) => {
  try {
    const { wardId, patientId } = req.body;
    const ward = await Ward.findById(wardId);
    if (!ward) return res.status(404).json({ success: false, message: "Ward not found" });
    
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

    if (ward.assignedPatients.length >= ward.totalSeats) {
      return res.status(400).json({ success: false, message: "No available seats in this ward" });
    }

    if (ward.assignedPatients.includes(patientId)) {
      return res.status(400).json({ success: false, message: "Patient is already assigned to this ward" });
    }

    // Assign to new ward
    ward.assignedPatients.push(patientId);
    await ward.save();

    await AuditLog.create({
      user: req.user?._id || null,
      userName: req.user?.name || "System",
      userRole: req.user?.role || "SYSTEM",
      action: "ASSIGN_WARD",
      module: "WARD_MANAGEMENT",
      details: `Assigned patient ${patient.name} to ward ${ward.name}`
    }).catch(console.error);

    res.status(200).json({ success: true, message: "Patient assigned to ward successfully", ward });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removePatient = async (req, res) => {
  try {
    const { wardId, patientId } = req.body;
    const ward = await Ward.findById(wardId);
    if (!ward) return res.status(404).json({ success: false, message: "Ward not found" });

    ward.assignedPatients = ward.assignedPatients.filter(id => id.toString() !== patientId);
    await ward.save();

    res.status(200).json({ success: true, message: "Patient removed from ward", ward });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
