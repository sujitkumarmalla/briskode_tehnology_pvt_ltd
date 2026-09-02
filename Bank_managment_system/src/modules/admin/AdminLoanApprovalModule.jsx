import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, Sprout, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoanApprovalModule = () => {
  const { studyLoans, agriLoans, adminFinalApproveLoan, t } = useAuth();
  const [msg, setMsg] = useState(null);

  const pendingStudy = studyLoans.filter(l => l.status === 'Staff Recommended');
  const pendingAgri = agriLoans.filter(l => l.status === 'Staff Recommended');

  const handleDecision = (type, id, decision) => {
    adminFinalApproveLoan(type, id, decision);
    setMsg(`${type} Loan ${id} ${decision} by Executive Admin.`);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Admin Executive Loan Approval Portal')}</h2>
            <p className="text-xs text-blue-100">{t('Executive Controller: Grant Final Approval or Rejection for Study Loans & Agri Loans recommended by Staff.')}</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
        </div>
      )}

      {/* Recommended Study Loans */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#1478F2]" /> {t('Study Loans Recommended by Staff')}
        </h3>

        {pendingStudy.length === 0 ? (
          <div className="text-center py-6 text-[#6B7280] text-xs">{t('No Study Loans awaiting Admin decision.')}</div>
        ) : (
          <div className="space-y-3">
            {pendingStudy.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#111827]">{l.applicant} — {l.course} ({l.institute})</div>
                  <div className="text-xs font-mono text-[#6B7280] mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Staff Note: {l.staffNote}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision('Study', l._id, 'Approved')}
                    className="blue-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {t('Final Approve')}
                  </button>
                  <button
                    onClick={() => handleDecision('Study', l._id, 'Rejected')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> {t('Reject')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Agri Loans */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3 flex items-center gap-2">
          <Sprout className="w-4 h-4 text-[#22C55E]" /> {t('Agri Loans Recommended by Staff')}
        </h3>

        {pendingAgri.length === 0 ? (
          <div className="text-center py-6 text-[#6B7280] text-xs">{t('No Agri Loans awaiting Admin decision.')}</div>
        ) : (
          <div className="space-y-3">
            {pendingAgri.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#111827]">{l.applicant} — {l.season} Season ({l.surveyNo})</div>
                  <div className="text-xs font-mono text-[#6B7280] mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Staff Note: {l.staffNote}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision('Agri', l._id, 'Approved')}
                    className="blue-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {t('Final Approve')}
                  </button>
                  <button
                    onClick={() => handleDecision('Agri', l._id, 'Rejected')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> {t('Reject')}
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
