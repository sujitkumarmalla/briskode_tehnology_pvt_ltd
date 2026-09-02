import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { FileSpreadsheet, Download } from "lucide-react";
import { toast } from "react-toastify";

export default function PharmacyReportsPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await API.get("/pharmacy/sales");
      if (res.data.success) setSales(res.data.sales);
    };
    fetchSales();
  }, []);

  const columns = [
    { header: "Sale Invoice", accessor: "saleId", cell: (row) => <span className="font-mono font-bold">{row.saleId}</span> },
    { header: "Customer Name", accessor: "patientName" },
    { header: "Total Amount", cell: (row) => <span className="font-mono font-bold">₹{row.total}</span> },
    { header: "Date", cell: (row) => new Date(row.createdAt).toLocaleDateString() }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={sales} searchPlaceholder="Search pharmacy sales records..." />
    </div>
  );
}
