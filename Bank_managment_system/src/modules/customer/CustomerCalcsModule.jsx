import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const CustomerCalcsModule = () => {
  const { t } = useAuth();
  const [fdPrincipal, setFdPrincipal] = useState(100000);
  const [fdRate, setFdRate] = useState(7.5);
  const [fdTenure, setFdTenure] = useState(12);

  const calculateFD = () => {
    const r = fdRate / 100;
    const t = fdTenure / 12;
    const maturity = fdPrincipal * Math.pow((1 + r / 4), 4 * t);
    return Math.round(maturity);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Financial Calculators & Wealth Tools')}</h2>
            <p className="text-xs text-blue-100">{t('Customer Self-Service: FD/RD Payout Projections, Loan EMI & Forex Converter')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-2">{t('FD Yield Inputs')}</h3>
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1">{t('Deposit Principal (₹)')}</label>
            <input
              type="number"
              value={fdPrincipal}
              onChange={(e) => setFdPrincipal(Number(e.target.value))}
              className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs font-mono text-[#1478F2] font-bold focus:outline-none focus:border-[#1478F2]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1">{t('Interest Rate (%)')}</label>
            <input
              type="number"
              step="0.1"
              value={fdRate}
              onChange={(e) => setFdRate(Number(e.target.value))}
              className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
            />
          </div>
        </div>

        <div 
          className="p-6 rounded-2xl flex flex-col justify-between text-white shadow-xl"
          style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
        >
          <div>
            <h3 className="text-sm font-bold text-white border-b border-white/20 pb-2">{t('FD Yield Projection Summary')}</h3>
            <div className="mt-4 space-y-2">
              <div className="text-xs text-blue-100">{t('Total Maturity Value')}</div>
              <div className="text-3xl font-extrabold text-white font-mono">₹{calculateFD().toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
