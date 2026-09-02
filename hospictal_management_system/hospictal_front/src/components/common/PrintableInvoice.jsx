import React from "react";
import { Printer, ShieldCheck } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function PrintableInvoice({ bill, onClose }) {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border border-slate-200">
      {/* Action Toolbar */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-lg font-bold text-slate-800">Invoice Statement</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
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
              <p className="text-[10px] text-slate-500 font-semibold">OMFED Square, Patia, Bhubaneswar, Odisha 751024 | Ph: +91 0674 2 740 000</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-black text-blue-600 tracking-wider">INVOICE</h2>
            <p className="text-sm font-mono font-bold text-slate-700 mt-1">{bill.invoiceNumber}</p>
            <p className="text-xs text-slate-500">Date: {new Date(bill.createdAt).toLocaleDateString()}</p>
            <div className="mt-2">
              <StatusBadge status={bill.paymentStatus} />
            </div>
          </div>
        </div>

        {/* Patient & Invoice Details */}
        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl mb-6 text-xs border border-slate-100">
          <div>
            <p className="font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Details</p>
            <p className="text-sm font-bold text-slate-900">{bill.patient?.name}</p>
            <p className="text-slate-600">ID: <span className="font-mono font-semibold">{bill.patient?.patientId}</span></p>
            <p className="text-slate-600">Age/Gender: {bill.patient?.age} Yrs / {bill.patient?.gender}</p>
            <p className="text-slate-600">Phone: {bill.patient?.phone}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-500 uppercase tracking-wider mb-1">Billing Summary</p>
            <p className="text-slate-600">Payment Method: <span className="font-semibold text-slate-800">{bill.paymentMethod}</span></p>
            <p className="text-slate-600">Billed By: {bill.generatedBy?.name || "Hospital Reception"}</p>
          </div>
        </div>

        {/* Services Table */}
        <table className="w-full text-left text-xs mb-6 border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3 rounded-l-lg">Service Description</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3 text-right">Unit Price</th>
              <th className="py-2.5 px-3 text-center">Qty</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bill.services?.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-semibold text-slate-800">{item.name}</td>
                <td className="py-3 px-3 text-slate-600">{item.category}</td>
                <td className="py-3 px-3 text-right font-mono">₹{item.price?.toFixed(2)}</td>
                <td className="py-3 px-3 text-center">{item.quantity}</td>
                <td className="py-3 px-3 text-right font-mono font-semibold text-slate-900">₹{item.amount?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Calculations */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">₹{bill.subtotal?.toFixed(2)}</span>
            </div>
            {bill.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount:</span>
                <span className="font-mono">- ₹{bill.discount?.toFixed(2)}</span>
              </div>
            )}
            {bill.tax > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Tax:</span>
                <span className="font-mono">+ ₹{bill.tax?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t-2 border-slate-900">
              <span>Total Amount:</span>
              <span className="font-mono text-blue-600">₹{bill.total?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 pt-1">
              <span>Paid Amount:</span>
              <span className="font-mono font-semibold text-emerald-700">₹{bill.paidAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="border-t border-slate-200 pt-6 flex justify-between items-end text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">Terms & Conditions:</p>
            <p>1. Computer-generated invoice. No signature required.</p>
            <p>2. Prescriptions and lab reports must be verified by staff.</p>
          </div>
          <div className="text-center">
            <div className="h-10 border-b border-slate-400 w-36 mb-1"></div>
            <p className="font-semibold text-slate-700">Authorized Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
