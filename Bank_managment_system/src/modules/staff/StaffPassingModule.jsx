import React, { useState } from 'react';
import { CheckSquare, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffPassingModule = () => {
  const { transactions, approveTransactionByStaff } = useAuth();
  const [msg, setMsg] = useState(null);

  const pendingTx = transactions.filter(t => t.status === 'Pending Staff Approval');

  const handleApprove = (txId) => {
    approveTransactionByStaff(txId);
    setMsg(`Transfer ${txId} APPROVED! Money has been deducted from source account.`);
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <CheckSquare className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Dual-Control Transfer Passing Desk</h2>
            <p className="text-xs text-slate-300">Staff Desk: Review user transfer requests &amp; approve balance deductions.</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Pending User Fund Transfers Queue</h3>

        {pendingTx.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
            All user transfers cleared. Passing queue is empty.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTx.map(t => (
              <div key={t._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-white">₹{t.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">{t.mode}</span>
                    <span className="text-slate-400 font-sans">by <strong className="text-white">{t.initiatedBy}</strong></span>
                  </div>
                  <div className="text-slate-400">From Account: {t.fromAcc} -&gt; Beneficiary: {t.toAcc}</div>
                  <div className="text-slate-500 font-sans">Remarks: {t.remarks} • {t.timestamp}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(t._id)}
                    className="green-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve &amp; Deduct Funds
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
