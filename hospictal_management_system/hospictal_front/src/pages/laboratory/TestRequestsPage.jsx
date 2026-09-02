import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

export default function TestRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await API.get("/lab/requests");
      if (res.data.success) setRequests(res.data.requests);
    };
    fetchRequests();
  }, []);

  const columns = [
    { header: "Request ID", accessor: "requestId", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.requestId}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Doctor", cell: (row) => row.doctor?.name },
    { header: "Test Name", accessor: "testName" },
    { header: "Priority", cell: (row) => <StatusBadge status={row.priority} /> },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={requests} searchPlaceholder="Search test requests..." />
    </div>
  );
}
