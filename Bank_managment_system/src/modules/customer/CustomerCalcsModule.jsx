import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const CustomerCalcsModule = () => {
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
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Financial Calculators &amp; Wealth Tools</h2>
            <p className="text-xs text-slate-300">Customer Self-Service: FD/RD Payout Projections, Loan EMI &amp; Forex Converter</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-700/80 pb-2">FD Yield Inputs</h3>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Deposit Principal (₹)</label>
            <input
              type="number"
              value={fdPrincipal}
              onChange={(e) => setFdPrincipal(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-white font-bold"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={fdRate}
              onChange={(e) => setFdRate(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="glass-card-green p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white border-b border-white/20 pb-2">FD Yield Projection Summary</h3>
            <div className="mt-4 space-y-2">
              <div className="text-xs text-slate-300">Total Maturity Value</div>
              <div className="text-3xl font-extrabold text-white font-mono">₹{calculateFD().toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
