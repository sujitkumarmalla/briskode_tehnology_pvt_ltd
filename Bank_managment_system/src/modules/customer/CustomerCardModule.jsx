import React, { useState } from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export const CustomerCardModule = () => {
  const { t } = useAuth();
  const [isBlocked, setIsBlocked] = useState(false);
  const [atmLimit, setAtmLimit] = useState(50000);
  const [msg, setMsg] = useState(null);

  const toggleFreeze = () => {
    setIsBlocked(!isBlocked);
    setMsg(!isBlocked ? 'Debit Card temporarily FROZEN.' : 'Debit Card UNBLOCKED.');
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
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Digital Card & Security Controls')}</h2>
            <p className="text-xs text-blue-100">{t('Customer Self-Service: Instant Freeze/Unfreeze & Daily ATM Limits')}</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-600" /> {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Virtual Platinum Card')}</h3>
          <div 
            className="p-6 rounded-2xl text-white space-y-4 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
          >
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-white text-sm">ApexBank Platinum</span>
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-lg font-mono font-bold tracking-widest text-white pt-2">4532 •••• •••• 9821</div>
            <div className="flex justify-between text-xs text-blue-100 font-mono">
              <span>VALID THRU: 12/29</span>
              <span>CVV: ***</span>
            </div>
          </div>
          <button
            onClick={toggleFreeze}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
              isBlocked ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white'
            }`}
          >
            {isBlocked ? t('Unblock Debit Card') : t('Freeze / Lock Debit Card')}
          </button>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Daily ATM Withdrawal Limit')}</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-[#111827]">
              <span>{t('Daily Cash Limit')}</span>
              <span className="text-[#1478F2] font-mono">₹{atmLimit.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={atmLimit}
              onChange={(e) => setAtmLimit(Number(e.target.value))}
              className="w-full accent-[#1478F2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
