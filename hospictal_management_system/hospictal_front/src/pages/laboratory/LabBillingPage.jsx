import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

export default function LabBillingPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await API.get("/lab/results");
      if (res.data.success) setResults(res.data.results);
    };
    fetchResults();
  }, []);

  const columns = [
    { header: "Report ID", accessor: "resultId", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.resultId}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Test Name", accessor: "testName" },
    { header: "Date Completed", cell: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: "Billing Status", cell: (row) => <StatusBadge status="Completed" /> }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={results} searchPlaceholder="Search lab billing entries..." />
    </div>
  );
}
