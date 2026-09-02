import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { Calendar, UserPlus, Clock, CheckCircle, Receipt, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function ReceptionistDashboard() {
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statRes, apptRes] = await Promise.all([
          API.get("/reports/receptionist"),
          API.get("/appointments")
        ]);
        if (statRes.data.success) setStats(statRes.data.stats);
        if (apptRes.data.success) setAppointments(apptRes.data.appointments);
      } catch (err) {
        toast.error("Failed to load receptionist dashboard");
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
        <StatCard title="Today's Appointments" value={stats.todayAppointments || 0} icon={Calendar} color="blue" />
        <StatCard title="New Registrations" value={stats.newPatients || 0} icon={UserPlus} color="emerald" />
        <StatCard title="Checked-In Patients" value={stats.checkedInPatients || 0} icon={Clock} color="amber" />
        <StatCard title="Completed Consults" value={stats.completedAppointments || 0} icon={CheckCircle} color="purple" />
        <StatCard title="Pending Invoices" value={stats.pendingBills || 0} icon={Receipt} color="rose" />
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/receptionist/register-patient"
          className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-base">Register New Patient</h3>
            <p className="text-xs text-blue-100 mt-1">Generates unique PAT-2026-XXXXX ID</p>
          </div>
          <UserPlus className="w-8 h-8 opacity-80" />
        </Link>
        <Link
          to="/receptionist/appointments"
          className="p-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-base">Book Appointment</h3>
            <p className="text-xs text-teal-100 mt-1">Assign doctor & time slot</p>
          </div>
          <Calendar className="w-8 h-8 opacity-80" />
        </Link>
        <Link
          to="/receptionist/check-in"
          className="p-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-base">Patient Check-In</h3>
            <p className="text-xs text-amber-100 mt-1">Assign queue token number</p>
          </div>
          <Clock className="w-8 h-8 opacity-80" />
        </Link>
      </div>

      {/* Appointment Queue List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-slate-800">Today's Appointment Register</h3>
          <Link to="/receptionist/check-in" className="text-xs font-bold text-blue-600 flex items-center gap-1">
            Check-In Manager <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {appointments.slice(0, 5).map((apt) => (
            <div key={apt._id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">{apt.patient?.name} ({apt.patient?.patientId})</p>
                <p className="text-[10px] text-slate-500">Doctor: {apt.doctor?.name} ({apt.department?.name}) | Time: {apt.time}</p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
