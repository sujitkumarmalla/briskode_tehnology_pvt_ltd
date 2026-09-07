import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import CloudinaryUpload from "../../components/common/CloudinaryUpload";
import { Plus, Edit, Trash2, Building2, Stethoscope } from "lucide-react";
import { toast } from "react-toastify";

const DEFAULT_DEPT_IMAGES = {
  cardiology: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400",
  neurology: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400",
  gastroenterology: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400",
  nephrology: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
  oncology: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400",
  orthopedics: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400",
  pediatrics: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400"
};

const getDeptThumb = (dept) => {
  if (dept.image && dept.image.trim().length > 0) return dept.image;
  const nameLower = (dept.name || "").toLowerCase();
  for (const key in DEFAULT_DEPT_IMAGES) {
    if (nameLower.includes(key)) return DEFAULT_DEPT_IMAGES[key];
  }
  return "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400";
};

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  const [formData, setFormData] = useState({ name: "", description: "", image: "" });

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      if (res.data.success) setDepartments(res.data.departments);
    } catch (err) {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleOpenAdd = () => {
    setEditingDept(null);
    setFormData({ name: "", description: "", image: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, description: dept.description || "", image: dept.image || "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDept) {
        await API.put(`/departments/${editingDept._id}`, formData);
        toast.success("Department updated");
      } else {
        await API.post("/departments", formData);
        toast.success("Department created");
      }
      setIsModalOpen(false);
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const columns = [
    {
      header: "Department Name",
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={getDeptThumb(row)}
            alt={row.name}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm"
          />
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-[10px] text-slate-500">{row.description}</p>
          </div>
        </div>
      )
    },
    {
      header: "Assigned Doctors",
      cell: (row) => (
        <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full text-xs">
          <Stethoscope className="w-3.5 h-3.5 text-blue-600" /> {row.doctorCount || 0} Doctors
        </span>
      )
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={departments}
        searchPlaceholder="Search departments..."
        actionButton={
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Department
          </button>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDept ? "Edit Department" : "Add New Department"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Department Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Cardiology, Neurology"
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Specialty details..."
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <CloudinaryUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Department Cover Photo (Cloudinary Upload)"
            />
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
              {editingDept ? "Save Changes" : "Create Department"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

