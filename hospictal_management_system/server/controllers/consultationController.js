import Consultation from "../models/Consultation.js";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import AuditLog from "../models/AuditLog.js";

export const createConsultation = async (req, res) => {
  try {
    const {
      appointmentId,
      patientId,
      chiefComplaint,
      symptoms,
      vitals,
      diagnosis,
      clinicalNotes,
      treatmentPlan
    } = req.body;

    if (!appointmentId || !patientId || !chiefComplaint || !diagnosis) {
      return res.status(400).json({ message: "Appointment, Patient, Chief Complaint, and Diagnosis are required." });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found." });

    const consultation = await Consultation.create({
      appointment: appointmentId,
      patient: patientId,
      doctor: req.user._id,
      chiefComplaint,
      symptoms,
      vitals: vitals || {},
      diagnosis,
      clinicalNotes,
      treatmentPlan
    });

    // Update appointment status to Completed
    appointment.status = "Completed";
    await appointment.save();

    await AuditLog.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: req.user.role,
      action: "CONSULTATION_COMPLETED",
      module: "DOCTOR",
      details: `Completed consultation for appointment ${appointment.appointmentId}`
    }).catch(err => console.error(err.message));

    const populated = await Consultation.findById(consultation._id)
      .populate("patient", "patientId name age gender")
      .populate("doctor", "name empId specialization")
      .populate("appointment");

    return res.status(201).json({
      success: true,
      message: "Consultation saved successfully.",
      consultation: populated
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConsultations = async (req, res) => {
  try {
    const { patient, doctor } = req.query;
    let filter = {};

    if (patient) filter.patient = patient;
    if (doctor) filter.doctor = doctor;
    // If doctor role, limit to doctor's own consultations unless specified
    if (req.user.role === "DOCTOR" && !patient) {
      filter.doctor = req.user._id;
    }

    const consultations = await Consultation.find(filter)
      .populate("patient", "patientId name age gender bloodGroup phone")
      .populate("doctor", "name empId specialization")
      .populate("appointment", "appointmentId date time")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: consultations.length, consultations });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
