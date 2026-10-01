import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatCard from "../../components/common/StatCard";
import Modal from "../../components/common/Modal";
import { BedDouble, CheckCircle, UserCheck, UserPlus, UserMinus } from "lucide-react";
import { toast } from "react-toastify";

export default function WardAllocationPage() {
  const [wards, setWards] = useState([]);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({ totalSeats: 0, available: 0, occupied: 0 });
  const [selectedWard, setSelectedWard] = useState(null);
  const [actionType, setActionType] = useState(""); // "assign" or "remove"
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const fetchWards = async () => {
    try {
      const res = await API.get("/wards");
      if (res.data.success) {
        setWards(res.data.wards);
        let ts = 0, occ = 0, avail = 0;
        res.data.wards.forEach(w => {
          ts += w.totalSeats;
          occ += w.occupied;
          avail += w.available;
        });
        setStats({ totalSeats: ts, available: avail, occupied: occ });
      }
    } catch (err) {
      toast.error("Failed to load wards");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients");
      if (res.data.success) {
        setPatients(res.data.patients || res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWards();
    fetchPatients();
  }, []);

  const handleAction = async (e) => {
    e.preventDefault();
    if (!selectedWard || !selectedPatientId) return;
    
    try {
      if (actionType === "assign") {
        await API.post(`/wards/assign`, { wardId: selectedWard._id, patientId: selectedPatientId });
        toast.success(`Patient assigned to ${selectedWard.name}`);
      } else if (actionType === "remove") {
        await API.post(`/wards/remove`, { wardId: selectedWard._id, patientId: selectedPatientId });
        toast.success(`Patient removed from ${selectedWard.name}`);
      }
      setSelectedWard(null);
      fetchWards();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  const columns = [
    { header: "Ward Name", accessor: "name", cell: (row) => <span className="font-bold text-slate-900">{row.name}</span> },
    { header: "Price/Day", cell: (row) => <span className="font-mono font-bold">₹{row.price}</span> },
    { header: "Total Seats", accessor: "totalSeats" },
    { header: "Occupied", cell: (row) => <span className="text-rose-600 font-bold">{row.occupied}</span> },
    { header: "Available", cell: (row) => <span className="text-emerald-600 font-bold">{row.available}</span> },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          {row.available > 0 && (
            <button
              onClick={() => {
                setSelectedWard(row);
                setActionType("assign");
                if (patients.length > 0) setSelectedPatientId(patients[0]._id);
              }}
              className="px-3 py-1.5 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" /> Assign
            </button>
          )}
          {row.occupied > 0 && (
            <button
              onClick={() => {
                setSelectedWard(row);
                setActionType("remove");
                if (row.assignedPatients.length > 0) setSelectedPatientId(row.assignedPatients[0]._id);
              }}
              className="px-3 py-1.5 text-[11px] font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded transition-colors flex items-center gap-1"
            >
              <UserMinus className="w-3.5 h-3.5" /> Remove
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Ward Seats" value={stats.totalSeats} icon={BedDouble} color="blue" />
        <StatCard title="Available Seats" value={stats.available} icon={CheckCircle} color="emerald" />
        <StatCard title="Occupied Seats" value={stats.occupied} icon={UserCheck} color="rose" />
      </div>

      <DataTable columns={columns} data={wards} searchPlaceholder="Search wards..." />

      {selectedWard && (
        <Modal 
          isOpen={!!selectedWard} 
          onClose={() => setSelectedWard(null)} 
          title={`${actionType === 'assign' ? 'Assign Patient to' : 'Remove Patient from'} ${selectedWard.name}`}
        >
          <form onSubmit={handleAction} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Patient {actionType === 'remove' ? 'to Remove' : 'to Assign'} *
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold focus:ring-2 focus:ring-blue-500"
              >
                {actionType === "assign" 
                  ? patients.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.patientId})
                      </option>
                    ))
                  : selectedWard.assignedPatients.map((p) => (
                      <option key={p._id || p} value={p._id || p}>
                        {p.name || "Unknown"} ({p.patientId || p})
                      </option>
                    ))
                }
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedWard(null)}
                className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 font-bold text-white rounded-xl shadow-md ${actionType === 'assign' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'}`}
              >
                {actionType === 'assign' ? 'Confirm Assignment' : 'Confirm Removal'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
