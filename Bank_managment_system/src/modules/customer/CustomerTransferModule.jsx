import React, { useState } from 'react';
import { ArrowRightLeft, Send, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CustomerTransferModule = () => {
  const { user, addTransaction, transactions, t } = useAuth();

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
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      {/* Banner */}
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <ArrowRightLeft className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Fund Transfer (Maker-Checker Workflow)')}</h2>
            <p className="text-xs text-blue-100">{t('Transfers are routed to Bank Staff Passing Queue for verification & approval before balance deduction.')}</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600" />
          <div>{msg}</div>
        </div>
      )}

      {/* Transfer Form */}
      <div className="glass-card p-8 rounded-2xl space-y-6">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Initiate Fund Transfer')}</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1">{t('Source Account (Debit)')}</label>
              <input
                type="text"
                value={formData.fromAcc}
                onChange={(e) => setFormData({ ...formData, fromAcc: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1">{t('Beneficiary Account (Credit)')}</label>
              <input
                type="text"
                value={formData.toAcc}
                onChange={(e) => setFormData({ ...formData, toAcc: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1">{t('Transfer Amount (₹)')}</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#1478F2] font-mono font-bold text-base focus:outline-none focus:border-[#1478F2]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1">{t('Payment Mode')}</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
              >
                <option value="IMPS">IMPS (Immediate Real-Time)</option>
                <option value="NEFT">NEFT (Batch Settlement)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#111827] mb-1">{t('Payment Remarks')}</label>
              <input
                type="text"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <ShieldCheck className="w-4 h-4 text-[#1478F2]" />
              <span>{t('Staff Approval Enforced — Money is deducted ONLY after Staff review')}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="blue-btn px-8 py-3 rounded-xl text-xs flex items-center gap-2">
              <Send className="w-4 h-4" /> {t('Submit Transfer to Staff Queue')}
            </button>
          </div>
        </form>
      </div>

      {/* User Transfer Queue Ledger */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('My Fund Transfers & Staff Approval Status')}</h3>

        <div className="space-y-3 font-mono text-xs">
          {userTransactions.map(tItem => (
            <div key={tItem._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827]">₹{tItem.amount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30">{tItem.mode}</span>
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1">To Account: {tItem.toAcc} • Remarks: {tItem.remarks}</div>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-sans font-bold ${
                tItem.status.includes('Completed') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {tItem.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
