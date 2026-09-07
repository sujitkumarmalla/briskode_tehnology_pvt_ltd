import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import StatCard from "../../components/common/StatCard";
import Modal from "../../components/common/Modal";
import { BedDouble, CheckCircle, UserCheck, RefreshCw, UserPlus } from "lucide-react";
import { toast } from "react-toastify";

export default function BedAllocationPage() {
  const [beds, setBeds] = useState([]);
  const [stats, setStats] = useState({});
  const [patients, setPatients] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const fetchBeds = async () => {
    try {
      const [bedRes, patRes] = await Promise.all([
        API.get("/beds"),
        API.get("/patients")
      ]);
      if (bedRes.data.success) {
        setBeds(bedRes.data.beds);
        setStats(bedRes.data.stats || {});
      }
      if (patRes.data.success) {
        setPatients(patRes.data.patients);
        if (patRes.data.patients.length > 0) setSelectedPatientId(patRes.data.patients[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load bed occupancy data");
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  const handleAllocate = async (e) => {
    e.preventDefault();
    if (!selectedBed || !selectedPatientId) return;
    try {
      await API.put(`/beds/${selectedBed._id}/allocate`, { patientId: selectedPatientId });
      toast.success(`Bed ${selectedBed.bedNumber} allocated to patient`);
      setSelectedBed(null);
      fetchBeds();
    } catch (err) {
      toast.error(err.response?.data?.message || "Allocation failed");
    }
  };

  const handleRelease = async (id, bedNum) => {
    try {
      await API.put(`/beds/${id}/release`);
      toast.success(`Bed ${bedNum} released`);
      fetchBeds();
    } catch (err) {
      toast.error("Release failed");
    }
  };

  const columns = [
    { header: "Bed No.", accessor: "bedNumber", cell: (row) => <span className="font-mono font-bold text-slate-900 text-sm">{row.bedNumber}</span> },
    { header: "Ward", accessor: "ward", cell: (row) => <span className="font-semibold text-slate-800">{row.ward}</span> },
    { header: "Bed Type", accessor: "bedType" },
    { header: "Daily Rate", cell: (row) => <span className="font-mono font-bold text-slate-900">₹{row.chargePerDay}</span> },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Occupant Patient",
      cell: (row) => row.assignedPatient ? (
        <div>
          <p className="font-bold text-slate-800">{row.assignedPatient.name}</p>
          <p className="text-[10px] font-mono text-slate-500">{row.assignedPatient.patientId}</p>
        </div>
      ) : <span className="text-slate-400 font-medium">Unassigned</span>
    },
    {
      header: "Reception Action",
      cell: (row) => (
        row.status === "Available" ? (
          <button
            onClick={() => {
              setSelectedBed(row);
              if (patients.length > 0) setSelectedPatientId(patients[0]._id);
            }}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5" /> Assign Patient
          </button>
        ) : row.status === "Occupied" ? (
          <button
            onClick={() => handleRelease(row._id, row.bedNumber)}
            className="px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
          >
            Release Bed
          </button>
        ) : <span className="text-[11px] text-amber-700 font-bold">In Maintenance</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Occupancy Stats Bar for Receptionist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Hospital Beds" value={stats.total || beds.length} icon={BedDouble} color="blue" />
        <StatCard title="Available Beds" value={stats.available || beds.filter(b => b.status === "Available").length} icon={CheckCircle} color="emerald" />
        <StatCard title="Occupied Beds" value={stats.occupied || beds.filter(b => b.status === "Occupied").length} icon={UserCheck} color="rose" />
        <StatCard title="Under Maintenance" value={stats.maintenance || 0} icon={RefreshCw} color="amber" />
      </div>

      <DataTable columns={columns} data={beds} searchPlaceholder="Search ward beds..." />

      {selectedBed && (
        <Modal isOpen={!!selectedBed} onClose={() => setSelectedBed(null)} title={`Assign Patient to Bed ${selectedBed.bedNumber} (${selectedBed.ward})`}>
          <form onSubmit={handleAllocate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Inpatient *</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500"
              >
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.patientId}) — Phone: {p.phone || "N/A"}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl text-blue-900 space-y-1">
              <p className="font-bold">Bed Details:</p>
              <p>Ward: {selectedBed.ward} | Type: {selectedBed.bedType}</p>
              <p className="font-mono font-bold">Daily Bed Charge: ₹{selectedBed.chargePerDay}/day</p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedBed(null)}
                className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
              >
                Confirm Bed Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

