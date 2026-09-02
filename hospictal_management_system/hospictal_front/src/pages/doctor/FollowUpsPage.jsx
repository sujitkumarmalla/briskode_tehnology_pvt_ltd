import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { Plus, Clock, Calendar } from "lucide-react";
import { toast } from "react-toastify";

export default function FollowUpsPage() {
  const [patients, setPatients] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    followUpDate: "",
    reason: "Post-consultation follow-up",
    instructions: "Bring lab test results"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/patients");
        if (res.data.success) {
          setPatients(res.data.patients);
          if (res.data.patients.length > 0) {
            setFormData(f => ({ ...f, patientId: res.data.patients[0]._id }));
          }
        }
      } catch (err) {
        toast.error("Failed to load patients");
      }
    };
    fetchData();
  }, []);

  const handleAddFollowUp = (e) => {
    e.preventDefault();
    const p = patients.find(x => x._id === formData.patientId);
    setFollowUps([...followUps, { ...formData, patientName: p?.name, patientIdStr: p?.patientId, _id: Date.now() }]);
    toast.success("Follow-up schedule saved");
    setIsModalOpen(false);
  };

  const columns = [
    { header: "Patient", cell: (row) => <span className="font-bold text-slate-800">{row.patientName} ({row.patientIdStr})</span> },
    { header: "Scheduled Date", cell: (row) => <span className="font-bold text-blue-600 font-mono">{row.followUpDate}</span> },
    { header: "Reason", accessor: "reason" },
    { header: "Instructions", accessor: "instructions" }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={followUps}
        searchPlaceholder="Search follow-ups..."
        actionButton={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md"
          >
            <Plus className="w-4 h-4" /> Schedule Follow-up
          </button>
        }
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Patient Follow-up">
        <form onSubmit={handleAddFollowUp} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold"
            >
              {patients.map((p) => (
                <option key={p._id} value={p._id}>{p.name} ({p.patientId})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Follow-up Date *</label>
            <input
              type="date"
              required
              value={formData.followUpDate}
              onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reason for Follow-up</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructions for Patient</label>
            <input
              type="text"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl">Save Schedule</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
