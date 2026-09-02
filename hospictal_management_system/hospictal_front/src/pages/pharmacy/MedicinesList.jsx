import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { Plus, Edit, Trash2, Pill } from "lucide-react";
import { toast } from "react-toastify";

export default function MedicinesList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    category: "Analgesic",
    manufacturer: "Cipla",
    batchNumber: "",
    expiryDate: "",
    purchasePrice: 10,
    sellingPrice: 20,
    stockQuantity: 100,
    minimumStock: 20,
    unit: "Tablets"
  });

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/pharmacy/medicines");
      if (res.data.success) setMedicines(res.data.medicines);
    } catch (err) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleOpenAdd = () => {
    setEditingMed(null);
    setFormData({
      name: "",
      genericName: "",
      category: "Analgesic",
      manufacturer: "Cipla",
      batchNumber: "BATCH-2026-01",
      expiryDate: "2027-12-31",
      purchasePrice: 15,
      sellingPrice: 30,
      stockQuantity: 200,
      minimumStock: 30,
      unit: "Tablets"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMed(m);
    setFormData({
      name: m.name,
      genericName: m.genericName || "",
      category: m.category,
      manufacturer: m.manufacturer || "",
      batchNumber: m.batchNumber || "",
      expiryDate: m.expiryDate ? new Date(m.expiryDate).toISOString().slice(0, 10) : "",
      purchasePrice: m.purchasePrice,
      sellingPrice: m.sellingPrice,
      stockQuantity: m.stockQuantity,
      minimumStock: m.minimumStock,
      unit: m.unit || "Tablets"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMed) {
        await API.put(`/pharmacy/medicines/${editingMed._id}`, formData);
        toast.success("Medicine updated");
      } else {
        await API.post("/pharmacy/medicines", formData);
        toast.success("Medicine added to inventory");
      }
      setIsModalOpen(false);
      fetchMedicines();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/pharmacy/medicines/${id}`);
      toast.success("Medicine deleted");
      fetchMedicines();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    { header: "Medicine Name", cell: (row) => <span className="font-bold text-slate-800">{row.name} ({row.genericName})</span> },
    { header: "Category", accessor: "category" },
    { header: "Batch No.", accessor: "batchNumber" },
    { header: "Expiry Date", cell: (row) => new Date(row.expiryDate).toLocaleDateString() },
    {
      header: "Stock Qty",
      cell: (row) => {
        const isLow = row.stockQuantity <= row.minimumStock;
        return (
          <span className={`font-bold font-mono px-2 py-0.5 rounded text-xs ${isLow ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
            {row.stockQuantity} {row.unit}
          </span>
        );
      }
    },
    { header: "Price (₹)", cell: (row) => <span className="font-mono font-bold">₹{row.sellingPrice}</span> },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenEdit(row)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
          <button onClick={() => handleDelete(row._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={medicines}
        searchPlaceholder="Search inventory by medicine name..."
        actionButton={
          <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md">
            <Plus className="w-4 h-4" /> Add Medicine
          </button>
        }
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMed ? "Edit Medicine" : "Add Medicine to Inventory"}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Trade Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Generic Name</label>
              <input type="text" value={formData.genericName} onChange={(e) => setFormData({ ...formData, genericName: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Category *</label>
              <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Manufacturer</label>
              <input type="text" value={formData.manufacturer} onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Batch Number</label>
              <input type="text" value={formData.batchNumber} onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })} className="w-full p-2.5 border rounded-xl font-mono" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Expiry Date *</label>
              <input type="date" required value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Purchase Price (₹)</label>
              <input type="number" value={formData.purchasePrice} onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })} className="w-full p-2.5 border rounded-xl font-mono" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Selling Price (₹) *</label>
              <input type="number" required value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} className="w-full p-2.5 border rounded-xl font-mono font-bold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Stock Quantity *</label>
              <input type="number" required value={formData.stockQuantity} onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })} className="w-full p-2.5 border rounded-xl font-bold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Minimum Alert Threshold</label>
              <input type="number" value={formData.minimumStock} onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 rounded-xl">Save Medicine</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
