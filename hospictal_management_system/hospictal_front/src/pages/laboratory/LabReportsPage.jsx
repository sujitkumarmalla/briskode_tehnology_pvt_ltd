import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import PrintableLabReport from "../../components/common/PrintableLabReport";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function LabReportsPage() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get("/lab/results");
        if (res.data.success) setResults(res.data.results);
      } catch (err) {
        toast.error("Failed to load lab reports");
      }
    };
    fetchResults();
  }, []);

  const columns = [
    { header: "Result ID", accessor: "resultId", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.resultId}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Test Name", accessor: "testName" },
    { header: "Completed Date", cell: (row) => new Date(row.createdAt).toLocaleDateString() },
    {
      header: "Action",
      cell: (row) => (
        <button onClick={() => setSelectedResult(row)} className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg">
          <Eye className="w-3.5 h-3.5" /> View / Print Report
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={results} searchPlaceholder="Search finalized lab reports..." />

      {selectedResult && (
        <Modal isOpen={!!selectedResult} onClose={() => setSelectedResult(null)} title="Official Lab Diagnostic Report" maxWidth="max-w-4xl">
          <PrintableLabReport result={selectedResult} onClose={() => setSelectedResult(null)} />
        </Modal>
      )}
    </div>
  );
}
