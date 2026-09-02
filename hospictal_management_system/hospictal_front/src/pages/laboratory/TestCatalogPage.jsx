import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function TestCatalogPage() {
  const [catalog, setCatalog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    testCode: "LAB-TEST",
    name: "",
    category: "Biochemistry",
    price: 500,
    sampleType: "Whole Blood",
    referenceRange: "Normal",
    unit: ""
  });

  const fetchCatalog = async () => {
    try {
      const res = await API.get("/lab/catalog");
      if (res.data.success) setCatalog(res.data.catalog);
    } catch (err) {
      toast.error("Failed to load catalog");
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const handleAddTest = async (e) => {
    e.preventDefault();
    try {
      await API.post("/lab/catalog", formData);
      toast.success("Test added to catalog");
      setIsModalOpen(false);
      fetchCatalog();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add test");
    }
  };

  const columns = [
    { header: "Test Code", accessor: "testCode", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.testCode}</span> },
    { header: "Test Name", accessor: "name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Category", accessor: "category" },
    { header: "Sample Required", accessor: "sampleType" },
    { header: "Test Price", cell: (row) => <span className="font-mono font-bold">₹{row.price}</span> }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={catalog}
        searchPlaceholder="Search catalog..."
        actionButton={
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md">
            <Plus className="w-4 h-4" /> Add Test to Catalog
          </button>
        }
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Diagnostic Test">
        <form onSubmit={handleAddTest} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Test Code *</label>
              <input type="text" required value={formData.testCode} onChange={(e) => setFormData({ ...formData, testCode: e.target.value })} className="w-full p-2.5 border rounded-xl font-mono uppercase" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Test Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Price (₹) *</label>
              <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2.5 border rounded-xl font-mono font-bold" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl">Save to Catalog</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
