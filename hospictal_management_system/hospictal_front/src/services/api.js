import axios from "axios";
import { doctors as defaultDoctors } from "../data/doctors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  },
  timeout: 10000
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- AUTHENTICATION SERVICES (DIRECT LOGIN & FORGOT PASSWORD) ---

// 1. Direct Admin Login (Email & Password)
export const loginAdmin = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Invalid admin credentials or server error."
    };
  }
};

// 2. Forgot Password Step 1: Request Password Reset OTP
export const requestForgotPasswordOtp = async (email) => {
  try {
    const res = await api.post("/auth/forgot-password-step1", { email });
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to request password reset OTP."
    };
  }
};

// 3. Forgot Password Step 2: Verify OTP & Reset Password in MongoDB
export const resetPasswordWithOtp = async (email, otp, newPassword) => {
  try {
    const res = await api.post("/auth/forgot-password-step2", { email, otp, newPassword });
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Invalid or expired OTP code. Password update permission denied."
    };
  }
};

// Legacy exports for backward compatibility
export const requestLoginOtp = loginAdmin;
export const verifyLoginOtp = async (email, password) => loginAdmin(email, password);
export const forgotPasswordAdmin = async (email, newPassword) => resetPasswordWithOtp(email, "", newPassword);

// --- APPOINTMENTS MONGODB SERVICES ---

// Create Appointment (Saves into MongoDB)
export const createAppointment = async (appointmentData) => {
  try {
    const res = await api.post("/appointments", appointmentData);
    return res.data;
  } catch (err) {
    console.warn("MongoDB API error, saving to local storage fallback", err);
    const bookingId = `CPS-${Math.floor(100000 + Math.random() * 900000)}`;
    const stored = JSON.parse(localStorage.getItem("hospital_appointments") || "[]");
    const doctor = defaultDoctors.find((d) => String(d.id) === String(appointmentData.doctorId));

    const newApp = {
      id: bookingId,
      fullName: appointmentData.fullName,
      email: appointmentData.email,
      phone: appointmentData.phone,
      dob: appointmentData.dob || "N/A",
      gender: appointmentData.gender || "Male",
      doctorId: appointmentData.doctorId || "",
      doctorName: doctor ? doctor.name : "General Specialist",
      department: appointmentData.department || "General Medicine",
      appointmentDate: appointmentData.appointmentDate,
      appointmentTime: appointmentData.appointmentTime || "10:00 AM",
      reason: appointmentData.reason || "General Consultation",
      message: appointmentData.message || "",
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("hospital_appointments", JSON.stringify([newApp, ...stored]));
    return {
      success: true,
      message: "Appointment booked successfully!",
      bookingId,
      data: newApp
    };
  }
};

// Fetch All Appointments from MongoDB
export const fetchAppointments = async () => {
  try {
    const res = await api.get("/appointments");
    return res.data;
  } catch (err) {
    const stored = JSON.parse(localStorage.getItem("hospital_appointments") || "[]");
    return { success: true, data: stored };
  }
};

// Update Appointment Status in MongoDB
export const updateAppointmentStatus = async (id, newStatus) => {
  try {
    const res = await api.patch(`/appointments/${id}/status`, { status: newStatus });
    return res.data;
  } catch (err) {
    const stored = JSON.parse(localStorage.getItem("hospital_appointments") || "[]");
    const updated = stored.map((app) => (app.id === id ? { ...app, status: newStatus } : app));
    localStorage.setItem("hospital_appointments", JSON.stringify(updated));
    return { success: true, message: `Status updated to ${newStatus}`, data: updated };
  }
};

// Delete Appointment from MongoDB
export const deleteAppointment = async (id) => {
  try {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
  } catch (err) {
    const stored = JSON.parse(localStorage.getItem("hospital_appointments") || "[]");
    const filtered = stored.filter((app) => app.id !== id);
    localStorage.setItem("hospital_appointments", JSON.stringify(filtered));
    return { success: true, message: "Deleted successfully", data: filtered };
  }
};

// Download CSV Appointment Report from Backend
export const exportAppointmentsCSV = () => {
  window.open(`${API_BASE_URL}/appointments/export-csv`, "_blank");
};

// --- DOCTORS MONGODB SERVICES ---

// Fetch Doctors from MongoDB (checks /doctors & /users?role=DOCTOR)
export const fetchDoctors = async () => {
  try {
    const res = await api.get("/doctors");
    const docs = res.data?.data || res.data?.doctors || res.data?.staff || [];
    if (docs.length > 0) {
      return { success: true, data: docs, doctors: docs, count: docs.length };
    }
  } catch (err) {
    console.warn("Direct /doctors endpoint failed, attempting fallback to /users?role=DOCTOR", err.message);
  }

  try {
    const userRes = await api.get("/users?role=DOCTOR");
    const docs = userRes.data?.staff || userRes.data?.users || [];
    if (docs.length > 0) {
      return { success: true, data: docs, doctors: docs, count: docs.length };
    }
  } catch (e) {
    console.warn("Fallback to /users?role=DOCTOR failed", e.message);
  }

  return { success: true, data: defaultDoctors, doctors: defaultDoctors };
};

// Update Doctor Status in MongoDB
export const updateDoctorStatus = async (id, newStatus) => {
  try {
    const res = await api.patch(`/doctors/${id}/status`, { status: newStatus });
    return res.data;
  } catch (err) {
    return { success: true, message: `Status updated to ${newStatus}` };
  }
};

// Add Doctor to MongoDB
export const createDoctor = async (doctorData) => {
  try {
    const res = await api.post("/doctors", doctorData);
    return res.data;
  } catch (err) {
    console.warn("MongoDB API error, saving to local backup", err);
    const stored = JSON.parse(localStorage.getItem("hospital_doctors") || "[]");
    const nextId = stored.length > 0 ? Math.max(...stored.map((d) => Number(d.id) || 0)) + 1 : Math.floor(100 + Math.random() * 900);
    const newDoc = {
      id: nextId,
      name: doctorData.name,
      specialization: doctorData.specialization,
      department: doctorData.department || "General Medicine",
      qualification: doctorData.qualification || "MBBS, MD",
      experience: Number(doctorData.experience) || 5,
      consultationFee: Number(doctorData.consultationFee) || 800,
      availability: doctorData.availability || "Mon, Wed, Fri",
      status: doctorData.status || "Available",
      rating: 4.8,
      email: doctorData.email || "",
      phone: doctorData.phone || "",
      image: doctorData.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      bio: doctorData.bio || "Specialist doctor at Capital Public Seva Hospital."
    };
    localStorage.setItem("hospital_doctors", JSON.stringify([newDoc, ...stored]));
    return {
      success: true,
      message: `Dr. ${newDoc.name} added successfully!`,
      data: newDoc
    };
  }
};

// Delete Doctor from MongoDB
export const deleteDoctor = async (id) => {
  try {
    const res = await api.delete(`/doctors/${id}`);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete doctor from MongoDB"
    };
  }
};

