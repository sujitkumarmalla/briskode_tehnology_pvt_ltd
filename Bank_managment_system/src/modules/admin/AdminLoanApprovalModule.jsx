import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, Sprout, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoanApprovalModule = () => {
  const { studyLoans, agriLoans, adminFinalApproveLoan } = useAuth();
  const [msg, setMsg] = useState(null);

  const pendingStudy = studyLoans.filter(l => l.status === 'Staff Recommended');
  const pendingAgri = agriLoans.filter(l => l.status === 'Staff Recommended');

  const handleDecision = (type, id, decision) => {
    adminFinalApproveLoan(type, id, decision);
    setMsg(`${type} Loan ${id} ${decision} by Executive Admin.`);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Admin Executive Loan Approval Portal</h2>
            <p className="text-xs text-slate-300">Executive Controller: Grant Final Approval or Rejection for Study Loans &amp; Agri Loans recommended by Staff.</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Recommended Study Loans */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-emerald-400" /> Study Loans Recommended by Staff
        </h3>

        {pendingStudy.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">No Study Loans awaiting Admin decision.</div>
        ) : (
          <div className="space-y-3">
            {pendingStudy.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{l.applicant} — {l.course} ({l.institute})</div>
                  <div className="text-xs font-mono text-slate-400 mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Staff Note: {l.staffNote}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision('Study', l._id, 'Approved')}
                    className="green-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Final Approve
                  </button>
                  <button
                    onClick={() => handleDecision('Study', l._id, 'Rejected')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Agri Loans */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-400" /> Agri Loans Recommended by Staff
        </h3>

        {pendingAgri.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">No Agri Loans awaiting Admin decision.</div>
        ) : (
          <div className="space-y-3">
            {pendingAgri.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{l.applicant} — {l.season} Season ({l.surveyNo})</div>
                  <div className="text-xs font-mono text-slate-400 mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Staff Note: {l.staffNote}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision('Agri', l._id, 'Approved')}
                    className="green-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Final Approve
                  </button>
                  <button
                    onClick={() => handleDecision('Agri', l._id, 'Rejected')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
