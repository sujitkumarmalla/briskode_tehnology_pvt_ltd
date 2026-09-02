import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Consultation from "../models/Consultation.js";
import Prescription from "../models/Prescription.js";
import LabResult from "../models/LabResult.js";
import LabRequest from "../models/LabRequest.js";
import Bill from "../models/Bill.js";
import { generatePatientId } from "../utils/generateId.js";
import AuditLog from "../models/AuditLog.js";

export const getPatients = async (req, res) => {
  try {
    const { search, gender, bloodGroup } = req.query;
    let filter = { isActive: true };

    if (gender) filter.gender = gender;
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { patientId: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    const patients = await Patient.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: patients.length, patients });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      dob,
      phone,
      address,
      bloodGroup,
      emergencyContact,
      medicalHistory,
      allergies
    } = req.body;

    if (!name || !age || !gender || !phone) {
      return res.status(400).json({ message: "Name, age, gender, and phone number are required." });
    }

    const count = await Patient.countDocuments();
    const patientId = generatePatientId(count);

    const patient = await Patient.create({
      patientId,
      name,
      age,
      gender,
      dob,
      phone,
      address,
      bloodGroup: bloodGroup || "Unknown",
      emergencyContact,
      medicalHistory: medicalHistory || [],
      allergies: allergies || [],
      isActive: true
    });

    await AuditLog.create({
      user: req.user?._id,
      userName: req.user?.name || "Staff",
      userRole: req.user?.role || "RECEPTIONIST",
      action: "REGISTER_PATIENT",
      module: "PATIENTS",
      details: `Registered patient ${patient.name} (${patient.patientId})`
    }).catch(err => console.error(err.message));

    return res.status(201).json({
      success: true,
      message: `Patient registered successfully. Patient ID: ${patientId}`,
      patient
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient record not found." });
    }

    // Fetch related records for comprehensive history
    const appointments = await Appointment.find({ patient: id })
      .populate("doctor", "name empId specialization department")
      .populate("department", "name")
      .sort({ date: -1 });

    const consultations = await Consultation.find({ patient: id })
      .populate("doctor", "name empId specialization")
      .sort({ createdAt: -1 });

    const prescriptions = await Prescription.find({ patient: id })
      .populate("doctor", "name empId")
      .sort({ createdAt: -1 });

    const labRequests = await LabRequest.find({ patient: id })
      .populate("doctor", "name empId")
      .sort({ createdAt: -1 });

    const labResults = await LabResult.find({ patient: id })
      .populate("doctor", "name empId")
      .sort({ createdAt: -1 });

    const bills = await Bill.find({ patient: id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      patient,
      history: {
        appointments,
        consultations,
        prescriptions,
        labRequests,
        labResults,
        bills
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });

    if (!patient) {
      return res.status(404).json({ message: "Patient record not found." });
    }

    return res.status(200).json({ success: true, message: "Patient record updated.", patient });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deactivatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient record not found." });
    }

    patient.isActive = false;
    await patient.save();

    return res.status(200).json({ success: true, message: "Patient record deactivated." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
