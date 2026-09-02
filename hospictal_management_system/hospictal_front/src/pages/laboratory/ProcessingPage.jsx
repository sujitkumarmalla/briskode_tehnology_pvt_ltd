import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { Microscope } from "lucide-react";
import { toast } from "react-toastify";

export default function ProcessingPage() {
  const [requests, setRequests] = useState([]);

  const fetchProcessing = async () => {
    const res = await API.get("/lab/requests");
    if (res.data.success) setRequests(res.data.requests);
  };

  useEffect(() => {
    fetchProcessing();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(`/lab/requests/${id}/status`, { status });
      toast.success(`Status updated to ${status}`);
      fetchProcessing();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const columns = [
    { header: "Request ID", accessor: "requestId", cell: (row) => <span className="font-mono font-bold">{row.requestId}</span> },
    { header: "Sample ID", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.sampleId || "N/A"}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Test Name", accessor: "testName" },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Action",
      cell: (row) => (
        row.status === "Sample Collected" ? (
          <button onClick={() => handleUpdateStatus(row._id, "Processing")} className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm">
            <Microscope className="w-3.5 h-3.5" /> Start Processing
          </button>
        ) : null
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={requests} searchPlaceholder="Search processing samples..." />
    </div>
  );
}