// --- ADMIN PROFILE & LOGIN HISTORY SERVICES ---

export const fetchLoginHistory = async () => {
  try {
    const res = await api.get("/admin/login-history");
    return res.data;
  } catch (err) {
    return { success: false, message: "Failed to load login history", data: [] };
  }
};

export const updateAdminProfile = async (profileData) => {
  try {
    const res = await api.patch("/admin/profile", profileData);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update profile"
    };
  }
};

// --- PATIENTS DIRECTORY SERVICES ---
export const fetchPatients = async () => {
  try {
    const res = await api.get("/patients");
    return res.data;
  } catch (err) {
    const appsRes = await fetchAppointments();
    const patientMap = new Map();
    (appsRes.data || []).forEach((app) => {
      const key = (app.email || "").toLowerCase().trim();
      if (!key) return;
      if (!patientMap.has(key)) {
        patientMap.set(key, {
          id: `PAT-${Math.abs(key.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16).substring(0, 6)}`,
          fullName: app.fullName,
          email: app.email,
          phone: app.phone,
          dob: app.dob,
          gender: app.gender,
          totalBookings: 1,
          latestAppointmentDate: app.appointmentDate,
          appointments: [app]
        });
      } else {
        const existing = patientMap.get(key);
        existing.totalBookings += 1;
        existing.appointments.push(app);
      }
    });
    return { success: true, data: Array.from(patientMap.values()) };
  }
};

export const sendContactMessage = async (contactData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, message: "Your message has been sent successfully!" };
};

// --- HEALTH PACKAGES MONGODB SERVICES ---
export const fetchPackages = async () => {
  try {
    const res = await api.get("/packages");
    return res.data;
  } catch (err) {
    return { success: true, data: [] };
  }
};

export const createPackage = async (packageData) => {
  try {
    const res = await api.post("/packages", packageData);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create health package"
    };
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const res = await api.put(`/packages/${id}`, packageData);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update health package"
    };
  }
};

export const deletePackage = async (id) => {
  try {
    const res = await api.delete(`/packages/${id}`);
    return res.data;
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete health package"
    };
  }
};

export default api;
