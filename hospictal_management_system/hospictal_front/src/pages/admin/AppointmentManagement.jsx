import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { Calendar, Filter } from "lucide-react";
import { toast } from "react-toastify";

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAppointments = async () => {
    try {
      const url = statusFilter ? `/appointments?status=${statusFilter}` : "/appointments";
      const res = await API.get(url);
      if (res.data.success) setAppointments(res.data.appointments);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const columns = [
    {
      header: "Appointment ID",
      accessor: "appointmentId",
      cell: (row) => <span className="font-mono font-bold text-blue-600">{row.appointmentId}</span>
    },
    {
      header: "Patient",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.patient?.name}</p>
          <p className="text-[10px] font-mono text-slate-500">{row.patient?.patientId}</p>
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
      header: "Department",
      cell: (row) => <span className="text-slate-700">{row.department?.name || "General"}</span>
    },
    {
      header: "Date & Time",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{new Date(row.date).toLocaleDateString()}</p>
          <p className="text-[10px] font-semibold text-blue-600">{row.time}</p>
        </div>
      )
    },
    {
      header: "Token",
      cell: (row) => (
        <span className="font-mono font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {row.tokenNumber || "-"}
        </span>
      )
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Status Filter Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-blue-600" /> Filter Status:
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {["", "Scheduled", "Checked-In", "In Consultation", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                statusFilter === st
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st || "All Appointments"}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={appointments}
        searchPlaceholder="Search appointments by Patient ID, Doctor name, Appointment ID..."
      />
    </div>
  );
}
