import React, { useState } from 'react';
import { GraduationCap, Sprout, CheckCircle2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffLoanForwardModule = () => {
  const { studyLoans, agriLoans, staffRecommendLoan, t } = useAuth();
  const [msg, setMsg] = useState(null);

  const pendingStudy = studyLoans.filter(l => l.status === 'Submitted');
  const pendingAgri = agriLoans.filter(l => l.status === 'Submitted');

  const handleRecommend = (type, id) => {
    staffRecommendLoan(type, id, 'Verified by Branch Manager. Recommended for Admin Final Approval.');
    setMsg(`${type} Loan ${id} recommended & forwarded to Admin Executive Portal.`);
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
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Staff Loan Review & Recommendation Desk')}</h2>
            <p className="text-xs text-blue-100">{t('Staff Desk: Inspect Study & Agri loan requests and forward recommendations to Admin.')}</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
        </div>
      )}

      {/* Study Loans Queue */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#1478F2]" /> {t('Pending Study Loan Applications')}
        </h3>

        {pendingStudy.length === 0 ? (
          <div className="text-center py-6 text-[#6B7280] text-xs">{t('No pending Study Loans to review.')}</div>
        ) : (
          <div className="space-y-3">
            {pendingStudy.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#111827]">{l.applicant} — {l.course} ({l.institute})</div>
                  <div className="text-xs font-mono text-[#6B7280] mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Account: {l.accountNo}</div>
                </div>
                <button
                  onClick={() => handleRecommend('Study', l._id)}
                  className="blue-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> {t('Recommend & Forward to Admin')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agri Loans Queue */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3 flex items-center gap-2">
          <Sprout className="w-4 h-4 text-[#22C55E]" /> {t('Pending Agri Loan Applications')}
        </h3>

        {pendingAgri.length === 0 ? (
          <div className="text-center py-6 text-[#6B7280] text-xs">{t('No pending Agri Loans to review.')}</div>
        ) : (
          <div className="space-y-3">
            {pendingAgri.map(l => (
              <div key={l._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#111827]">{l.applicant} — {l.season} Season ({l.surveyNo})</div>
                  <div className="text-xs font-mono text-[#6B7280] mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Acreage: {l.acreage} Acres</div>
                </div>
                <button
                  onClick={() => handleRecommend('Agri', l._id)}
                  className="blue-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> {t('Recommend & Forward to Admin')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
