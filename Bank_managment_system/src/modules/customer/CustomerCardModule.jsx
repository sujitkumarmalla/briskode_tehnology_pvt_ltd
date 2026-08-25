import React, { useState } from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export const CustomerCardModule = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [atmLimit, setAtmLimit] = useState(50000);
  const [msg, setMsg] = useState(null);

  const toggleFreeze = () => {
    setIsBlocked(!isBlocked);
    setMsg(!isBlocked ? 'Debit Card temporarily FROZEN.' : 'Debit Card UNBLOCKED.');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Digital Card &amp; Security Controls</h2>
            <p className="text-xs text-slate-300">Customer Self-Service: Instant Freeze/Unfreeze &amp; Daily ATM Limits</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-slate-700/80 pb-3">Virtual Platinum Card</h3>
          <div className="p-6 rounded-2xl bg-slate-950 border border-white/20 space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-white text-sm">ApexBank Platinum</span>
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-lg font-mono font-bold tracking-widest text-white pt-2">4532 •••• •••• 9821</div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>VALID THRU: 12/29</span>
              <span>CVV: ***</span>
            </div>
          </div>
          <button
            onClick={toggleFreeze}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
              isBlocked ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
            }`}
          >
            {isBlocked ? 'Unblock Debit Card' : 'Freeze / Lock Debit Card'}
          </button>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-slate-700/80 pb-3">Daily ATM Withdrawal Limit</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Daily Cash Limit</span>
              <span className="text-white font-mono">₹{atmLimit.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={atmLimit}
              onChange={(e) => setAtmLimit(Number(e.target.value))}
              className="w-full accent-lightgreen-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
