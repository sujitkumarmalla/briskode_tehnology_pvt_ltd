import React from "react";
import { Printer, ShieldCheck, Calendar, Clock, Stethoscope, User } from "lucide-react";

export default function PrintableOPDSlip({ appointment, onClose }) {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-blue-200">
      {/* Action Toolbar */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-base font-bold text-slate-800">OPD Consultation Token Pass</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" /> Print OPD Slip
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Printable OPD Pass Slip */}
      <div className="print-area font-sans text-slate-900 border-2 border-dashed border-blue-600 p-6 rounded-2xl bg-blue-50/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-4 mb-4">
          <img
            src="/briskode_logo.png"
            alt="Briskode Hospital Logo"
            className="h-12 bg-white p-1 rounded-xl border object-contain"
          />
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Token Number</span>
            <span className="text-2xl font-black text-blue-700 font-mono">
              {appointment.tokenNumber || "OPD-A-001"}
            </span>
          </div>
        </div>

        {/* Appointment ID & Date */}
        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-4 text-xs">
          <div>
            <span className="text-slate-500 text-[10px] block">Appt ID:</span>
            <span className="font-mono font-bold text-slate-800">{appointment.appointmentId}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 text-[10px] block">Date & Time:</span>
            <span className="font-bold text-slate-800">
              {new Date(appointment.date).toLocaleDateString()} @ {appointment.time}
            </span>
          </div>
        </div>

        {/* Patient & Doctor Box */}
        <div className="space-y-3 text-xs mb-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Patient Details</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{appointment.patient?.name}</p>
            <p className="text-slate-600 text-[11px]">
              Patient ID: <span className="font-mono font-bold text-blue-600">{appointment.patient?.patientId}</span> | {appointment.patient?.age} Yrs / {appointment.patient?.gender}
            </p>
            <p className="text-slate-600 text-[11px]">Phone: {appointment.patient?.phone}</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold uppercase text-slate-400">Consulting Doctor & Department</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{appointment.doctor?.name}</p>
            <p className="text-slate-600 text-[11px]">{appointment.doctor?.specialization} ({appointment.department?.name || "General Medicine"})</p>
            <p className="text-slate-700 font-semibold text-[11px] mt-1">
              Consultation Fee: <span className="font-mono text-emerald-700 font-bold">₹{appointment.doctor?.consultationFee || 500}</span>
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-3 flex justify-between items-center">
          <p>Please present this token at Doctor's cabin when called.</p>
          <p className="font-semibold text-slate-700">Issued by Reception</p>
        </div>
      </div>
    </div>
  );
}
