import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { Clock } from "lucide-react";
import { toast } from "react-toastify";

export default function ExpiryPage() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchExpiring = async () => {
      try {
        const res = await API.get("/pharmacy/medicines?expiringSoon=true");
        if (res.data.success) setMedicines(res.data.medicines);
      } catch (err) {
        toast.error("Failed to load expiring medicines");
      }
    };
    fetchExpiring();
  }, []);

  const columns = [
    { header: "Medicine Name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Batch Number", accessor: "batchNumber", cell: (row) => <span className="font-mono">{row.batchNumber}</span> },
    {
      header: "Expiry Date",
      cell: (row) => (
        <span className="font-bold font-mono text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md text-xs border border-rose-200">
          ⏰ {new Date(row.expiryDate).toLocaleDateString()}
        </span>
      )
    },
    { header: "Stock Quantity", cell: (row) => `${row.stockQuantity} ${row.unit}` }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-900 text-xs">
        <Clock className="w-5 h-5 text-rose-600 flex-shrink-0" />
        <span><strong>Expiring Soon Alert:</strong> These medicine inventory items are expiring within 30 days. Remove or return to vendor.</span>
      </div>

      <DataTable columns={columns} data={medicines} searchPlaceholder="Search expiring medicines..." />
    </div>
  );
}
