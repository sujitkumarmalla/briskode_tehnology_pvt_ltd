import React, { useState } from 'react';
import { GraduationCap, Sprout, CheckCircle2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffLoanForwardModule = () => {
  const { studyLoans, agriLoans, staffRecommendLoan } = useAuth();
  const [msg, setMsg] = useState(null);

  const pendingStudy = studyLoans.filter(l => l.status === 'Submitted');
  const pendingAgri = agriLoans.filter(l => l.status === 'Submitted');

  const handleRecommend = (type, id) => {
    staffRecommendLoan(type, id, 'Verified by Branch Manager. Recommended for Admin Final Approval.');
    setMsg(`${type} Loan ${id} recommended & forwarded to Admin Executive Portal.`);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Staff Loan Review &amp; Recommendation Desk</h2>
            <p className="text-xs text-slate-300">Staff Desk: Inspect Study &amp; Agri loan requests and forward recommendations to Admin.</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Study Loans Queue */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-emerald-400" /> Pending Study Loan Applications
        </h3>

        {pendingStudy.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">No pending Study Loans to review.</div>
        ) : (
          <div className="space-y-3">
            {pendingStudy.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{l.applicant} — {l.course} ({l.institute})</div>
                  <div className="text-xs font-mono text-slate-400 mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Account: {l.accountNo}</div>
                </div>
                <button
                  onClick={() => handleRecommend('Study', l._id)}
                  className="green-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Recommend &amp; Forward to Admin
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agri Loans Queue */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sprout className="w-4 h-4 text-emerald-400" /> Pending Agri Loan Applications
        </h3>

        {pendingAgri.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">No pending Agri Loans to review.</div>
        ) : (
          <div className="space-y-3">
            {pendingAgri.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{l.applicant} — {l.season} Season ({l.surveyNo})</div>
                  <div className="text-xs font-mono text-slate-400 mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Acreage: {l.acreage} Acres</div>
                </div>
                <button
                  onClick={() => handleRecommend('Agri', l._id)}
                  className="green-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Recommend &amp; Forward to Admin
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
