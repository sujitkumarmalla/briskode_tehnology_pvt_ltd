import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { Calendar, CheckCircle, Clock, UserCheck, Stethoscope, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function DoctorDashboard() {
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statRes, apptRes] = await Promise.all([
          API.get("/reports/doctor"),
          API.get("/appointments")
        ]);
        if (statRes.data.success) setStats(statRes.data.stats);
        if (apptRes.data.success) setAppointments(apptRes.data.appointments);
      } catch (err) {
        toast.error("Failed to load doctor dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value={stats.todayAppointments || 0} icon={Calendar} color="blue" />
        <StatCard title="Completed Consultations" value={stats.completedConsultations || 0} icon={CheckCircle} color="emerald" />
        <StatCard title="Pending Appointments" value={stats.pendingAppointments || 0} icon={Clock} color="amber" />
        <StatCard title="Total Patients Consulted" value={stats.totalPatients || 0} icon={UserCheck} color="purple" />
      </div>

      {/* Today's Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Today's Appointment Queue</h3>
            <p className="text-xs text-slate-500">Patients checked-in and waiting for consultation</p>
          </div>
          <Link
            to="/doctor/appointments"
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {appointments.length === 0 ? (
            <p className="text-slate-400 text-xs text-center py-8">No appointments scheduled for today.</p>
          ) : (
            appointments.slice(0, 5).map((apt) => (
              <div key={apt._id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-mono font-bold text-xs border border-blue-100">
                    {apt.tokenNumber || "A-00"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{apt.patient?.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">
                      ID: {apt.patient?.patientId} | Age: {apt.patient?.age} | Blood: {apt.patient?.bloodGroup}
                    </p>
                    <p className="text-[11px] text-slate-600 italic">"{apt.reason || "General Checkup"}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={apt.status} />
                  <Link
                    to="/doctor/consultations"
                    state={{ appointment: apt }}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    <Stethoscope className="w-3.5 h-3.5" /> Start Consult
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
