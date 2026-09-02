import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import PrintableLabReport from "../../components/common/PrintableLabReport";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function LabRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqRes, resRes] = await Promise.all([
          API.get("/lab/requests"),
          API.get("/lab/results")
        ]);
        if (reqRes.data.success) setRequests(reqRes.data.requests);
        if (resRes.data.success) setResults(resRes.data.results);
      } catch (err) {
        toast.error("Failed to load lab requests");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { header: "Request ID", accessor: "requestId", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.requestId}</span> },
    { header: "Patient", cell: (row) => <span className="font-bold text-slate-800">{row.patient?.name} ({row.patient?.patientId})</span> },
    { header: "Test Name", accessor: "testName", cell: (row) => <span className="font-bold text-slate-900">{row.testName}</span> },
    { header: "Priority", cell: (row) => <StatusBadge status={row.priority} /> },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Action",
      cell: (row) => {
        const matchedResult = results.find(r => r.labRequest?._id === row._id || r.labRequest === row._id);
        return matchedResult ? (
          <button
            onClick={() => setSelectedResult(matchedResult)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
          >
            <Eye className="w-3.5 h-3.5" /> View Lab Report
          </button>
        ) : <span className="text-slate-400 text-xs italic">Awaiting lab results</span>;
      }
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={requests} searchPlaceholder="Search ordered lab requests..." />

      {selectedResult && (
        <Modal isOpen={!!selectedResult} onClose={() => setSelectedResult(null)} title="Official Diagnostic Report" maxWidth="max-w-4xl">
          <PrintableLabReport result={selectedResult} onClose={() => setSelectedResult(null)} />
        </Modal>
      )}
    </div>
  );
}
