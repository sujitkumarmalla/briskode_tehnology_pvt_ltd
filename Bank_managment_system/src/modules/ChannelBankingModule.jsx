import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2
} from 'lucide-react';

export const ChannelBankingModule = () => {
  const [atmLimit, setAtmLimit] = useState(50000);
  const [posLimit, setPosLimit] = useState(100000);
  const [isCardBlocked, setIsCardBlocked] = useState(false);
  const [intlTx, setIntlTx] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleToggleCard = () => {
    setIsCardBlocked(!isCardBlocked);
    setMsg(!isCardBlocked ? 'Debit Card temporarily BLOCKED across all channels.' : 'Debit Card UNBLOCKED and active for transactions.');
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Digital Channel &amp; Debit Card Control</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 9: ATM Limits Control, NetBanking Profile Management &amp; Card Freeze/Unfreeze</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Debit Card Controller */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200">Debit Card Lock &amp; Limits Controls</h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isCardBlocked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isCardBlocked ? 'BLOCKED' : 'ACTIVE'}
            </span>
          </div>

          {/* Virtual Card Graphic */}
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950/60 border border-amber-500/40 space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-amber-400 text-sm tracking-wider">ApexBank Platinum Debit</span>
              <CreditCard className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-lg font-mono font-bold tracking-widest text-slate-100 pt-2 select-all">
              4532 •••• •••• 9821
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>VALID THRU: 12/29</span>
              <span>CVV: ***</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <div className="text-xs font-bold text-slate-200">Instant Freeze / Unfreeze</div>
              <div className="text-[11px] text-slate-400">Block all ATM &amp; POS transactions immediately</div>
            </div>
            <button
              onClick={handleToggleCard}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isCardBlocked
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
              }`}
            >
              {isCardBlocked ? 'Unblock Card' : 'Block / Freeze Card'}
            </button>
          </div>
        </div>

        {/* Channel Limits */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3">Channel Daily Transaction Limits</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>Daily ATM Cash Limit</span>
                <span className="text-amber-400 font-mono">${atmLimit.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={atmLimit}
                onChange={(e) => setAtmLimit(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>POS &amp; Online Purchase Limit</span>
                <span className="text-amber-400 font-mono">${posLimit.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={posLimit}
                onChange={(e) => setPosLimit(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200">International Usage</div>
                <div className="text-[11px] text-slate-400">Allow overseas transactions</div>
              </div>
              <button
                onClick={() => setIntlTx(!intlTx)}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  intlTx ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {intlTx ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
