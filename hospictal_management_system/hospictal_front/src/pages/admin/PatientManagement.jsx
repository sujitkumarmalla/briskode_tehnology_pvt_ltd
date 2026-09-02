import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import { Eye, FileText, Calendar, Pill, FlaskConical, Receipt } from "lucide-react";
import { toast } from "react-toastify";

export default function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients");
      if (res.data.success) setPatients(res.data.patients);
    } catch (err) {
      toast.error("Failed to load patient records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleViewHistory = async (patient) => {
    setSelectedPatient(patient);
    setIsHistoryOpen(true);
    try {
      const res = await API.get(`/patients/${patient._id}`);
      if (res.data.success) {
        setPatientHistory(res.data.history);
      }
    } catch (err) {
      toast.error("Failed to load medical history");
    }
  };

  const columns = [
    {
      header: "Patient ID",
      accessor: "patientId",
      cell: (row) => <span className="font-mono font-bold text-blue-600">{row.patientId}</span>
    },
    {
      header: "Full Name",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.name}</p>
          <p className="text-[10px] text-slate-500">{row.phone}</p>
        </div>
      )
    },
    {
      header: "Age / Gender",
      cell: (row) => <span className="text-slate-700">{row.age} Yrs / {row.gender}</span>
    },
    {
      header: "Blood Group",
      cell: (row) => (
        <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-100 text-xs">
          {row.bloodGroup || "Unknown"}
        </span>
      )
    },
    {
      header: "Emergency Contact",
      cell: (row) => (
        <span className="text-xs text-slate-600">
          {row.emergencyContact?.name || "-"} ({row.emergencyContact?.relation || "Contact"})
        </span>
      )
    },
    {
      header: "Registered Date",
      cell: (row) => <span className="text-slate-500 text-xs">{new Date(row.createdAt).toLocaleDateString()}</span>
    },
    {
      header: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleViewHistory(row)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Medical History
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={patients}
        searchPlaceholder="Search patients by name, Patient ID (PAT-2026-XXXXX), phone..."
      />

      {/* Patient Complete Medical History Modal */}
      <Modal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        title={`Medical History: ${selectedPatient?.name} (${selectedPatient?.patientId})`}
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="space-y-6 text-xs">
            {/* Demographics Banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Age / Gender</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedPatient.age} Yrs / {selectedPatient.gender}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Blood Group</p>
                <p className="font-bold text-red-600 text-sm mt-0.5">{selectedPatient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Phone Number</p>
                <p className="font-semibold text-slate-800 mt-0.5">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Emergency Contact</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {selectedPatient.emergencyContact?.name} ({selectedPatient.emergencyContact?.phone})
                </p>
              </div>
            </div>

            {/* Medical History & Allergies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/80">
                <p className="font-bold text-amber-900 mb-1">Chronic Medical History:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPatient.medicalHistory?.length > 0 ? (
                    selectedPatient.medicalHistory.map((m, i) => (
                      <span key={i} className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {m}
                      </span>
                    ))
                  ) : <span className="text-slate-400">None reported</span>}
                </div>
              </div>
              <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-200/80">
                <p className="font-bold text-rose-900 mb-1">Known Allergies:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPatient.allergies?.length > 0 ? (
                    selectedPatient.allergies.map((a, i) => (
                      <span key={i} className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {a}
                      </span>
                    ))
                  ) : <span className="text-slate-400">No known allergies</span>}
                </div>
              </div>
            </div>

            {/* Consultations Timeline */}
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Past Consultations & Diagnoses
              </h4>
              <div className="space-y-3">
                {patientHistory?.consultations?.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">No consultation history recorded yet.</p>
                ) : (
                  patientHistory?.consultations?.map((c) => (
                    <div key={c._id} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-900">{c.diagnosis}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-600"><strong>Doctor:</strong> {c.doctor?.name} ({c.doctor?.specialization})</p>
                      <p className="text-slate-600"><strong>Chief Complaint:</strong> {c.chiefComplaint}</p>
                      {c.vitals && (
                        <div className="flex gap-4 text-[10px] bg-slate-50 p-2 rounded-lg font-mono text-slate-700">
                          <span>BP: {c.vitals.bloodPressure || "-"}</span>
                          <span>HR: {c.vitals.heartRate || "-"}</span>
                          <span>Temp: {c.vitals.temperature || "-"}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
