import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { FlaskConical, TestTube, Microscope, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function LabDashboard() {
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statRes, reqRes] = await Promise.all([
          API.get("/reports/lab"),
          API.get("/lab/requests?status=Requested")
        ]);
        if (statRes.data.success) setStats(statRes.data.stats);
        if (reqRes.data.success) setRequests(reqRes.data.requests);
      } catch (err) {
        toast.error("Failed to load lab dashboard");
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
        <StatCard title="Pending Orders" value={stats.pendingTests || 0} icon={FlaskConical} color="amber" />
        <StatCard title="Today's Total Tests" value={stats.todayTests || 0} icon={TestTube} color="blue" />
        <StatCard title="Samples Pending" value={stats.samplesPending || 0} icon={TestTube} color="cyan" />
        <StatCard title="Tests Processing" value={stats.testsProcessing || 0} icon={Microscope} color="purple" />
        <StatCard title="Completed Reports" value={stats.completedReports || 0} icon={CheckCircle} color="emerald" />
      </div>

      {/* Pending Lab Requests */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Pending Doctor Test Requests</h3>
            <p className="text-xs text-slate-500">Ordered by attending physicians awaiting sample collection</p>
          </div>
          <Link to="/laboratory/test-requests" className="text-xs font-bold text-indigo-600 flex items-center gap-1">
            View All Requests <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {requests.length === 0 ? (
            <p className="text-slate-400 text-xs text-center py-6">No pending lab test requests.</p>
          ) : (
            requests.slice(0, 5).map((req) => (
              <div key={req._id} className="py-3 flex items-center justify-between text-xs hover:bg-slate-50 p-2 rounded-xl transition-colors">
                <div>
                  <p className="font-bold text-slate-800">{req.testName} <span className="font-mono text-indigo-600">({req.requestId})</span></p>
                  <p className="text-[10px] text-slate-500">Patient: {req.patient?.name} ({req.patient?.patientId}) | Doctor: {req.doctor?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={req.priority} />
                  <Link to="/laboratory/samples" className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">
                    Collect Sample
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
