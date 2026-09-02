import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { toast } from "react-toastify";

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "RECEPTIONIST",
    department: "",
    specialization: ""
  });

  const fetchStaff = async () => {
    try {
      const [staffRes, deptRes] = await Promise.all([
        API.get("/users"),
        API.get("/departments")
      ]);
      if (staffRes.data.success) {
        // Filter out Doctors to show Staff
        setStaff(staffRes.data.staff.filter((s) => s.role !== "DOCTOR"));
      }
      if (deptRes.data.success) setDepartments(deptRes.data.departments);
    } catch (err) {
      toast.error("Failed to load staff list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "hospital123",
      role: "RECEPTIONIST",
      department: departments[0]?._id || "",
      specialization: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (stf) => {
    setEditingStaff(stf);
    setFormData({
      name: stf.name,
      email: stf.email,
      phone: stf.phone || "",
      password: "",
      role: stf.role,
      department: stf.department?._id || "",
      specialization: stf.specialization || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStaff) {
        await API.put(`/users/${editingStaff._id}`, formData);
        toast.success("Staff profile updated");
      } else {
        await API.post("/users", formData);
        toast.success("Staff account created with unique Employee ID");
      }
      setIsModalOpen(false);
      fetchStaff();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await API.put(`/users/${id}`, { isActive: !currentStatus });
      toast.success("Staff status updated");
      fetchStaff();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const roleColors = {
    ADMIN: "bg-purple-100 text-purple-800",
    RECEPTIONIST: "bg-teal-100 text-teal-800",
    PHARMACIST: "bg-emerald-100 text-emerald-800",
    LABORATORY: "bg-indigo-100 text-indigo-800"
  };

  const columns = [
    {
      header: "Employee ID",
      accessor: "empId",
      cell: (row) => <span className="font-mono font-bold text-slate-900">{row.empId}</span>
    },
    {
      header: "Staff Member",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.name}</p>
          <p className="text-[10px] text-slate-500">{row.email}</p>
        </div>
      )
    },
    {
      header: "Role",
      cell: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${roleColors[row.role] || "bg-slate-100"}`}>
          {row.role}
        </span>
      )
    },
    {
      header: "Department",
      cell: (row) => <span className="text-slate-700">{row.department?.name || "General"}</span>
    },
    {
      header: "Phone",
      accessor: "phone"
    },
    {
      header: "Status",
      cell: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.isActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToggleActive(row._id, row.isActive)}
            className={`p-1.5 rounded-lg transition-colors ${row.isActive ? "text-red-600 hover:bg-red-50" : "text-emerald-600 hover:bg-emerald-50"}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={staff}
        searchPlaceholder="Search staff by name, empId, role..."
        actionButton={
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Staff Member
          </button>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? `Edit Staff (${editingStaff.empId})` : "Create New Staff Account"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Staff Member Name"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                disabled={!!editingStaff}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="staff@hospital.com"
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-blue-600"
              >
                <option value="RECEPTIONIST">RECEPTIONIST</option>
                <option value="PHARMACIST">PHARMACIST</option>
                <option value="LABORATORY">LABORATORY</option>
                <option value="ADMIN">ADMIN</option>
              </select>
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
                {editingStaff ? "New Password (Optional)" : "Password *"}
              </label>
              <input
                type="password"
                required={!editingStaff}
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
              {editingStaff ? "Save Changes" : "Create Account"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
