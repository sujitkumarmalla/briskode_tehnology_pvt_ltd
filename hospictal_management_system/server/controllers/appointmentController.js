import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { generateAppointmentId } from "../utils/generateId.js";

export const getAppointments = async (req, res) => {
  try {
    const { doctor, patient, date, status, department } = req.query;
    let filter = {};

    if (doctor) filter.doctor = doctor;
    if (patient) filter.patient = patient;
    if (status) filter.status = status;
    if (department) filter.department = department;

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const appointments = await Appointment.find(filter)
      .populate("patient", "patientId name age gender phone bloodGroup")
      .populate("doctor", "name empId specialization consultationFee")
      .populate("department", "name")
      .sort({ date: 1, time: 1 });

    return res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, departmentId, date, time, reason } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ message: "Patient, Doctor, Date, and Time slot are required." });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient record not found." });

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "DOCTOR") return res.status(404).json({ message: "Doctor not found." });

    // Check for double booking
    const apptDate = new Date(date);
    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: apptDate,
      time,
      status: { $nin: ["Cancelled", "No Show"] }
    });

    if (existing) {
      return res.status(400).json({ message: `Doctor ${doctor.name} is already booked at ${time} on selected date.` });
    }

    const count = await Appointment.countDocuments();
    const appointmentId = generateAppointmentId(count);

    const appointment = await Appointment.create({
      appointmentId,
      patient: patientId,
      doctor: doctorId,
      department: departmentId || doctor.department,
      date: apptDate,
      time,
      reason,
      status: "Scheduled",
      createdBy: req.user?._id
    });

    const populated = await Appointment.findById(appointment._id)
      .populate("patient", "patientId name age gender phone")
      .populate("doctor", "name empId specialization")
      .populate("department", "name");

    return res.status(201).json({
      success: true,
      message: `Appointment booked successfully. ID: ${appointmentId}`,
      appointment: populated
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkInAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate("patient doctor");
    if (!appointment) return res.status(404).json({ message: "Appointment not found." });

    // Generate daily token number (e.g., A-001, A-002)
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCount = await Appointment.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "Checked-In"
    });

    const tokenNumber = `A-${String(todayCount + 1).padStart(3, "0")}`;

    appointment.status = "Checked-In";
    appointment.tokenNumber = tokenNumber;
    await appointment.save();

    // Create notification for Doctor
    await Notification.create({
      recipient: appointment.doctor._id.toString(),
      title: "Patient Checked-In",
      message: `Patient ${appointment.patient.name} (${appointment.patient.patientId}) has checked in. Token: ${tokenNumber}`,
      type: "appointment"
    });

    return res.status(200).json({
      success: true,
      message: `Patient checked in. Token: ${tokenNumber}`,
      appointment
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found." });

    appointment.status = status;
    await appointment.save();

    return res.status(200).json({ success: true, message: `Status updated to ${status}`, appointment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
