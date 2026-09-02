import React from "react";
import { Printer, CheckCircle, PackageCheck, FileText } from "lucide-react";

export default function PrintablePharmacyBill({ sale, onClose }) {
  if (!sale) return null;

  const handlePrint = () => {
    window.print();
  };

  const patientName = sale.patient?.name || sale.patientName || "Walk-in Customer";
  const patientId = sale.patient?.patientId || "PAT-WALKIN";
  const doctorName = sale.doctor?.name || sale.prescription?.doctor?.name || "Dr. Swarna Sarthak Mohanty";
  const dateStr = sale.createdAt ? new Date(sale.createdAt).toLocaleString() : new Date().toLocaleString();

  const subtotal = sale.subtotal || sale.total || sale.netAmount || 0;
  const discount = sale.discount || 0;
  const netAmount = sale.netAmount || sale.total || (subtotal - discount);

  return (
    <div className="space-y-6">
      {/* Action Bar (Hidden during printing) */}
      <div className="flex items-center justify-between bg-slate-100 p-4 rounded-2xl border border-slate-200 print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
          <CheckCircle className="w-5 h-5" /> Payment Recorded & Pharmacy Bill Generated!
        </div>
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Close
            </button>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
          >
            <Printer className="w-4 h-4" /> Print Pharmacy Bill
          </button>
        </div>
      </div>

      {/* Printable Invoice Sheet */}
      <div className="print-area font-sans text-slate-900 border-2 border-slate-900 p-8 rounded-2xl bg-white shadow-xl max-w-2xl mx-auto space-y-6">
        {/* Hospital Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/briskode_logo.png"
              alt="Briskode Hospital Logo"
              className="h-14 bg-white p-1 rounded-xl border border-slate-200 object-contain"
            />
            <div>
              <h1 className="text-lg font-black text-slate-900 uppercase">Briskode Public Hospital</h1>
              <p className="text-[10px] text-teal-600 font-extrabold">24/7 PHARMACY & DISPENSING DEPARTMENT</p>
              <p className="text-[9px] text-slate-500">OMFED Square, Patia, Bhubaneswar, Odisha 751024 | Ph: +91 0674 2 740 000</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black uppercase text-slate-400 block">BILL RECEIPT NO</span>
            <span className="text-lg font-black text-blue-700 font-mono">{sale.saleId || `PHARM-${Date.now().toString().slice(-6)}`}</span>
            <span className="inline-block mt-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-300">
              PAID
            </span>
          </div>
        </div>

        {/* Invoice Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Patient Details</span>
            <p className="font-extrabold text-slate-900">{patientName}</p>
            <p className="text-[10px] font-mono text-slate-600">ID: {patientId}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Prescribing Consultant</span>
            <p className="font-bold text-slate-900">{doctorName}</p>
            <p className="text-[10px] text-slate-500">Date: {dateStr}</p>
          </div>
        </div>

        {/* Dispensed Items Table */}
        <div>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-extrabold text-slate-800">
                <th className="p-2 border-r border-slate-300">#</th>
                <th className="p-2 border-r border-slate-300">Medicine Item</th>
                <th className="p-2 border-r border-slate-300 text-center">Batch</th>
                <th className="p-2 border-r border-slate-300 text-center">Qty</th>
                <th className="p-2 border-r border-slate-300 text-right">Price (₹)</th>
                <th className="p-2 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sale.medicines && sale.medicines.length > 0 ? (
                sale.medicines.map((m, idx) => (
                  <tr key={idx} className="text-[11px]">
                    <td className="p-2 border-r border-slate-200 font-bold">{idx + 1}</td>
                    <td className="p-2 border-r border-slate-200 font-bold text-slate-900">
                      {m.medicineName || m.name || "Prescribed Drug"}
                      {m.dosage && <span className="text-[10px] text-slate-500 font-normal block">{m.dosage}</span>}
                    </td>
                    <td className="p-2 border-r border-slate-200 text-center font-mono text-[10px]">{m.batchNumber || "B2026-X"}</td>
                    <td className="p-2 border-r border-slate-200 text-center font-bold">{m.quantity}</td>
                    <td className="p-2 border-r border-slate-200 text-right font-mono">₹{m.unitPrice || m.price || 0}</td>
                    <td className="p-2 text-right font-mono font-bold">₹{m.totalAmount || m.total || ((m.quantity || 1) * (m.price || 0))}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-500 font-medium">No items listed</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Financial Summary */}
        <div className="flex justify-end pt-2">
          <div className="w-64 space-y-1.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount:</span>
                <span className="font-mono">- ₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Payment Mode:</span>
              <span className="font-bold">{sale.paymentMethod || "Cash"}</span>
            </div>
            <div className="border-t border-slate-300 pt-2 flex justify-between font-black text-sm text-slate-900">
              <span>Grand Total Paid:</span>
              <span className="font-mono text-blue-700">₹{netAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer & Stamp */}
        <div className="border-t border-slate-300 pt-4 flex items-end justify-between text-[10px] text-slate-500">
          <div>
            <p className="font-bold text-slate-800">Notice:</p>
            <p>1. Medicines once sold cannot be returned without original bill.</p>
            <p>2. Keep out of reach of children. Store in a cool, dry place.</p>
          </div>
          <div className="text-center space-y-8">
            <div className="border-b border-slate-400 w-36"></div>
            <p className="font-extrabold text-slate-900 uppercase tracking-wider">Dispensing Pharmacist Sign</p>
          </div>
        </div>
      </div>
    </div>
  );
}
