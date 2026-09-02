import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import StatCard from "../../components/common/StatCard";
import {
  Users,
  Calendar,
  Stethoscope,
  BedDouble,
  FlaskConical,
  Pill,
  IndianRupee,
  UserCheck,
  TrendingUp
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/reports/admin");
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Fetch admin stats error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading Dashboard Analytics...</div>;
  }

  const stats = data?.stats || {};
  const appointmentChart = data?.charts?.appointmentChart || [];
  const revenueChart = data?.charts?.revenueChart || [];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Patients"
          value={stats.totalPatients || 0}
          icon={UserCheck}
          color="blue"
          subtext="Active patient entity records"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments || 0}
          icon={Calendar}
          color="indigo"
          subtext="Scheduled & checked-in today"
        />
        <StatCard
          title="Total Active Doctors"
          value={stats.totalDoctors || 0}
          icon={Stethoscope}
          color="emerald"
          subtext="Assigned across departments"
        />
        <StatCard
          title="Hospital Staff"
          value={stats.totalStaff || 0}
          icon={Users}
          color="purple"
          subtext="Receptionists, Pharmacy, Lab"
        />
        <StatCard
          title="Available Beds"
          value={stats.availableBeds || 0}
          icon={BedDouble}
          color="emerald"
          subtext={`Occupied: ${stats.occupiedBeds || 0} beds`}
        />
        <StatCard
          title="Pending Lab Tests"
          value={stats.pendingLabTests || 0}
          icon={FlaskConical}
          color="amber"
          subtext="Awaiting sample collection / processing"
        />
        <StatCard
          title="Pending Pharmacy Orders"
          value={stats.pendingPharmacyOrders || 0}
          icon={Pill}
          color="rose"
          subtext="Un-dispensed doctor prescriptions"
        />
        <StatCard
          title="Today's Revenue"
          value={`₹${stats.todayRevenue || 0}`}
          icon={IndianRupee}
          color="blue"
          trend="+12%"
          subtext="Collected payments today"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Trend Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Weekly Appointment Volume</h3>
              <p className="text-xs text-slate-500">Patient appointments over past 7 days</p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appointmentChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: "12px", border: "none" }}
                />
                <Area type="monotone" dataKey="count" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.2} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Growth Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Monthly Revenue Projection</h3>
              <p className="text-xs text-slate-500 font-medium">Consultation, Pharmacy & Lab billing</p>
            </div>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", color: "#FFF", borderRadius: "12px", border: "none" }}
                  formatter={(val) => [`₹${Math.round(val)}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
