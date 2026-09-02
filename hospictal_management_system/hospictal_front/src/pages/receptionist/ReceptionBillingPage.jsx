import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import PrintableInvoice from "../../components/common/PrintableInvoice";
import { Eye, Receipt } from "lucide-react";
import { toast } from "react-toastify";

export default function ReceptionBillingPage() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await API.get("/billing");
        if (res.data.success) setBills(res.data.bills);
      } catch (err) {
        toast.error("Failed to load bills");
      }
    };
    fetchBills();
  }, []);

  const columns = [
    { header: "Invoice No.", accessor: "invoiceNumber", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.invoiceNumber}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Total Amount", cell: (row) => <span className="font-mono font-bold">₹{row.total}</span> },
    { header: "Status", cell: (row) => <StatusBadge status={row.paymentStatus} /> },
    {
      header: "Action",
      cell: (row) => (
        <button onClick={() => setSelectedBill(row)} className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" /> View / Print Receipt
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={bills} searchPlaceholder="Search billing invoices..." />

      {selectedBill && (
        <Modal isOpen={!!selectedBill} onClose={() => setSelectedBill(null)} title="Invoice Receipt" maxWidth="max-w-4xl">
          <PrintableInvoice bill={selectedBill} onClose={() => setSelectedBill(null)} />
        </Modal>
      )}
    </div>
  );
}
