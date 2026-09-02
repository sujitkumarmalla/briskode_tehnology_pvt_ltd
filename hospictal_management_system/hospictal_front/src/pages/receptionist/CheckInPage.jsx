import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { Clock, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function CheckInPage() {
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

  const handleCheckIn = async (id, patientName) => {
    try {
      const res = await API.put(`/appointments/${id}/check-in`);
      if (res.data.success) {
        toast.success(`Checked In ${patientName}! Token: ${res.data.appointment.tokenNumber}`);
        fetchAppointments();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Check-in failed");
    }
  };

  const columns = [
    {
      header: "Token",
      cell: (row) => (
        <span className="font-mono font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-sm">
          {row.tokenNumber || "-"}
        </span>
      )
    },
    {
      header: "Patient",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.patient?.name}</p>
          <p className="text-[10px] font-mono text-slate-500">{row.patient?.patientId} | Phone: {row.patient?.phone}</p>
        </div>
      )
    },
    {
      header: "Assigned Doctor",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.doctor?.name}</p>
          <p className="text-[10px] text-slate-500">{row.doctor?.specialization}</p>
        </div>
      )
    },
    {
      header: "Scheduled Time",
      cell: (row) => <span className="font-semibold text-blue-600">{row.time}</span>
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Action",
      cell: (row) => (
        row.status === "Scheduled" ? (
          <button
            onClick={() => handleCheckIn(row._id, row.patient?.name)}
            className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
          >
            <Clock className="w-4 h-4" /> Check-In & Issue Token
          </button>
        ) : (
          <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Checked In
          </span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={appointments}
        searchPlaceholder="Search arriving patient by name, Patient ID..."
      />
    </div>
  );
}
