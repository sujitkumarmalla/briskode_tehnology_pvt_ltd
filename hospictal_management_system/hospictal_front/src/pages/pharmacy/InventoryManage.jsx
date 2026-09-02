import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { ClipboardList, Plus } from "lucide-react";

export default function InventoryManage() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMeds = async () => {
      const res = await API.get("/pharmacy/medicines");
      if (res.data.success) setMedicines(res.data.medicines);
    };
    fetchMeds();
  }, []);

  const columns = [
    { header: "Medicine Name", accessor: "name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Batch No.", accessor: "batchNumber" },
    { header: "Purchase Price", cell: (row) => `₹${row.purchasePrice}` },
    { header: "Selling Price", cell: (row) => `₹${row.sellingPrice}` },
    { header: "Current Stock", cell: (row) => <span className="font-bold font-mono">{row.stockQuantity} {row.unit}</span> }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={medicines} searchPlaceholder="Search inventory records..." />
    </div>
  );
}
