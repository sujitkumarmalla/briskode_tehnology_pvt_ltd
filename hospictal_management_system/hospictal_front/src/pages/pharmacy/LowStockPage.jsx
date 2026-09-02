import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

export default function LowStockPage() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await API.get("/pharmacy/medicines?lowStock=true");
        if (res.data.success) setMedicines(res.data.medicines);
      } catch (err) {
        toast.error("Failed to load low stock medicines");
      }
    };
    fetchLowStock();
  }, []);

  const columns = [
    { header: "Medicine Name", cell: (row) => <span className="font-bold text-slate-800">{row.name} ({row.genericName})</span> },
    { header: "Category", accessor: "category" },
    {
      header: "Remaining Stock",
      cell: (row) => (
        <span className="font-bold font-mono text-red-700 bg-red-100 px-2.5 py-1 rounded-md text-xs border border-red-200">
          ⚠️ {row.stockQuantity} {row.unit} left
        </span>
      )
    },
    { header: "Minimum Threshold", cell: (row) => <span className="font-mono">{row.minimumStock} {row.unit}</span> }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-900 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <span><strong>Low Stock Warning:</strong> These medicine inventory items have fallen below their minimum required threshold. Order replenishment.</span>
      </div>

      <DataTable columns={columns} data={medicines} searchPlaceholder="Search low stock items..." />
    </div>
  );
}
