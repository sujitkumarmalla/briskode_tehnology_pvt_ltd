import React from "react";
import { Printer, ShieldCheck, CheckCircle, AlertTriangle } from "lucide-react";

export default function PrintableLabReport({ result, onClose }) {
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border border-slate-200">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-lg font-bold text-slate-800">Laboratory Diagnostic Report</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Report / PDF
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="print-area font-sans text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/briskode_logo.png"
              alt="Briskode Hospital Logo"
              className="h-14 bg-white p-1 rounded-xl border object-contain"
            />
            <div>
              <p className="text-[10px] text-slate-500 font-semibold">Department of Pathology & Diagnostic Laboratory | OMFED Square, Patia, Bhubaneswar</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black text-indigo-700 tracking-wider">LAB REPORT</h2>
            <p className="text-xs font-mono font-bold text-slate-700 mt-1">{result.resultId}</p>
            <p className="text-[11px] text-slate-500">Date: {new Date(result.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient & Doctor Box */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl mb-6 text-xs border border-slate-100">
          <div>
            <p className="text-slate-600">Patient Name: <span className="font-bold text-slate-900">{result.patient?.name}</span></p>
            <p className="text-slate-600">Patient ID: <span className="font-mono font-semibold text-slate-800">{result.patient?.patientId}</span></p>
            <p className="text-slate-600">Age / Gender: {result.patient?.age} Yrs / {result.patient?.gender}</p>
            <p className="text-slate-600">Blood Group: <span className="font-semibold">{result.patient?.bloodGroup || "N/A"}</span></p>
          </div>
          <div className="text-right">
            <p className="text-slate-600">Referred Doctor: <span className="font-bold text-slate-900">{result.doctor?.name || "Attending Physician"}</span></p>
            <p className="text-slate-600">Specialization: {result.doctor?.specialization || "General Medicine"}</p>
            <p className="text-slate-600">Test Name: <span className="font-bold text-indigo-700">{result.testName}</span></p>
          </div>
        </div>

        {/* Test Findings Table */}
        <table className="w-full text-left text-xs mb-6 border-collapse">
          <thead>
            <tr className="bg-indigo-950 text-white uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3 rounded-l-lg">Investigation Parameter</th>
              <th className="py-2.5 px-3 text-center">Observed Value</th>
              <th className="py-2.5 px-3 text-center">Reference Range</th>
              <th className="py-2.5 px-3 text-center">Unit</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {result.findings?.map((item, idx) => (
              <tr key={idx} className={item.isAbnormal ? "bg-red-50/60 font-semibold" : "hover:bg-slate-50"}>
                <td className="py-3 px-3 text-slate-900">{item.parameter}</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">{item.value}</td>
                <td className="py-3 px-3 text-center text-slate-600">{item.referenceRange || "N/A"}</td>
                <td className="py-3 px-3 text-center text-slate-600">{item.unit || "-"}</td>
                <td className="py-3 px-3 text-right">
                  {item.isAbnormal ? (
                    <span className="inline-flex items-center gap-1 text-red-600 text-[11px] font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> High / Abnormal
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Normal
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Remarks Box */}
        {result.remarks && (
          <div className="bg-amber-50/50 border border-amber-200/80 p-3 rounded-xl mb-6 text-xs">
            <p className="font-bold text-amber-900">Clinical Pathologist Remarks:</p>
            <p className="text-slate-700 mt-0.5">{result.remarks}</p>
          </div>
        )}

        {/* Signatures */}
        <div className="border-t border-slate-200 pt-8 flex justify-between items-end text-xs text-slate-500">
          <div>
            <p className="text-slate-700 font-semibold">Processed By: {result.technician?.name || "Lab Technician"}</p>
            <p className="text-[10px]">Employee ID: {result.technician?.empId || "EMP-LAB-001"}</p>
          </div>
          <div className="text-center">
            <div className="h-10 border-b border-slate-400 w-44 mb-1"></div>
            <p className="font-bold text-slate-800">Verified Pathologist Signature</p>
            <p className="text-[10px]">MD Pathology / Chief Biochemist</p>
          </div>
        </div>
      </div>
    </div>
  );
}
