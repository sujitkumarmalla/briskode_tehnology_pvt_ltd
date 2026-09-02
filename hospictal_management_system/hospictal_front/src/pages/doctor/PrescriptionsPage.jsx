import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { Pill } from "lucide-react";
import { toast } from "react-toastify";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await API.get("/prescriptions");
        if (res.data.success) setPrescriptions(res.data.prescriptions);
      } catch (err) {
        toast.error("Failed to load prescriptions");
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  const columns = [
    { header: "Prescription ID", accessor: "prescriptionId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.prescriptionId}</span> },
    { header: "Patient", cell: (row) => <span className="font-bold text-slate-800">{row.patient?.name} ({row.patient?.patientId})</span> },
    { header: "Medicines Count", cell: (row) => <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{row.medicines?.length || 0} items</span> },
    { header: "Date Issued", cell: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: "Pharmacy Status", cell: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={prescriptions} searchPlaceholder="Search prescriptions by Rx ID or Patient name..." />
    </div>
  );
}
