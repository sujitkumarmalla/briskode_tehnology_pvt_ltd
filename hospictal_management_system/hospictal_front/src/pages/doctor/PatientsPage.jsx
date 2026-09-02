import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { Eye, FileText } from "lucide-react";
import { toast } from "react-toastify";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        if (res.data.success) setPatients(res.data.patients);
      } catch (err) {
        toast.error("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleViewHistory = async (patient) => {
    setSelectedPatient(patient);
    try {
      const res = await API.get(`/patients/${patient._id}`);
      if (res.data.success) setHistory(res.data.history);
    } catch (err) {
      toast.error("Failed to load patient history");
    }
  };

  const columns = [
    { header: "Patient ID", accessor: "patientId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.patientId}</span> },
    { header: "Patient Name", accessor: "name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Age / Gender", cell: (row) => `${row.age} Yrs / ${row.gender}` },
    { header: "Blood Group", cell: (row) => <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">{row.bloodGroup}</span> },
    { header: "Phone", accessor: "phone" },
    {
      header: "Action",
      cell: (row) => (
        <button
          onClick={() => handleViewHistory(row)}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
        >
          <Eye className="w-3.5 h-3.5" /> Medical History
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={patients} searchPlaceholder="Search patient records..." />

      {selectedPatient && (
        <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title={`Medical History: ${selectedPatient.name}`}>
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
              <p><strong>ID:</strong> {selectedPatient.patientId}</p>
              <p><strong>Age/Gender:</strong> {selectedPatient.age} Yrs / {selectedPatient.gender}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Previous Consultations ({history?.consultations?.length || 0})</h4>
              {history?.consultations?.map((c) => (
                <div key={c._id} className="p-3 bg-white border border-slate-200 rounded-xl mb-2">
                  <p className="font-bold text-slate-900">{c.diagnosis}</p>
                  <p className="text-slate-600">{c.chiefComplaint}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
