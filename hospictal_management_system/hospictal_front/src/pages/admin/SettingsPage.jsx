import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { ShieldCheck, Clock, User, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const res = await API.get("/audit");
        if (res.data.success) setLogs(res.data.logs);
      } catch (err) {
        toast.error("Failed to load audit logs");
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, []);

  const columns = [
    {
      header: "Timestamp",
      cell: (row) => <span className="font-mono text-xs text-slate-500">{new Date(row.createdAt).toLocaleString()}</span>
    },
    {
      header: "Staff Member",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.userName}</p>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{row.userRole}</span>
        </div>
      )
    },
    {
      header: "Action",
      cell: (row) => <span className="font-mono font-bold text-blue-600">{row.action}</span>
    },
    {
      header: "Module",
      accessor: "module"
    },
    {
      header: "Details",
      accessor: "details"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">System Activity Audit Log</h2>
          <p className="text-xs text-slate-500">Track all administrative, clinical, pharmacy, and laboratory staff actions</p>
        </div>
        <ShieldCheck className="w-8 h-8 text-blue-600" />
      </div>

      <DataTable
        columns={columns}
        data={logs}
        searchPlaceholder="Search audit logs by staff name, role, action..."
      />
    </div>
  );
}
