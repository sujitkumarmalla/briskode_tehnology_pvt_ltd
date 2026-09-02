import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { ShoppingCart, Pill, FileText, AlertTriangle, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function PharmacyDashboard() {
  const [stats, setStats] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statRes, rxRes] = await Promise.all([
          API.get("/reports/pharmacy"),
          API.get("/prescriptions?status=Pending")
        ]);
        if (statRes.data.success) setStats(statRes.data.stats);
        if (rxRes.data.success) setPrescriptions(rxRes.data.prescriptions);
      } catch (err) {
        toast.error("Failed to load pharmacy dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Today's Pharmacy Sales" value={`₹${stats.todaySales || 0}`} icon={ShoppingCart} color="emerald" />
        <StatCard title="Pending Prescriptions" value={stats.pendingPrescriptions || 0} icon={FileText} color="amber" />
        <StatCard title="Total Medicines" value={stats.totalMedicines || 0} icon={Pill} color="blue" />
        <StatCard title="Low Stock Items" value={stats.lowStock || 0} icon={AlertTriangle} color="rose" />
        <StatCard title="Expiring Medicines" value={stats.expiringMedicines || 0} icon={Clock} color="purple" />
      </div>

      {/* Pending Prescriptions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Pending Doctor Prescriptions</h3>
            <p className="text-xs text-slate-500">Issued by doctors awaiting pharmacy dispensing</p>
          </div>
          <Link to="/pharmacy/prescriptions" className="text-xs font-bold text-blue-600 flex items-center gap-1">
            View All Prescriptions <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {prescriptions.length === 0 ? (
            <p className="text-slate-400 text-xs text-center py-6">No pending prescriptions found.</p>
          ) : (
            prescriptions.slice(0, 5).map((rx) => (
              <div key={rx._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600 text-xs">{rx.prescriptionId}</span>
                    <span className="font-bold text-slate-800 text-xs">{rx.patient?.name} ({rx.patient?.patientId})</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Doctor: {rx.doctor?.name} | Medicines: {rx.medicines?.map(m => m.medicineName).join(", ")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={rx.status} />
                  <Link
                    to="/pharmacy/prescriptions"
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                  >
                    Dispense
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
