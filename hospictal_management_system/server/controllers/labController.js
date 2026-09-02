import LabTest from "../models/LabTest.js";
import LabRequest from "../models/LabRequest.js";
import LabResult from "../models/LabResult.js";
import Notification from "../models/Notification.js";
import { generateSampleId, generateInvoiceNumber } from "../utils/generateId.js";
import AuditLog from "../models/AuditLog.js";

export const getLabCatalog = async (req, res) => {
  try {
    const catalog = await LabTest.find({ isActive: true }).sort({ name: 1 });
    return res.status(200).json({ success: true, catalog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addLabCatalogItem = async (req, res) => {
  try {
    const { testCode, name, category, price, sampleType, referenceRange, unit, description } = req.body;
    if (!testCode || !name || !price) {
      return res.status(400).json({ message: "Test Code, Name, and Price are required." });
    }

    const test = await LabTest.create({
      testCode,
      name,
      category: category || "General",
      price,
      sampleType: sampleType || "Blood",
      referenceRange,
      unit,
      description
    });

    return res.status(201).json({ success: true, message: "Lab test added to catalog.", test });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createLabRequest = async (req, res) => {
  try {
    const { patientId, appointmentId, consultationId, testName, priority, clinicalNotes } = req.body;

    if (!patientId || !testName) {
      return res.status(400).json({ message: "Patient and Test Name are required." });
    }

    const count = await LabRequest.countDocuments();
    const requestId = `LAB-REQ-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;

    const labRequest = await LabRequest.create({
      requestId,
      patient: patientId,
      doctor: req.user._id,
      appointment: appointmentId || undefined,
      consultation: consultationId || undefined,
      testName,
      priority: priority || "Normal",
      clinicalNotes,
      status: "Requested"
    });

    // Notify Laboratory staff
    await Notification.create({
      recipient: "LABORATORY",
      title: "New Lab Request",
      message: `Doctor ${req.user.name} ordered test: ${testName}`,
      type: "lab"
    });

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "CREATE_LAB_REQUEST",
      module: "DOCTOR",
      details: `Requested lab test ${testName} for patient`
    }).catch(err => console.error(err.message));

    const populated = await LabRequest.findById(labRequest._id)
      .populate("patient", "patientId name age gender phone")
      .populate("doctor", "name empId specialization");

    return res.status(201).json({
      success: true,
      message: "Lab test requested.",
      labRequest: populated
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLabRequests = async (req, res) => {
  try {
    const { status, patient, doctor, priority } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (patient) filter.patient = patient;
    if (doctor) filter.doctor = doctor;
    if (priority) filter.priority = priority;

    const requests = await LabRequest.find(filter)
      .populate("patient", "patientId name age gender phone bloodGroup")
      .populate("doctor", "name empId specialization")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: requests.length, requests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const collectSample = async (req, res) => {
  try {
    const { id } = req.params;
    const { sampleType } = req.body;

    const labReq = await LabRequest.findById(id);
    if (!labReq) return res.status(404).json({ message: "Lab request not found." });

    const sampleCount = await LabRequest.countDocuments({ sampleId: { $ne: null } });
    const sampleId = generateSampleId(sampleCount);

    labReq.status = "Sample Collected";
    labReq.sampleId = sampleId;
    labReq.sampleType = sampleType || "Blood";
    labReq.collectedBy = req.user._id;
    labReq.collectedAt = new Date();
    await labReq.save();

    return res.status(200).json({
      success: true,
      message: `Sample collected. Sample ID: ${sampleId}`,
      labRequest: labReq
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateLabRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const labReq = await LabRequest.findById(id);
    if (!labReq) return res.status(404).json({ message: "Lab request not found." });

    labReq.status = status;
    await labReq.save();

    return res.status(200).json({ success: true, message: `Status updated to ${status}`, labRequest: labReq });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const submitLabResult = async (req, res) => {
  try {
    const { labRequestId, findings, remarks } = req.body;

    if (!labRequestId || !findings || !Array.isArray(findings)) {
      return res.status(400).json({ message: "Lab Request ID and test findings are required." });
    }

    const labReq = await LabRequest.findById(labRequestId).populate("patient doctor");
    if (!labReq) return res.status(404).json({ message: "Lab request not found." });

    const count = await LabResult.countDocuments();
    const resultId = `LAB-RES-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;

    const labResult = await LabResult.create({
      resultId,
      labRequest: labReq._id,
      patient: labReq.patient._id,
      doctor: labReq.doctor._id,
      testName: labReq.testName,
      findings,
      remarks,
      technician: req.user._id,
      status: "Finalized"
    });

    // Update request status to Completed
    labReq.status = "Completed";
    await labReq.save();

    // Notify Ordering Doctor
    await Notification.create({
      recipient: labReq.doctor._id.toString(),
      title: "Lab Results Ready",
      message: `Lab result for ${labReq.patient.name} (${labReq.testName}) is now completed.`,
      type: "lab"
    });

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "SUBMIT_LAB_RESULT",
      module: "LABORATORY",
      details: `Submitted result for ${labReq.testName} (${resultId})`
    }).catch(err => console.error(err.message));

    return res.status(201).json({
      success: true,
      message: "Lab report finalized.",
      labResult
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLabResults = async (req, res) => {
  try {
    const { patient, doctor } = req.query;
    let filter = {};

    if (patient) filter.patient = patient;
    if (doctor) filter.doctor = doctor;

    const results = await LabResult.find(filter)
      .populate("patient", "patientId name age gender phone bloodGroup")
      .populate("doctor", "name empId specialization")
      .populate("technician", "name empId")
      .populate("labRequest")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: results.length, results });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
