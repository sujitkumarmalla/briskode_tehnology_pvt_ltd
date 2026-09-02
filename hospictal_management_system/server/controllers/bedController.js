import Bed from "../models/Bed.js";
import AuditLog from "../models/AuditLog.js";

export const getBeds = async (req, res) => {
  try {
    const { status, ward, bedType } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (ward) filter.ward = ward;
    if (bedType) filter.bedType = bedType;

    const beds = await Bed.find(filter)
      .populate("assignedPatient", "patientId name age gender phone")
      .sort({ ward: 1, bedNumber: 1 });

    const total = await Bed.countDocuments();
    const available = await Bed.countDocuments({ status: "Available" });
    const occupied = await Bed.countDocuments({ status: "Occupied" });
    const reserved = await Bed.countDocuments({ status: "Reserved" });
    const maintenance = await Bed.countDocuments({ status: "Maintenance" });

    return res.status(200).json({
      success: true,
      stats: { total, available, occupied, reserved, maintenance },
      beds
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addBed = async (req, res) => {
  try {
    const { bedNumber, ward, bedType, chargePerDay } = req.body;
    if (!bedNumber || !ward) {
      return res.status(400).json({ message: "Bed Number and Ward are required." });
    }

    const existing = await Bed.findOne({ bedNumber: bedNumber.trim() });
    if (existing) return res.status(400).json({ message: "Bed number already exists." });

    const bed = await Bed.create({
      bedNumber: bedNumber.trim(),
      ward: ward.trim(),
      bedType: bedType || "General",
      chargePerDay: chargePerDay || 500,
      status: "Available"
    });

    return res.status(201).json({ success: true, message: "Bed added.", bed });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const allocateBed = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId } = req.body;

    const bed = await Bed.findById(id);
    if (!bed) return res.status(404).json({ message: "Bed not found." });

    if (bed.status === "Occupied") {
      return res.status(400).json({ message: "Bed is already occupied." });
    }

    bed.status = "Occupied";
    bed.assignedPatient = patientId;
    bed.assignedAt = new Date();
    await bed.save();

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "ALLOCATE_BED",
      module: "BED_MANAGEMENT",
      details: `Allocated Bed ${bed.bedNumber} (${bed.ward}) to patient`
    }).catch(err => console.error(err.message));

    return res.status(200).json({ success: true, message: "Bed allocated successfully.", bed });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const releaseBed = async (req, res) => {
  try {
    const { id } = req.params;
    const bed = await Bed.findById(id);
    if (!bed) return res.status(404).json({ message: "Bed not found." });

    bed.status = "Available";
    bed.assignedPatient = null;
    bed.assignedAt = null;
    await bed.save();

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "RELEASE_BED",
      module: "BED_MANAGEMENT",
      details: `Released Bed ${bed.bedNumber}`
    }).catch(err => console.error(err.message));

    return res.status(200).json({ success: true, message: "Bed released.", bed });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
