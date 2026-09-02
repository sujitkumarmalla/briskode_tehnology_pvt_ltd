import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import StatCard from "../../components/common/StatCard";
import { BedDouble, Plus, CheckCircle, UserCheck, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

export default function BedManagement() {
  const [beds, setBeds] = useState([]);
  const [stats, setStats] = useState({});
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);

  const [addFormData, setAddFormData] = useState({
    bedNumber: "",
    ward: "General Ward",
    bedType: "General",
    chargePerDay: 500
  });

  const [selectedPatientId, setSelectedPatientId] = useState("");

  const fetchBeds = async () => {
    try {
      const [bedRes, patientRes] = await Promise.all([
        API.get("/beds"),
        API.get("/patients")
      ]);
      if (bedRes.data.success) {
        setBeds(bedRes.data.beds);
        setStats(bedRes.data.stats);
      }
      if (patientRes.data.success) setPatients(patientRes.data.patients);
    } catch (err) {
      toast.error("Failed to load bed occupancy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  const handleAddBed = async (e) => {
    e.preventDefault();
    try {
      await API.post("/beds", addFormData);
      toast.success("New bed added to ward");
      setIsAddModalOpen(false);
      fetchBeds();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add bed");
    }
  };

  const handleAllocateBed = async (e) => {
    e.preventDefault();
    if (!selectedBed || !selectedPatientId) return;
    try {
      await API.put(`/beds/${selectedBed._id}/allocate`, { patientId: selectedPatientId });
      toast.success(`Bed ${selectedBed.bedNumber} allocated to patient`);
      setIsAllocateModalOpen(false);
      fetchBeds();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to allocate bed");
    }
  };

  const handleReleaseBed = async (id, bedNum) => {
    try {
      await API.put(`/beds/${id}/release`);
      toast.success(`Bed ${bedNum} released`);
      fetchBeds();
    } catch (err) {
      toast.error("Failed to release bed");
    }
  };

  const columns = [
    {
      header: "Bed Number",
      accessor: "bedNumber",
      cell: (row) => <span className="font-mono font-bold text-slate-900 text-sm">{row.bedNumber}</span>
    },
    {
      header: "Ward",
      accessor: "ward",
      cell: (row) => <span className="font-semibold text-slate-800">{row.ward}</span>
    },
    {
      header: "Bed Type",
      accessor: "bedType"
    },
    {
      header: "Charge / Day",
      cell: (row) => <span className="font-mono font-semibold text-slate-900">₹{row.chargePerDay}</span>
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Assigned Patient",
      cell: (row) => row.assignedPatient ? (
        <div>
          <p className="font-bold text-slate-800">{row.assignedPatient.name}</p>
          <p className="text-[10px] font-mono text-slate-500">{row.assignedPatient.patientId}</p>
        </div>
      ) : <span className="text-slate-400 font-medium">Unassigned</span>
    },
    {
      header: "Actions",
      cell: (row) => (
        <div>
          {row.status === "Available" ? (
            <button
              onClick={() => {
                setSelectedBed(row);
                setSelectedPatientId(patients[0]?._id || "");
                setIsAllocateModalOpen(true);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Allocate Bed
            </button>
          ) : row.status === "Occupied" ? (
            <button
              onClick={() => handleReleaseBed(row._id, row.bedNumber)}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              Release Bed
            </button>
          ) : null}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Occupancy Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Hospital Beds" value={stats.total || 0} icon={BedDouble} color="blue" />
        <StatCard title="Available Beds" value={stats.available || 0} icon={CheckCircle} color="emerald" />
        <StatCard title="Occupied Beds" value={stats.occupied || 0} icon={UserCheck} color="rose" />
        <StatCard title="Under Maintenance" value={stats.maintenance || 0} icon={RefreshCw} color="amber" />
      </div>

      <DataTable
        columns={columns}
        data={beds}
        searchPlaceholder="Search beds by ward or number..."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Bed to Ward
          </button>
        }
      />

      {/* Add Bed Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Bed">
        <form onSubmit={handleAddBed} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Bed Number *</label>
            <input
              type="text"
              required
              value={addFormData.bedNumber}
              onChange={(e) => setAddFormData({ ...addFormData, bedNumber: e.target.value })}
              placeholder="e.g. G-104, ICU-302"
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Ward Name *</label>
            <select
              value={addFormData.ward}
              onChange={(e) => setAddFormData({ ...addFormData, ward: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="General Ward">General Ward</option>
              <option value="Semi-Private Ward">Semi-Private Ward</option>
              <option value="Private Ward">Private Ward</option>
              <option value="ICU">ICU</option>
              <option value="Emergency Ward">Emergency Ward</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Bed Type</label>
            <select
              value={addFormData.bedType}
              onChange={(e) => setAddFormData({ ...addFormData, bedType: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="General">General</option>
              <option value="Semi-Private">Semi-Private</option>
              <option value="Private">Private</option>
              <option value="ICU">ICU</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Charge Per Day (₹)</label>
            <input
              type="number"
              value={addFormData.chargePerDay}
              onChange={(e) => setAddFormData({ ...addFormData, chargePerDay: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl">
              Add Bed
            </button>
          </div>
        </form>
      </Modal>

      {/* Allocate Bed Modal */}
      <Modal isOpen={isAllocateModalOpen} onClose={() => setIsAllocateModalOpen(false)} title={`Allocate Bed ${selectedBed?.bedNumber}`}>
        <form onSubmit={handleAllocateBed} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.patientId}) - {p.phone}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAllocateModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl">
              Confirm Bed Allocation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
