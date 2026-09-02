import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { Search, Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function MedicalRecordsPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        if (res.data.success) setPatients(res.data.patients);
      } catch (err) {
        toast.error("Failed to load records");
      }
    };
    fetchPatients();
  }, []);

  const handleInspect = async (p) => {
    setSelectedPatient(p);
    try {
      const res = await API.get(`/patients/${p._id}`);
      if (res.data.success) setHistory(res.data.history);
    } catch (err) {
      toast.error("Failed to load details");
    }
  };

  const columns = [
    { header: "Patient ID", accessor: "patientId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.patientId}</span> },
    { header: "Name", accessor: "name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Age / Gender", cell: (row) => `${row.age} Yrs / ${row.gender}` },
    { header: "Phone", accessor: "phone" },
    {
      header: "Action",
      cell: (row) => (
        <button onClick={() => handleInspect(row)} className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" /> Full Medical History
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={patients} searchPlaceholder="Search electronic medical records (EMR)..." />

      {selectedPatient && (
        <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title={`Electronic Medical Record: ${selectedPatient.name}`}>
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
              <p><strong>Patient ID:</strong> {selectedPatient.patientId}</p>
              <p><strong>Age/Gender:</strong> {selectedPatient.age} Yrs / {selectedPatient.gender}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p><strong>Address:</strong> {selectedPatient.address}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Previous Encounters ({history?.consultations?.length || 0})</h4>
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
