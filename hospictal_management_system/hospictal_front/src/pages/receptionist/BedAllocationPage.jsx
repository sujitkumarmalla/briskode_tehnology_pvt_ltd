import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { BedDouble, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function BedAllocationPage() {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const fetchBeds = async () => {
    try {
      const [bedRes, patRes] = await Promise.all([
        API.get("/beds"),
        API.get("/patients")
      ]);
      if (bedRes.data.success) setBeds(bedRes.data.beds);
      if (patRes.data.success) {
        setPatients(patRes.data.patients);
        if (patRes.data.patients.length > 0) setSelectedPatientId(patRes.data.patients[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load beds");
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
      toast.success(`Bed ${selectedBed.bedNumber} allocated`);
      setSelectedBed(null);
      fetchBeds();
    } catch (err) {
      toast.error("Allocation failed");
    }
  };

  const handleRelease = async (id) => {
    try {
      await API.put(`/beds/${id}/release`);
      toast.success("Bed released");
      fetchBeds();
    } catch (err) {
      toast.error("Release failed");
    }
  };

  const columns = [
    { header: "Bed No.", accessor: "bedNumber", cell: (row) => <span className="font-mono font-bold text-slate-900">{row.bedNumber}</span> },
    { header: "Ward", accessor: "ward" },
    { header: "Bed Type", accessor: "bedType" },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    { header: "Occupant Patient", cell: (row) => row.assignedPatient ? `${row.assignedPatient.name} (${row.assignedPatient.patientId})` : "Unassigned" },
    {
      header: "Action",
      cell: (row) => (
        row.status === "Available" ? (
          <button onClick={() => setSelectedBed(row)} className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg">
            Allocate Bed
          </button>
        ) : (
          <button onClick={() => handleRelease(row._id)} className="px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-lg">
            Release Bed
          </button>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={beds} searchPlaceholder="Search ward beds..." />

      {selectedBed && (
        <Modal isOpen={!!selectedBed} onClose={() => setSelectedBed(null)} title={`Allocate Bed ${selectedBed.bedNumber}`}>
          <form onSubmit={handleAllocate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Select Patient *</label>
              <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold">
                {patients.map(p => (
                  <option key={p._id} value={p._id}>{p.name} ({p.patientId})</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button type="button" onClick={() => setSelectedBed(null)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 rounded-xl">Confirm Allocation</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
