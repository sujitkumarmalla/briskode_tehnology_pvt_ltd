import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import PrintableInvoice from "../../components/common/PrintableInvoice";
import { Receipt, Eye, CreditCard } from "lucide-react";
import { toast } from "react-toastify";

export default function BillingManagement() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);

  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const fetchBills = async () => {
    try {
      const res = await API.get("/billing");
      if (res.data.success) setBills(res.data.bills);
    } catch (err) {
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleRecordPaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBill || !paymentAmount) return;
    try {
      await API.put(`/billing/${selectedBill._id}/payment`, {
        amountPaid: Number(paymentAmount),
        paymentMethod
      });
      toast.success("Payment recorded successfully");
      setIsRecordPaymentOpen(false);
      fetchBills();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record payment");
    }
  };

  const columns = [
    {
      header: "Invoice No.",
      accessor: "invoiceNumber",
      cell: (row) => <span className="font-mono font-bold text-blue-600">{row.invoiceNumber}</span>
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
      header: "Date",
      cell: (row) => <span className="text-slate-600 text-xs">{new Date(row.createdAt).toLocaleDateString()}</span>
    },
    {
      header: "Total Amount",
      cell: (row) => <span className="font-mono font-bold text-slate-900">₹{row.total}</span>
    },
    {
      header: "Paid Amount",
      cell: (row) => <span className="font-mono font-semibold text-emerald-700">₹{row.paidAmount || 0}</span>
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod"
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.paymentStatus} />
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedBill(row)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View / Print
          </button>
          {row.paymentStatus !== "Paid" && (
            <button
              onClick={() => {
                setSelectedBill(row);
                setPaymentAmount(String(row.total - (row.paidAmount || 0)));
                setIsRecordPaymentOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" /> Record Payment
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={bills}
        searchPlaceholder="Search invoices by invoice number, Patient ID, Patient name..."
      />

      {/* Invoice View & Print Modal */}
      {selectedBill && !isRecordPaymentOpen && (
        <Modal isOpen={!!selectedBill} onClose={() => setSelectedBill(null)} title="Invoice Details" maxWidth="max-w-4xl">
          <PrintableInvoice bill={selectedBill} onClose={() => setSelectedBill(null)} />
        </Modal>
      )}

      {/* Record Payment Modal */}
      <Modal isOpen={isRecordPaymentOpen} onClose={() => setIsRecordPaymentOpen(false)} title={`Record Payment for ${selectedBill?.invoiceNumber}`}>
        <form onSubmit={handleRecordPaymentSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Amount Paid (₹) *</label>
            <input
              type="number"
              required
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono font-bold text-sm"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Payment Method *</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI / GPay / PhonePe</option>
              <option value="Card">Debit / Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsRecordPaymentOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl">
              Save Payment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
