import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { TestTube, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function SampleCollectionPage() {
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [sampleType, setSampleType] = useState("Whole Blood");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/lab/requests");
      if (res.data.success) setRequests(res.data.requests);
    } catch (err) {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCollect = async (e) => {
    e.preventDefault();
    if (!selectedReq) return;
    try {
      const res = await API.put(`/lab/requests/${selectedReq._id}/sample`, { sampleType });
      if (res.data.success) {
        toast.success(`Sample Collected! Sample ID: ${res.data.labRequest.sampleId}`);
        setSelectedReq(null);
        fetchRequests();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to collect sample");
    }
  };

  const columns = [
    { header: "Request ID", accessor: "requestId", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.requestId}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Test Name", accessor: "testName" },
    { header: "Sample ID", cell: (row) => <span className="font-mono font-bold text-slate-800">{row.sampleId || "Not Collected"}</span> },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Action",
      cell: (row) => (
        row.status === "Requested" ? (
          <button onClick={() => setSelectedReq(row)} className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm">
            <TestTube className="w-3.5 h-3.5" /> Collect Sample
          </button>
        ) : <span className="text-emerald-700 font-bold text-xs">Collected</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={requests} searchPlaceholder="Search sample collection list..." />

      {selectedReq && (
        <Modal isOpen={!!selectedReq} onClose={() => setSelectedReq(null)} title={`Collect Sample for ${selectedReq.patient?.name}`}>
          <form onSubmit={handleCollect} className="space-y-4 text-xs">
            <div>
              <p className="font-bold text-slate-800">Test: {selectedReq.testName}</p>
              <p className="text-slate-600">Referred Doctor: {selectedReq.doctor?.name}</p>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sample Type *</label>
              <select value={sampleType} onChange={(e) => setSampleType(e.target.value)} className="w-full p-2.5 border rounded-xl font-semibold">
                <option value="Whole Blood">Whole Blood</option>
                <option value="Serum">Serum</option>
                <option value="Plasma">Plasma</option>
                <option value="Urine">Urine</option>
                <option value="Swab">Swab</option>
                <option value="Tissue / Biopsy">Tissue / Biopsy</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setSelectedReq(null)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl">Generate Sample ID & Mark Collected</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
