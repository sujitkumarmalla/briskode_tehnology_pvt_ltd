import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import CloudinaryUpload from "../../components/common/CloudinaryUpload";
import { Plus, Edit, Trash2, UserPlus, Stethoscope } from "lucide-react";
import { toast } from "react-toastify";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: 500,
    workingHours: "09:00 AM - 05:00 PM",
    profileImage: ""
  });

  const fetchData = async () => {
    try {
      const [docRes, deptRes] = await Promise.all([
        API.get("/users?role=DOCTOR"),
        API.get("/departments")
      ]);
      if (docRes.data.success) setDoctors(docRes.data.staff);
      if (deptRes.data.success) setDepartments(deptRes.data.departments);
    } catch (err) {
      toast.error("Failed to load doctor profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingDoctor(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "doc123",
      department: departments[0]?._id || "",
      specialization: "",
      qualification: "MBBS, MD",
      experience: "5 Years",
      consultationFee: 500,
      workingHours: "09:00 AM - 05:00 PM",
      profileImage: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (doc) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name,
      email: doc.email,
      phone: doc.phone || "",
      password: "",
      department: doc.department?._id || "",
      specialization: doc.specialization || "",
      qualification: doc.qualification || "",
      experience: doc.experience || "",
      consultationFee: doc.consultationFee || 500,
      workingHours: doc.workingHours || "09:00 AM - 05:00 PM",
      profileImage: doc.profileImage || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        department: formData.department && formData.department !== "" ? formData.department : undefined,
        role: "DOCTOR"
      };

      if (editingDoctor) {
        await API.put(`/users/${editingDoctor._id}`, payload);
        toast.success("Doctor profile updated");
      } else {
        await API.post("/users", payload);
        toast.success("Doctor account created successfully");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggleLeaveStatus = async (id, currentStatus, name) => {
    try {
      await API.put(`/users/${id}`, { isActive: !currentStatus });
      toast.success(!currentStatus ? `${name} status set to Active` : `${name} set to On Leave (Deactivated)`);
      fetchData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleResignDoctor = async (id, name) => {
    if (window.confirm(`Are you sure Dr. ${name} has RESIGNED?\n\nThis will permanently delete their account from MongoDB database and remove them from all hospital listings.`)) {
      try {
        await API.delete(`/users/${id}`);
        toast.success(`Dr. ${name} marked as Resigned & permanently deleted from MongoDB`);
        fetchData();
      } catch (err) {
        toast.error("Failed to delete resigned doctor profile");
      }
    }
  };

  const columns = [
    {
      header: "Employee ID",
      accessor: "empId",
      cell: (row) => <span className="font-mono font-bold text-blue-600">{row.empId}</span>
    },
    {
      header: "Doctor Name",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-[10px] text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Department",
      cell: (row) => <span className="font-medium text-slate-700">{row.department?.name || "General"}</span>
    },
    {
      header: "Specialization",
      accessor: "specialization"
    },
    {
      header: "Consult Fee",
      cell: (row) => <span className="font-mono font-semibold text-slate-900">₹{row.consultationFee}</span>
    },
    {
      header: "Working Hours",
      accessor: "workingHours"
    },
    {
      header: "Status",
      cell: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${row.isActive ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"}`}>
          {row.isActive ? "Active (Available)" : "On Leave (Inactive)"}
        </span>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Doctor"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          {/* Deactivate / Set On Leave Toggle */}
          <button
            onClick={() => handleToggleLeaveStatus(row._id, row.isActive, row.name)}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ${
              row.isActive
                ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
            }`}
            title={row.isActive ? "Deactivate (Set On Leave - Still exists in DB)" : "Activate Doctor"}
          >
            {row.isActive ? "On Leave" : "Activate"}
          </button>

          {/* Resign & Permanent Delete from MongoDB */}
          <button
            onClick={() => handleResignDoctor(row._id, row.name)}
            className="px-2 py-1 text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors flex items-center gap-1"
            title="Resign Doctor (Permanently delete from MongoDB)"
          >
            <Trash2 className="w-3.5 h-3.5" /> Resign
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={doctors}
        searchPlaceholder="Search doctors by name, empId, specialization..."
        actionButton={
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Doctor
          </button>
        }
      />

      {/* Add / Edit Doctor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDoctor ? `Edit Doctor (${editingDoctor.empId})` : "Add New Doctor Account"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Doctor Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Arvind Kapoor"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                disabled={!!editingDoctor}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="doctor@hospital.com"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {editingDoctor ? "New Password (Leave blank to keep unchanged)" : "Password *"}
              </label>
              <input
                type="password"
                required={!editingDoctor}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Specialization</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Senior Cardiologist"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <CloudinaryUpload
                value={formData.profileImage}
                onChange={(url) => setFormData({ ...formData, profileImage: url })}
                label="Doctor Profile Photo (Cloudinary Upload)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
            >
              {editingDoctor ? "Save Changes" : "Create Doctor Account"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
