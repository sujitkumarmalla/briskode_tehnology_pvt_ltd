import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hospitalConfig } from "../data/hospitalConfig";
import {
  fetchAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  createAppointment,
  fetchDoctors,
  updateDoctorStatus,
  createDoctor,
  deleteDoctor,
  fetchPatients,
  fetchPackages,
  createPackage,
  updatePackage,
  deletePackage,
  exportAppointmentsCSV
} from "../services/api";

import { toast } from "react-toastify";

function AdminDashboardPage() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState("overview"); // overview, appointments, doctors, patients, packages, analytics

  // Data states
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");

  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // Package Form state
  const [packageFormData, setPackageFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    discount: "50% OFF",
    description: "",
    testsCount: 50,
    badge: "Popular Choice",
    popular: false,
    testsStr: ""
  });

  // Create form state
  const [newAppointmentData, setNewAppointmentData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    department: "Cardiology",
    doctorId: "1",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "10:00 AM",
    reason: "Routine Inspection"
  });

  // New Doctor Form state
  const [newDoctorData, setNewDoctorData] = useState({
    name: "",
    specialization: "",
    department: "Cardiology",
    qualification: "MBBS, MD",
    experience: 8,
    consultationFee: 900,
    availability: "Mon, Wed, Fri",
    status: "Available",
    email: "",
    phone: "",
    image: "",
    bio: ""
  });

  // Admin Profile Form state
  const [profileData, setProfileData] = useState({
    name: user?.name || "Sujit Malla",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  });

  // Sync profile state when user object changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "Sujit Malla",
        avatar: user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
      });
    }
  }, [user]);

  // Load initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const [appRes, docRes, patRes, pkgRes] = await Promise.all([
        fetchAppointments(),
        fetchDoctors(),
        fetchPatients(),
        fetchPackages()
      ]);
      if (appRes.success) setAppointments(appRes.data);
      if (docRes.success) setDoctors(docRes.data);
      if (patRes.success) setPatients(patRes.data);
      if (pkgRes.success) setPackages(pkgRes.data);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      showToast("Error loading dashboard data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg, type = "success") => {
    if (type === "error") toast.error(msg);
    else if (type === "info") toast.info(msg);
    else toast.success(msg);
  };

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully.", "info");
    navigate("/");
  };

  // Status update handler
  const handleStatusChange = async (id, newStatus) => {
    const res = await updateAppointmentStatus(id, newStatus);
    if (res.success) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      showToast(`Appointment ${id} status updated to ${newStatus}`);
    }
  };

  // Delete handler
  const handleDeleteAppointment = async (id) => {
    if (window.confirm(`Are you sure you want to cancel and remove appointment ${id}?`)) {
      const res = await deleteAppointment(id);
      if (res.success) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        showToast(`Appointment ${id} removed successfully`, "info");
      }
    }
  };

  // Doctor status toggle handler
  const handleDoctorStatusToggle = async (docId, currentStatus) => {
    const nextStatus = currentStatus === "Available" ? "Busy" : currentStatus === "Busy" ? "On Leave" : "Available";
    const res = await updateDoctorStatus(docId, nextStatus);
    if (res.success) {
      setDoctors((prev) =>
        prev.map((d) => (String(d.id) === String(docId) ? { ...d, status: nextStatus } : d))
      );
      showToast(`Doctor status updated to ${nextStatus}`);
    }
  };

  // Add new Doctor handler
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!newDoctorData.name.trim() || !newDoctorData.specialization.trim()) {
      showToast("Doctor Name and Specialization are required.", "error");
      return;
    }
    const res = await createDoctor(newDoctorData);
    if (res.success) {
      showToast(`Dr. ${newDoctorData.name} added to your hospital successfully!`);
      setIsAddDoctorModalOpen(false);
      setNewDoctorData({
        name: "",
        specialization: "",
        department: "Cardiology",
        qualification: "MBBS, MD",
        experience: 8,
        consultationFee: 900,
        availability: "Mon, Wed, Fri",
        status: "Available",
        email: "",
        phone: "",
        image: "",
        bio: ""
      });
      loadData();
    } else {
      showToast(res.message || "Failed to add doctor", "error");
    }
  };

  // Delete / Remove Doctor handler
  const handleDeleteDoctor = async (docId, docName) => {
    if (window.confirm(`Are you sure you want to remove ${docName} from your hospital?`)) {
      const res = await deleteDoctor(docId);
      if (res.success) {
        setDoctors((prev) => prev.filter((d) => String(d.id) !== String(docId) && String(d._id) !== String(docId)));
        showToast(`${docName} has been removed from hospital directory`, "info");
      } else {
        showToast(res.message || "Failed to remove doctor", "error");
      }
    }
  };

  // Package Save (Add or Edit) handler
  const handleSavePackage = async (e) => {
    e.preventDefault();
    if (!packageFormData.title.trim() || !packageFormData.price) {
      showToast("Package Title and Price are required.", "error");
      return;
    }

    const payload = {
      title: packageFormData.title.trim(),
      price: Number(packageFormData.price),
      originalPrice: Number(packageFormData.originalPrice) || Number(packageFormData.price) * 2,
      discount: packageFormData.discount || "50% OFF",
      description: packageFormData.description || "Comprehensive Health Package",
      testsCount: Number(packageFormData.testsCount) || 50,
      badge: packageFormData.badge || "Popular Choice",
      popular: Boolean(packageFormData.popular),
      tests: packageFormData.testsStr ? packageFormData.testsStr.split(",").map(t => t.trim()) : []
    };

    if (editingPackage) {
      const res = await updatePackage(editingPackage.id || editingPackage._id, payload);
      if (res.success) {
        showToast(`Health Package "${payload.title}" updated successfully in MongoDB!`);
        setIsPackageModalOpen(false);
        setEditingPackage(null);
        loadData();
      } else {
        showToast(res.message || "Failed to update package", "error");
      }
    } else {
      const res = await createPackage(payload);
      if (res.success) {
        showToast(`New Health Package "${payload.title}" added to MongoDB successfully!`);
        setIsPackageModalOpen(false);
        loadData();
      } else {
        showToast(res.message || "Failed to create package", "error");
      }
    }
  };

  // Package Delete handler
  const handleDeletePackage = async (pkgId, pkgTitle) => {
    if (window.confirm(`Are you sure you want to delete health package "${pkgTitle}"?`)) {
      const res = await deletePackage(pkgId);
      if (res.success) {
        setPackages((prev) => prev.filter((p) => String(p.id) !== String(pkgId) && String(p._id) !== String(pkgId)));
        showToast(`Package "${pkgTitle}" deleted from MongoDB database`, "info");
      } else {
        showToast(res.message || "Failed to delete package", "error");
      }
    }
  };

  // Open Edit Package Modal
  const handleOpenEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPackageFormData({
      title: pkg.title || "",
      price: pkg.price || "",
      originalPrice: pkg.originalPrice || "",
      discount: pkg.discount || "50% OFF",
      description: pkg.description || "",
      testsCount: pkg.testsCount || 50,
      badge: pkg.badge || "Popular Choice",
      popular: Boolean(pkg.popular),
      testsStr: Array.isArray(pkg.tests) ? pkg.tests.join(", ") : ""
    });
    setIsPackageModalOpen(true);
  };

  // Open Add Package Modal
  const handleOpenAddPackage = () => {
    setEditingPackage(null);
    setPackageFormData({
      title: "",
      price: "",
      originalPrice: "",
      discount: "50% OFF",
      description: "",
      testsCount: 50,
      badge: "Popular Choice",
      popular: false,
      testsStr: ""
    });
    setIsPackageModalOpen(true);
  };

  // Profile photo & name update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user?.email) return;
    const res = await updateUserProfile({
      email: user.email,
      name: profileData.name,
      avatar: profileData.avatar
    });
    if (res.success) {
      showToast("Admin profile updated in MongoDB database!");
      setIsProfileModalOpen(false);
    } else {
      showToast(res.message || "Failed to update profile", "error");
    }
  };

  // Media file upload handler (converts image file to data URL)
  const handleMediaUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Media file size must be less than 5MB", "error");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
      showToast("Media file selected successfully!", "info");
    };
    reader.readAsDataURL(file);
  };

  // Handle new appointment submission from modal
  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    const res = await createAppointment(newAppointmentData);
    if (res.success) {
      showToast(`New appointment ${res.bookingId} created successfully!`);
      setIsCreateModalOpen(false);
      loadData();
    }
  };

  // Derived Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
    const pending = appointments.filter((a) => a.status === "Pending").length;
    const completed = appointments.filter((a) => a.status === "Completed").length;
    const cancelled = appointments.filter((a) => a.status === "Cancelled").length;
    const activeDoctors = doctors.filter((d) => d.status === "Available").length;
    const totalPatients = patients.length;

    // Projected consultation revenue
    const totalRevenue = appointments.reduce((sum, app) => {
      const doc = doctors.find((d) => String(d.id) === String(app.doctorId) || d.name === app.doctorName);
      return sum + (doc ? doc.consultationFee : 800);
    }, 0);

    return {
      total,
      confirmed,
      pending,
      completed,
      cancelled,
      activeDoctors,
      totalPatients,
      totalRevenue
    };
  }, [appointments, doctors, patients]);

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm);

      const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesDept = deptFilter === "all" || app.department.toLowerCase() === deptFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [appointments, searchTerm, statusFilter, deptFilter]);

  // Unique departments for filter
  const departmentsList = useMemo(() => {
    const depts = new Set(doctors.map((d) => d.department));
    return Array.from(depts);
  }, [doctors]);

  // Department distribution for charts
  const deptDistribution = useMemo(() => {
    const map = {};
    appointments.forEach((a) => {
      const d = a.department || "General Medicine";
      map[d] = (map[d] || 0) + 1;
    });
    return Object.entries(map).map(([dept, count]) => ({
      dept,
      count,
      percentage: stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
    }));
  }, [appointments, stats.total]);

  // Doctor workload breakdown
  const doctorWorkload = useMemo(() => {
    return doctors.map((doc) => {
      const docApps = appointments.filter(
        (a) => String(a.doctorId) === String(doc.id) || a.doctorName === doc.name
      );
      return {
        doctor: doc,
        count: docApps.length
      };
    });
  }, [doctors, appointments]);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2 animate-bounce ${
            toastMessage.type === "error"
              ? "bg-rose-600 text-white"
              : toastMessage.type === "info"
              ? "bg-sky-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ================= LEFT SIDEBAR NAVIGATION (WHITE THEME & LARGE FONTS) ================= */}
      <aside className="w-72 sm:w-80 bg-white text-slate-800 flex flex-col justify-between p-6 shrink-0 shadow-xl border-r border-slate-200 sticky top-0 h-screen overflow-y-auto z-40">
        <div>
          {/* Hospital Brand Logo Header */}
          <div className="flex items-center space-x-3.5 pb-6 border-b border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-md shrink-0">
              <img
                src={hospitalConfig.logo}
                alt="Logo"
                className="w-full h-full object-cover rounded-[14px]"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200";
                }}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight truncate">Capital Public Seva</h2>
              <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest block mt-0.5">Admin Workspace</span>
            </div>
          </div>

          {/* Admin Profile Details */}
          <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center space-x-3.5 shadow-sm">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="relative group shrink-0 cursor-pointer"
              title="Click to edit admin photo"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                alt="Admin Avatar"
                className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500 shadow-md group-hover:opacity-80 transition-opacity"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-slate-900 truncate">{user?.name || "Sujit Malla"}</h4>
              <p className="text-xs text-slate-500 truncate">{user?.email || "Administrator"}</p>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="text-xs text-emerald-600 hover:underline font-bold mt-1 cursor-pointer block"
              >
                ✏ Edit Profile Photo
              </button>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-black text-slate-400 tracking-wider px-3 mb-2 block">
              Main Navigation
            </span>
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "appointments", label: "Appointments", badge: stats.total, icon: "📅" },
              { id: "doctors", label: "Doctors Directory", badge: doctors.length, icon: "🩺" },
              { id: "patients", label: "Patient Records", badge: stats.totalPatients, icon: "👤" },
              { id: "packages", label: "Health Packages", badge: packages.length, icon: "📦" },
              { id: "analytics", label: "Analytics & Tools", icon: "📈" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <span className="text-xl shrink-0">{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full shrink-0 ${
                    activeTab === tab.id ? "bg-white text-emerald-700" : "bg-slate-200 text-slate-700"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer Action */}
        <div className="pt-6 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black text-sm rounded-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* ================= RIGHT MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 capitalize">
                {activeTab.replace("-", " ")}
              </h2>
              <p className="text-xs text-slate-500">Capital Public Seva Hospital Administrative Management</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>+ New Appointment</span>
              </button>

              <button
                onClick={() => {
                  loadData();
                  showToast("Fresh data loaded from MongoDB database!", "info");
                }}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Fetch Fresh Data from MongoDB Database"
              >
                <svg className={`w-4 h-4 text-emerald-600 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh Live Data</span>
              </button>

              <button
                onClick={exportAppointmentsCSV}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Export Appointments CSV Report"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Section Body */}
        <main className="p-6 flex-1 overflow-y-auto">
        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Total Appointments</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    📅
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">{stats.total}</div>
                <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                  <span>↑ 12% increase from last week</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Confirmed Bookings</span>
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div className="text-3xl font-black text-sky-900">{stats.confirmed}</div>
                <div className="mt-2 text-[11px] text-sky-600 font-semibold">
                  {stats.pending} pending confirmation
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Active Doctors</span>
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    🩺
                  </div>
                </div>
                <div className="text-3xl font-black text-teal-900">{stats.activeDoctors} / {doctors.length}</div>
                <div className="mt-2 text-[11px] text-teal-600 font-semibold">
                  Across {departmentsList.length} specialized departments
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Est. Consultation Fee</span>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    ₹
                  </div>
                </div>
                <div className="text-3xl font-black text-indigo-900">₹{stats.totalRevenue.toLocaleString()}</div>
                <div className="mt-2 text-[11px] text-indigo-600 font-semibold">
                  Based on doctor fee structure
                </div>
              </div>
            </div>

            {/* Visual Charts Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Wise Graph Preview */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Department Appointments Load</h3>
                    <p className="text-xs text-slate-500">Distribution of patient appointments by specialty</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    View Details →
                  </button>
                </div>

                <div className="space-y-4">
                  {deptDistribution.map((item) => (
                    <div key={item.dept}>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>{item.dept}</span>
                        <span>{item.count} appointments ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(item.percentage, 8)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Breakdown Donut/Bar Chart Preview */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Booking Status Overview</h3>
                    <p className="text-xs text-slate-500">Real-time status of all hospital bookings</p>
                  </div>
                  <span className="text-xs font-extrabold text-slate-400">Total: {stats.total}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <span className="text-xs text-emerald-700 font-bold block">Confirmed</span>
                    <span className="text-2xl font-black text-emerald-900">{stats.confirmed}</span>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <span className="text-xs text-amber-700 font-bold block">Pending</span>
                    <span className="text-2xl font-black text-amber-900">{stats.pending}</span>
                  </div>
                  <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl">
                    <span className="text-xs text-sky-700 font-bold block">Completed</span>
                    <span className="text-2xl font-black text-sky-900">{stats.completed}</span>
                  </div>
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                    <span className="text-xs text-rose-700 font-bold block">Cancelled</span>
                    <span className="text-2xl font-black text-rose-900">{stats.cancelled}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-4 rounded-full flex overflow-hidden">
                  <div style={{ width: `${(stats.confirmed / stats.total) * 100}%` }} className="bg-emerald-500"></div>
                  <div style={{ width: `${(stats.pending / stats.total) * 100}%` }} className="bg-amber-400"></div>
                  <div style={{ width: `${(stats.completed / stats.total) * 100}%` }} className="bg-sky-500"></div>
                  <div style={{ width: `${(stats.cancelled / stats.total) * 100}%` }} className="bg-rose-500"></div>
                </div>
              </div>
            </div>

            {/* Recent Appointments Table Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Recent Patient Bookings</h3>
                  <p className="text-xs text-slate-500">Latest scheduled consultations</p>
                </div>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Manage All Appointments →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      <th className="py-3 px-3">Booking ID</th>
                      <th className="py-3 px-3">Patient Details</th>
                      <th className="py-3 px-3">Doctor & Dept</th>
                      <th className="py-3 px-3">Date & Slot</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {appointments.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-emerald-700">{app.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{app.fullName}</div>
                          <div className="text-[10px] text-slate-500">{app.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-800">{app.doctorName}</div>
                          <div className="text-[10px] text-emerald-600 font-semibold">{app.department}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-700">{app.appointmentDate}</div>
                          <div className="text-[10px] text-slate-400">{app.appointmentTime}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              app.status === "Confirmed"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : app.status === "Pending"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : app.status === "Completed"
                                ? "bg-sky-100 text-sky-800 border border-sky-200"
                                : "bg-rose-100 text-rose-800 border border-rose-200"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setSelectedAppointment(app)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: APPOINTMENTS ================= */}
        {activeTab === "appointments" && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter Controls Bar */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search patient, ID, doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="all">All Departments</option>
                  {departmentsList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDeptFilter("all");
                  }}
                  className="px-3 py-2.5 text-xs text-slate-500 hover:text-slate-800 font-bold hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-base">
                  All Scheduled Appointments ({filteredAppointments.length})
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={exportAppointmentsCSV}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-xs rounded-xl border border-emerald-300 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>📥 Download CSV</span>
                  </button>
                  <span className="text-xs text-slate-400 font-medium">MongoDB Database Connected</span>
                </div>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-bold text-sm text-slate-600">No appointments found matching your criteria</p>
                  <p className="text-xs mt-1">Try clearing filters or search term</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                        <th className="py-3.5 px-4">Booking Ref</th>
                        <th className="py-3.5 px-4">Patient Info</th>
                        <th className="py-3.5 px-4">Assigned Doctor</th>
                        <th className="py-3.5 px-4">Department</th>
                        <th className="py-3.5 px-4">Date & Time</th>
                        <th className="py-3.5 px-4">Status & Update</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredAppointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-emerald-700">{app.id}</td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-900">{app.fullName}</div>
                            <div className="text-[11px] text-slate-500">{app.email}</div>
                            <div className="text-[10px] font-mono text-slate-400">{app.phone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-800">{app.doctorName}</div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-emerald-800">
                            {app.department}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-slate-800">{app.appointmentDate}</div>
                            <div className="text-[10px] text-slate-500">{app.appointmentTime}</div>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider focus:outline-none cursor-pointer border ${
                                app.status === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                  : app.status === "Pending"
                                  ? "bg-amber-50 text-amber-800 border-amber-300"
                                  : app.status === "Completed"
                                  ? "bg-sky-50 text-sky-800 border-sky-300"
                                  : "bg-rose-50 text-rose-800 border-rose-300"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedAppointment(app)}
                              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteAppointment(app.id)}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DOCTORS ================= */}
        {activeTab === "doctors" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Medical Specialists Directory</h3>
                <p className="text-xs text-slate-500">Manage hospital doctors, add/remove medical staff & duty availability</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-extrabold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full border border-teal-200">
                  {doctors.length} Doctors Registered
                </span>
                <button
                  onClick={() => setIsAddDoctorModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add New Doctor</span>
                </button>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => {
                const assignedApps = appointments.filter(
                  (a) => String(a.doctorId) === String(doc.id) || a.doctorName === doc.name
                );

                return (
                  <div
                    key={doc.id || doc._id}
                    className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start space-x-4">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-slate-900 text-sm truncate">{doc.name}</h4>
                          <span className="text-xs text-emerald-600 font-bold block truncate">{doc.specialization}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{doc.department}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 text-xs space-y-2 text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Experience:</span>
                          <span className="font-bold">{doc.experience} Years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Consultation Fee:</span>
                          <span className="font-bold text-slate-900">₹{doc.consultationFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Availability:</span>
                          <span className="font-bold text-slate-800">{doc.availability}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Active Bookings:</span>
                          <span className="font-bold text-emerald-700">{assignedApps.length} Patients</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Contact:</span>
                          <span className="font-mono text-[10px]">{doc.phone || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Toggle & Remove Doctor Action Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400">Duty Status:</span>
                        <button
                          onClick={() => handleDoctorStatusToggle(doc.id, doc.status)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            doc.status === "Available"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                              : doc.status === "Busy"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300"
                              : "bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300"
                          }`}
                        >
                          {doc.status}
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteDoctor(doc.id || doc._id, doc.name)}
                        className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Remove Doctor</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PATIENTS ================= */}
        {activeTab === "patients" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Registered Patient Directory</h3>
                <p className="text-xs text-slate-500">Patients who have booked consultations with Capital Public Seva Hospital</p>
              </div>
              <span className="text-xs font-extrabold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                {patients.length} Total Unique Patients
              </span>
            </div>

            {patients.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl font-black">
                  👤
                </div>
                <h4 className="font-extrabold text-slate-800 text-base">No Patient Records Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Patient records will automatically populate as patients schedule consultations on the website.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((pat, idx) => (
                  <div key={pat._id || pat.patientId || pat.id || idx} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-700 flex items-center justify-center font-black text-lg border border-emerald-200">
                        {pat.fullName ? pat.fullName.charAt(0).toUpperCase() : "P"}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{pat.fullName}</h4>
                        <span className="text-xs text-slate-500 font-medium">{pat.gender || "Patient"} • DOB: {pat.dob || "N/A"}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="font-bold text-slate-800 truncate max-w-[180px]">{pat.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-mono text-slate-800">{pat.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Bookings:</span>
                        <span className="font-extrabold text-emerald-700">{pat.totalBookings || (pat.appointments ? pat.appointments.length : 1)} Appointment(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Latest Visit:</span>
                        <span className="font-semibold text-slate-700">{pat.latestAppointmentDate || "Recent"}</span>
                      </div>
                    </div>

                    {pat.appointments && pat.appointments.length > 0 && (
                      <div className="border-t border-slate-100 pt-3">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                          Booking History:
                        </span>
                        <div className="space-y-1.5">
                          {pat.appointments.map((a, aIdx) => (
                            <div key={a.id || a._id || aIdx} className="text-[11px] flex justify-between items-center text-slate-700">
                              <span className="font-mono font-bold text-emerald-700">{a.id}</span>
                              <span className="truncate max-w-[110px]">{a.doctorName}</span>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100">{a.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: VISUALIZATION TOOLS ================= */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-lg">Hospital Analytics & Visualizations</h3>
              <p className="text-xs text-slate-500">Graphical charts and statistical breakdown of appointments, doctors, and revenue</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart 1: Department Distribution Bar Chart */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3">
                  📊 Appointments by Department
                </h4>

                <div className="space-y-4 pt-2">
                  {deptDistribution.map((item) => (
                    <div key={item.dept}>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                        <span className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span>{item.dept}</span>
                        </span>
                        <span className="text-emerald-700 font-extrabold">{item.count} Bookings ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                        <div
                          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.max(item.percentage, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Doctor Workload Chart */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3">
                  🩺 Doctor Workload Distribution
                </h4>

                <div className="space-y-4 pt-2">
                  {doctorWorkload.map(({ doctor, count }) => {
                    const maxApps = Math.max(...doctorWorkload.map((d) => d.count), 1);
                    const pct = Math.round((count / maxApps) * 100);

                    return (
                      <div key={doctor.id}>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                          <span>{doctor.name} ({doctor.department})</span>
                          <span className="text-teal-700 font-extrabold">{count} Consultations</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-sky-500 h-full rounded-full transition-all duration-700"
                            style={{ width: `${Math.max(pct, 10)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 3: Donut Breakdown SVG representation */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3">
                  🍩 Booking Status Distribution Chart
                </h4>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-4">
                  {/* SVG Donut */}
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray={`${(stats.confirmed / stats.total) * 100}, 100`}
                        strokeWidth="5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-slate-900">{stats.total}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bookings</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span className="font-bold text-slate-700">Confirmed:</span>
                      <span className="font-extrabold text-slate-900">{stats.confirmed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                      <span className="font-bold text-slate-700">Pending:</span>
                      <span className="font-extrabold text-slate-900">{stats.pending}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                      <span className="font-bold text-slate-700">Completed:</span>
                      <span className="font-extrabold text-slate-900">{stats.completed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                      <span className="font-bold text-slate-700">Cancelled:</span>
                      <span className="font-extrabold text-slate-900">{stats.cancelled}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart 4: Projected Financial Breakdown */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-3">
                  💰 Revenue & Consultation Stats
                </h4>

                <div className="p-5 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl shadow-inner">
                  <span className="text-xs text-emerald-300 font-bold block uppercase tracking-wider mb-1">
                    Total Estimated Consultation Value
                  </span>
                  <div className="text-3xl font-black text-white">₹{stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    Calculated dynamically based on assigned specialist doctor consultation fees.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-slate-500 font-bold block">Average Fee / Visit</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{stats.total > 0 ? Math.round(stats.totalRevenue / stats.total) : 0}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-slate-500 font-bold block">Patient Growth Rate</span>
                    <span className="text-lg font-black text-emerald-700">+18.5% MoM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: HEALTH PACKAGES ================= */}
        {activeTab === "packages" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Health Checkup Packages Directory</h3>
                <p className="text-xs text-slate-500">Manage hospital screening packages, offer pricing, test counts & discounts in MongoDB</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-extrabold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
                  {packages.length} Packages Stored in MongoDB
                </span>
                <button
                  onClick={handleOpenAddPackage}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add New Package</span>
                </button>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg._id || pkg.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                >
                  {pkg.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <h4 className="font-black text-slate-900 text-base pr-16">{pkg.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{pkg.description}</p>

                    <div className="mt-4 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-black text-emerald-700">₹{pkg.price}</span>
                        {pkg.originalPrice > pkg.price && (
                          <span className="text-xs font-bold text-slate-400 line-through ml-2">₹{pkg.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        {pkg.discount || "SPECIAL OFFER"}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-2">
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Diagnostic Tests Count:</span>
                        <span className="text-emerald-700">{pkg.testsCount || pkg.tests?.length || 50} Included Tests</span>
                      </div>

                      {pkg.tests && pkg.tests.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Included Tests:</span>
                          <ul className="space-y-1 text-[11px] text-slate-600">
                            {pkg.tests.slice(0, 4).map((t, tIdx) => (
                              <li key={tIdx} className="flex items-center space-x-1.5 truncate">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span className="truncate">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-3">
                    <button
                      onClick={() => handleOpenEditPackage(pkg)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <span>✏ Edit Package</span>
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg._id || pkg.id, pkg.title)}
                      className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ================= MODAL 1: APPOINTMENT DETAIL MODAL ================= */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Ref: {selectedAppointment.id}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">Appointment Details</h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Patient Name:</span>
                  <span className="font-black text-slate-900">{selectedAppointment.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-bold">{selectedAppointment.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono font-bold">{selectedAppointment.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gender / DOB:</span>
                  <span className="font-semibold">{selectedAppointment.gender} • {selectedAppointment.dob}</span>
                </div>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-2xl space-y-2 border border-emerald-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-black text-emerald-900">{selectedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-bold text-emerald-800">{selectedAppointment.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-bold text-slate-900">
                    {selectedAppointment.appointmentDate} at {selectedAppointment.appointmentTime}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Reason for Visit / Symptoms:</span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 italic">
                  "{selectedAppointment.reason || "General Consultation"}"
                </p>
              </div>

              {selectedAppointment.message && (
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Patient Notes:</span>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
                    {selectedAppointment.message}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Print Slip
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: CREATE APPOINTMENT MODAL ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Create New Patient Booking</h3>
                <p className="text-xs text-slate-500">Add appointment on behalf of walk-in or phone patient</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newAppointmentData.fullName}
                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sen"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newAppointmentData.email}
                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newAppointmentData.phone}
                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newAppointmentData.dob}
                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, dob: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Doctor</label>
                  <select
                    value={newAppointmentData.doctorId}
                    onChange={(e) => {
                      const doc = doctors.find((d) => String(d.id) === String(e.target.value));
                      setNewAppointmentData({
                        ...newAppointmentData,
                        doctorId: e.target.value,
                        department: doc ? doc.department : newAppointmentData.department
                      });
                    }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={newAppointmentData.appointmentDate}
                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, appointmentDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Reason / Symptoms</label>
                  <input
                    type="text"
                    value={newAppointmentData.reason}
                    onChange={(e) => setNewAppointmentData({ ...newAppointmentData, reason: e.target.value })}
                    placeholder="e.g. Chest pain, Routine Checkup"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Save & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NEW DOCTOR MODAL ================= */}
      {isAddDoctorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Add New Specialist Doctor</h3>
                <p className="text-xs text-slate-500">Register new doctor to hospital directory in MongoDB</p>
              </div>
              <button
                onClick={() => setIsAddDoctorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newDoctorData.name}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, name: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Kumar"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialization *</label>
                  <input
                    type="text"
                    required
                    value={newDoctorData.specialization}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, specialization: e.target.value })}
                    placeholder="e.g. Senior Cardiologist"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department *</label>
                  <select
                    value={newDoctorData.department}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, department: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={newDoctorData.qualification}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, qualification: e.target.value })}
                    placeholder="e.g. MBBS, MD, DM"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={newDoctorData.experience}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, experience: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={newDoctorData.consultationFee}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, consultationFee: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Availability Days</label>
                  <input
                    type="text"
                    value={newDoctorData.availability}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, availability: e.target.value })}
                    placeholder="e.g. Mon, Wed, Fri"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Duty Status</label>
                  <select
                    value={newDoctorData.status}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, status: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Phone</label>
                  <input
                    type="text"
                    value={newDoctorData.phone}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, phone: e.target.value })}
                    placeholder="+91 77878 14476"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Email</label>
                  <input
                    type="email"
                    value={newDoctorData.email}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, email: e.target.value })}
                    placeholder="doctor@capitalpublicseva.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Doctor Media Photo *</label>
                  <div className="flex items-center space-x-3">
                    {newDoctorData.image && (
                      <img
                        src={newDoctorData.image}
                        alt="Media Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, (base64) => setNewDoctorData({ ...newDoctorData, image: base64 }))}
                      className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={newDoctorData.image}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, image: e.target.value })}
                    placeholder="Or paste media image URL / base64"
                    className="w-full px-3.5 py-1.5 mt-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Doctor Bio</label>
                  <textarea
                    rows="2"
                    value={newDoctorData.bio}
                    onChange={(e) => setNewDoctorData({ ...newDoctorData, bio: e.target.value })}
                    placeholder="Brief background and specialties..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddDoctorModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Doctor to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT ADMIN PROFILE PHOTO MODAL ================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Update Admin Profile Photo</h3>
                <p className="text-xs text-slate-500">Update Administrator details in MongoDB database</p>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4 text-xs">
              <div className="text-center mb-4">
                <img
                  src={profileData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                  alt="Preview"
                  className="w-20 h-20 rounded-3xl object-cover mx-auto border-4 border-emerald-400 shadow-md mb-2"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";
                  }}
                />
                <span className="text-[10px] text-slate-400">Current Photo Preview</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Administrator Name</label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Upload Media Photo *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e, (base64) => setProfileData({ ...profileData, avatar: base64 }))}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer mb-2"
                />
                <input
                  type="text"
                  required
                  value={profileData.avatar}
                  onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                  placeholder="Or paste media image URL / base64"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-[11px]"
                />
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block font-bold text-slate-400 mb-1.5 text-[10px] uppercase">Or Pick Sample Avatar:</label>
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
                  ].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Preset"
                      onClick={() => setProfileData({ ...profileData, avatar: url })}
                      className={`w-10 h-10 rounded-xl object-cover border-2 cursor-pointer transition-all hover:scale-105 ${
                        profileData.avatar === url ? "border-emerald-500 ring-2 ring-emerald-300" : "border-slate-200 opacity-60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  Save Profile Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT HEALTH PACKAGE MODAL ================= */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-scale-up">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {editingPackage ? `Edit Package: ${editingPackage.title}` : "Add New Health Package"}
                </h3>
                <p className="text-xs text-slate-500">Save package details directly into MongoDB database</p>
              </div>
              <button
                onClick={() => setIsPackageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={packageFormData.title}
                    onChange={(e) => setPackageFormData({ ...packageFormData, title: e.target.value })}
                    placeholder="e.g. Master Executive Health Package"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={packageFormData.price}
                    onChange={(e) => setPackageFormData({ ...packageFormData, price: e.target.value })}
                    placeholder="3499"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    value={packageFormData.originalPrice}
                    onChange={(e) => setPackageFormData({ ...packageFormData, originalPrice: e.target.value })}
                    placeholder="6999"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Tag</label>
                  <input
                    type="text"
                    value={packageFormData.discount}
                    onChange={(e) => setPackageFormData({ ...packageFormData, discount: e.target.value })}
                    placeholder="50% OFF"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Diagnostic Tests Count</label>
                  <input
                    type="number"
                    value={packageFormData.testsCount}
                    onChange={(e) => setPackageFormData({ ...packageFormData, testsCount: e.target.value })}
                    placeholder="78"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={packageFormData.badge}
                    onChange={(e) => setPackageFormData({ ...packageFormData, badge: e.target.value })}
                    placeholder="Popular Choice"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="popularPkg"
                    checked={packageFormData.popular}
                    onChange={(e) => setPackageFormData({ ...packageFormData, popular: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="popularPkg" className="font-bold text-slate-800 cursor-pointer">
                    Highlight as Most Popular Package
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Included Diagnostic Tests (comma separated)</label>
                  <textarea
                    rows="3"
                    value={packageFormData.testsStr}
                    onChange={(e) => setPackageFormData({ ...packageFormData, testsStr: e.target.value })}
                    placeholder="Complete Blood Count (CBC), Lipid Profile, Thyroid Test, Liver Function Test"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-[11px]"
                  ></textarea>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Short Package Description</label>
                  <textarea
                    rows="2"
                    value={packageFormData.description}
                    onChange={(e) => setPackageFormData({ ...packageFormData, description: e.target.value })}
                    placeholder="Brief outline of who should choose this package..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-md cursor-pointer"
                >
                  {editingPackage ? "Update Package in MongoDB" : "Save Package to MongoDB"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
