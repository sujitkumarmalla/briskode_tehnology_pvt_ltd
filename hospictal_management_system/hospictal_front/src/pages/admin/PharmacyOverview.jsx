import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatCard from "../../components/common/StatCard";
import { Pill, AlertTriangle, Clock, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

export default function PharmacyOverview() {
  const [medicines, setMedicines] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medRes, statRes] = await Promise.all([
          API.get("/pharmacy/medicines"),
          API.get("/reports/pharmacy")
        ]);
        if (medRes.data.success) setMedicines(medRes.data.medicines);
        if (statRes.data.success) setStats(statRes.data.stats);
      } catch (err) {
        toast.error("Failed to load pharmacy overview");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      header: "Medicine Name",
      accessor: "name",
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.name}</p>
          <p className="text-[10px] text-slate-500">{row.genericName}</p>
        </div>
      )
    },
    {
      header: "Category",
      accessor: "category"
    },
    {
      header: "Batch No.",
      cell: (row) => <span className="font-mono text-slate-700">{row.batchNumber || "-"}</span>
    },
    {
      header: "Expiry Date",
      cell: (row) => {
        const exp = new Date(row.expiryDate);
        const isExpiring = exp <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return (
          <span className={`font-mono text-xs font-semibold ${isExpiring ? "text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200" : "text-slate-700"}`}>
            {exp.toLocaleDateString()}
          </span>
        );
      }
    },
    {
      header: "Stock Quantity",
      cell: (row) => {
        const isLow = row.stockQuantity <= row.minimumStock;
        return (
          <span className={`font-bold font-mono px-2.5 py-0.5 rounded-md ${isLow ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
            {row.stockQuantity} {row.unit}
          </span>
        );
      }
    },
    {
      header: "Selling Price",
      cell: (row) => <span className="font-mono font-bold text-slate-900">₹{row.sellingPrice}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Medicines" value={stats.totalMedicines || 0} icon={Pill} color="blue" />
        <StatCard title="Today's Pharmacy Sales" value={`₹${stats.todaySales || 0}`} icon={ShoppingCart} color="emerald" />
        <StatCard title="Low Stock Alerts" value={stats.lowStock || 0} icon={AlertTriangle} color="amber" />
        <StatCard title="Expiring Soon" value={stats.expiringMedicines || 0} icon={Clock} color="rose" />
      </div>

      <DataTable
        columns={columns}
        data={medicines}
        searchPlaceholder="Search pharmacy medicines by name, category, manufacturer..."
      />
    </div>
  );
}
