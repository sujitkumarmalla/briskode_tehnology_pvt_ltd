import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import bedRoutes from "./routes/bedRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

import Doctor from "./models/Doctor.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

// API Endpoint Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/billing", billRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/audit", auditRoutes);

// Comprehensive Doctors API endpoints (fetching from both User & Doctor models)
app.get("/api/doctors", async (req, res) => {
  try {
    const userDocs = await User.find({ role: "DOCTOR" }).populate("department", "name").sort({ createdAt: -1 });
    const doctorDocs = await Doctor.find().sort({ createdAt: -1 });

    const doctorMap = new Map();

    // Populate from Doctor collection
    doctorDocs.forEach((d) => {
      const key = d.email ? d.email.toLowerCase().trim() : String(d.id || d._id);
      doctorMap.set(key, {
        _id: d._id,
        id: d.id || d._id,
        name: d.name,
        email: d.email || "",
        phone: d.phone || "",
        specialization: d.specialization || "General Specialist",
        department: typeof d.department === "object" ? d.department?.name : (d.department || "General Medicine"),
        qualification: d.qualification || "MBBS, MD",
        experience: d.experience || 5,
        consultationFee: d.consultationFee || 500,
        workingHours: d.availability || "09:00 AM - 05:00 PM",
        availability: d.availability || "Mon - Fri",
        profileImage: d.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
        image: d.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
        isActive: d.status === "Available",
        status: d.status || "Available"
      });
    });

    // Populate and merge from User collection (where role === 'DOCTOR')
    userDocs.forEach((u) => {
      const key = u.email ? u.email.toLowerCase().trim() : String(u._id);
      const existing = doctorMap.get(key) || {};
      const deptName = u.department?.name || (typeof u.department === "string" ? u.department : "General Medicine");
      doctorMap.set(key, {
        ...existing,
        _id: u._id,
        id: u._id,
        empId: u.empId,
        name: u.name,
        email: u.email,
        phone: u.phone || existing.phone || "",
        specialization: u.specialization || existing.specialization || "General Specialist",
        department: deptName,
        qualification: u.qualification || existing.qualification || "MBBS, MD",
        experience: u.experience || existing.experience || 5,
        consultationFee: u.consultationFee || existing.consultationFee || 500,
        workingHours: u.workingHours || existing.workingHours || "09:00 AM - 05:00 PM",
        profileImage: u.profileImage || existing.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
        image: u.profileImage || existing.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
        isActive: u.isActive ?? true,
        status: u.isActive ? "Available" : "On Leave"
      });
    });

    const doctors = Array.from(doctorMap.values());
    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
      staff: doctors,
      data: doctors
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/doctors", async (req, res) => {
  try {
    const { name, email, phone, specialization, department, qualification, experience, consultationFee, workingHours, profileImage } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Doctor name and email are required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: cleanEmail });

    if (!user) {
      const count = await User.countDocuments({ role: "DOCTOR" });
      const empId = `DOC${String(count + 1).padStart(3, "0")}`;
      const hashedPassword = await bcrypt.hash("doc123", 10);
      user = await User.create({
        empId,
        name,
        email: cleanEmail,
        phone,
        password: hashedPassword,
        role: "DOCTOR",
        specialization,
        qualification,
        experience,
        consultationFee: consultationFee || 500,
        workingHours: workingHours || "09:00 AM - 05:00 PM",
        profileImage: profileImage || undefined,
        isActive: true
      });
    }

    let docObj = await Doctor.findOne({ email: cleanEmail });
    if (!docObj) {
      docObj = await Doctor.create({
        id: Date.now() + Math.floor(Math.random() * 1000),
        name,
        email: cleanEmail,
        phone,
        specialization: specialization || "General Specialist",
        department: typeof department === "string" ? department : "General Medicine",
        qualification: qualification || "MBBS, MD",
        experience: Number(experience) || 5,
        consultationFee: Number(consultationFee) || 500,
        availability: workingHours || "09:00 AM - 05:00 PM",
        status: "Available",
        image: profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
      });
    }

    const doctorData = {
      _id: user._id,
      id: user._id,
      empId: user.empId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      specialization: user.specialization,
      department: typeof department === "string" ? department : "General Medicine",
      qualification: user.qualification,
      experience: user.experience,
      consultationFee: user.consultationFee,
      workingHours: user.workingHours,
      profileImage: user.profileImage,
      image: user.profileImage,
      isActive: true,
      status: "Available"
    };

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor: doctorData,
      data: doctorData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Hospital Management System Backend API Active", time: new Date() });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Hospital Management System API Server running on port ${PORT}`);
});

export default app;
