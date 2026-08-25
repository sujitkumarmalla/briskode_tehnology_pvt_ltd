import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  ArrowDownLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle,
  ShieldCheck,
  Send
} from 'lucide-react';

export const TransactionModule = () => {
  const [activeTab, setActiveTab] = useState('Transfer'); // Transfer, Deposit, Withdrawal
  const [formData, setFormData] = useState({
    fromAcc: '1000982341',
    toAcc: '1000982343',
    amount: '25000',
    mode: 'IMPS', // NEFT, IMPS, Internal
    remarks: 'Standard Vendor Clearance'
  });

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const mockAccounts = [
    { no: '1000982341', label: '1000982341 (Rajesh Kumar - Savings) - Bal: $254,800' },
    { no: '1000982342', label: '1000982342 (Rajesh Kumar - Fixed Deposit) - Bal: $1,200,000' },
    { no: '1000982343', label: '1000982343 (Anita Desai - Current) - Bal: $45,000' },
    { no: '1000982344', label: '1000982344 (Rajesh Kumar - AgriLoan) - Bal: $350,000' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage(null);

    setTimeout(() => {
      const amountNum = Number(formData.amount);
      if (amountNum > 100000 && activeTab === 'Transfer') {
        setMessage({
          type: 'info',
          text: 'High-value transfer ($' + amountNum.toLocaleString() + ') routed to Bank Staff Passing Queue for maker-checker review.'
        });
      } else {
        setMessage({
          type: 'success',
          text: `${activeTab} of $${amountNum.toLocaleString()} completed successfully!`
        });
      }
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ArrowRightLeft className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Transaction Core Engine</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 2: Deposit, Withdrawal, &amp; NEFT/IMPS Real-Time Transfers</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        {[
          { id: 'Transfer', label: 'Fund Transfer (NEFT/IMPS)', icon: Send },
          { id: 'Deposit', label: 'Cash Deposit', icon: ArrowDownLeft },
          { id: 'Withdrawal', label: 'Cash Withdrawal', icon: ArrowUpRight }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="glass-card p-8 rounded-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTab !== 'Deposit' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Source Account (Debit)</label>
                <select
                  value={formData.fromAcc}
                  onChange={(e) => setFormData({ ...formData, fromAcc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-mono"
                >
                  {mockAccounts.map(a => (
                    <option key={a.no} value={a.no}>{a.label}</option>
                  ))}
                </select>
              </div>
            )}

            {activeTab !== 'Withdrawal' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {activeTab === 'Deposit' ? 'Target Account (Credit)' : 'Beneficiary Account (Credit)'}
                </label>
                <input
                  type="text"
                  value={formData.toAcc}
                  onChange={(e) => setFormData({ ...formData, toAcc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Amount ($)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-mono font-bold text-base"
              />
            </div>

            {activeTab === 'Transfer' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Transfer Payment Channel</label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                >
                  <option value="IMPS">IMPS (Immediate Payment - Real-time)</option>
                  <option value="NEFT">NEFT (National Transfer - Batch Settlement)</option>
                  <option value="Internal">Internal Book Transfer (Apex-to-Apex)</option>
                </select>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">Remarks / Audit Note</label>
              <input
                type="text"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              />
            </div>
          </div>

          {/* Validation Notice */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Balance Verification &amp; Double-Entry Audit Log Enforced</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">Passing Threshold: &gt; $100,000</span>
          </div>

          {/* Notification Alert */}
          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 ${
              message.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
              message.type === 'info' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
              'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              <div>{message.text}</div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isProcessing}
              className="gold-btn px-8 py-3 rounded-xl text-xs font-extrabold text-slate-950 flex items-center gap-2"
            >
              {isProcessing ? 'Processing Transaction...' : `Execute ${activeTab}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
