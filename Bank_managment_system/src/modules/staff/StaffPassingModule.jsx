import React, { useState } from 'react';
import { CheckSquare, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffPassingModule = () => {
  const { transactions, approveTransactionByStaff, t } = useAuth();
  const [msg, setMsg] = useState(null);

  const pendingTx = transactions.filter(tItem => tItem.status === 'Pending Staff Approval');

  const handleApprove = (txId) => {
    approveTransactionByStaff(txId);
    setMsg(`Transfer ${txId} APPROVED! Money has been deducted from source account.`);
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <CheckSquare className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Dual-Control Transfer Passing Desk')}</h2>
            <p className="text-xs text-blue-100">{t('Staff Desk: Review user transfer requests & approve balance deductions.')}</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Pending User Fund Transfers Queue')}</h3>

        {pendingTx.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280] text-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
            {t('All user transfers cleared. Passing queue is empty.')}
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTx.map(tItem => (
              <div key={tItem._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-[#111827]">₹{tItem.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30">{tItem.mode}</span>
                    <span className="text-[#6B7280] font-sans">by <strong className="text-[#111827]">{tItem.initiatedBy}</strong></span>
                  </div>
                  <div className="text-[#6B7280]">From Account: {tItem.fromAcc} -&gt; Beneficiary: {tItem.toAcc}</div>
                  <div className="text-[#6B7280] font-sans">Remarks: {tItem.remarks} • {tItem.timestamp}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(tItem._id)}
                    className="blue-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {t('Approve & Deduct Funds')}
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
