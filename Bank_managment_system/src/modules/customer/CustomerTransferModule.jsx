import React, { useState } from 'react';
import { ArrowRightLeft, Send, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CustomerTransferModule = () => {
  const { user, addTransaction, transactions } = useAuth();

  const [formData, setFormData] = useState({
    fromAcc: user?.accountNo || '1000982341',
    toAcc: '1000982343',
    amount: '25000',
    mode: 'IMPS',
    remarks: 'Vendor Payment'
  });

  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTx = {
      _id: 'tx_' + Date.now(),
      fromAcc: formData.fromAcc,
      toAcc: formData.toAcc,
      amount: Number(formData.amount),
      mode: formData.mode,
      status: 'Pending Staff Approval',
      timestamp: new Date().toLocaleString(),
      initiatedBy: user?.name || 'Rajesh Kumar',
      remarks: formData.remarks
    };

    addTransaction(newTx);
    setMsg(`Transfer of ₹${Number(formData.amount).toLocaleString('en-IN')} submitted to Staff Queue! Money will be deducted once Staff approves.`);
  };

  const userTransactions = transactions.filter(t => t.fromAcc === user?.accountNo || t.initiatedBy === user?.name);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <ArrowRightLeft className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Fund Transfer (Maker-Checker Workflow)</h2>
            <p className="text-xs text-slate-300">Transfers are routed to Bank Staff Passing Queue for verification &amp; approval before balance deduction.</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-400" />
          <div>{msg}</div>
        </div>
      )}

      {/* Transfer Form */}
      <div className="glass-card p-8 rounded-2xl space-y-6">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Initiate Fund Transfer</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Source Account (Debit)</label>
              <input
                type="text"
                value={formData.fromAcc}
                onChange={(e) => setFormData({ ...formData, fromAcc: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Beneficiary Account (Credit)</label>
              <input
                type="text"
                value={formData.toAcc}
                onChange={(e) => setFormData({ ...formData, toAcc: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Transfer Amount (₹)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-lightgreen-400 font-mono font-bold text-base"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Payment Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              >
                <option value="IMPS">IMPS (Immediate Real-Time)</option>
                <option value="NEFT">NEFT (Batch Settlement)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">Payment Remarks</label>
              <input
                type="text"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-lightgreen-400" />
              <span>Staff Approval Enforced — Money is deducted ONLY after Staff review</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="green-btn px-8 py-3 rounded-xl text-xs flex items-center gap-2">
              <Send className="w-4 h-4" /> Submit Transfer to Staff Queue
            </button>
          </div>
        </form>
      </div>

      {/* User Transfer Queue Ledger */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">My Fund Transfers &amp; Staff Approval Status</h3>

        <div className="space-y-3 font-mono text-xs">
          {userTransactions.map(t => (
            <div key={t._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">₹{t.amount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">{t.mode}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">To Account: {t.toAcc} • Remarks: {t.remarks}</div>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-sans font-bold ${
                t.status.includes('Completed') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
