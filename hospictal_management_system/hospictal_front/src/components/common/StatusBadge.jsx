import React from "react";

export default function StatusBadge({ status }) {
  if (!status) return null;

  const styles = {
    // Appointment Statuses
    Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
    "Checked-In": "bg-amber-50 text-amber-700 border-amber-200",
    "In Consultation": "bg-purple-50 text-purple-700 border-purple-200",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    "No Show": "bg-slate-100 text-slate-700 border-slate-300",

    // Prescription / Lab Request Statuses
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Processing: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Dispensed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Sample Collected": "bg-cyan-50 text-cyan-700 border-cyan-200",

    // Payment Statuses
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Partially Paid": "bg-amber-50 text-amber-700 border-amber-200",

    // Bed Statuses
    Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Occupied: "bg-rose-50 text-rose-700 border-rose-200",
    Reserved: "bg-purple-50 text-purple-700 border-purple-200",
    Maintenance: "bg-slate-100 text-slate-700 border-slate-300",

    // Priority
    Urgent: "bg-amber-100 text-amber-800 border-amber-300 font-bold",
    Emergency: "bg-rose-100 text-rose-800 border-rose-300 font-bold animate-pulse"
  };

  const badgeClass = styles[status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
      {status}
    </span>
  );
}
