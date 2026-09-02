import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { Stethoscope, Calendar } from "lucide-react";
import { toast } from "react-toastify";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      if (res.data.success) setAppointments(res.data.appointments);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    {
      header: "Token",
      cell: (row) => <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{row.tokenNumber || "A-00"}</span>
    },
    {
      header: "Patient Name",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.patient?.name}</p>
          <p className="text-[10px] font-mono text-slate-500">{row.patient?.patientId} | {row.patient?.gender}, {row.patient?.age} yrs</p>
        </div>
      )
    },
    {
      header: "Appointment Time",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{new Date(row.date).toLocaleDateString()}</p>
          <p className="text-[10px] text-blue-600 font-semibold">{row.time}</p>
        </div>
      )
    },
    {
      header: "Chief Reason",
      accessor: "reason"
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Action",
      cell: (row) => (
        <Link
          to="/doctor/consultations"
          state={{ appointment: row }}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
        >
          <Stethoscope className="w-3.5 h-3.5" /> Start Consult
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={appointments}
        searchPlaceholder="Search today's appointments by Patient ID, Name, Token..."
      />
    </div>
  );
}
