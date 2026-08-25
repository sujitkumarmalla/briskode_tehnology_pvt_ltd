import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const UtilitiesModule = () => {
  const [calcType, setCalcType] = useState('FD'); // FD | EMI | Currency

  // FD Calc state
  const [fdPrincipal, setFdPrincipal] = useState(100000);
  const [fdRate, setFdRate] = useState(7.5);
  const [fdTenureMonths, setFdTenureMonths] = useState(12);

  // EMI Calc state
  const [emiPrincipal, setEmiPrincipal] = useState(500000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiTenureMonths, setEmiTenureMonths] = useState(36);

  // Currency Converter state
  const [currencyAmount, setCurrencyAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');

  // Calculations
  const calculateFD = () => {
    const r = fdRate / 100;
    const t = fdTenureMonths / 12;
    const maturity = fdPrincipal * Math.pow((1 + r / 4), 4 * t);
    const interest = maturity - fdPrincipal;
    return { maturity: Math.round(maturity), interest: Math.round(interest) };
  };

  const calculateEMI = () => {
    const P = emiPrincipal;
    const r = (emiRate / 12) / 100;
    const n = emiTenureMonths;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) };
  };

  const rates = { USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.78 };
  const convertCurrency = () => {
    const inUsd = currencyAmount / rates[fromCurrency];
    const converted = inUsd * rates[toCurrency];
    return converted.toFixed(2);
  };

  const fdRes = calculateFD();
  const emiRes = calculateEMI();

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Financial Utilities &amp; Interest Engine</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 5: FD/RD Payout Projections, EMI Loan Calculators &amp; System Batch Tools</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setCalcType('FD')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            calcType === 'FD' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          FD / RD Interest Calculator
        </button>
        <button
          onClick={() => setCalcType('EMI')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            calcType === 'EMI' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          Loan EMI Calculator
        </button>
        <button
          onClick={() => setCalcType('Currency')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            calcType === 'Currency' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          Forex Currency Converter
        </button>
      </div>

      {/* Calculator Body */}
      {calcType === 'FD' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">FD Payout Parameters</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Deposit Principal Amount ($)</label>
              <input
                type="number"
                value={fdPrincipal}
                onChange={(e) => setFdPrincipal(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-amber-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={fdRate}
                onChange={(e) => setFdRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tenure (Months)</label>
              <input
                type="number"
                value={fdTenureMonths}
                onChange={(e) => setFdTenureMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
              />
            </div>
          </div>

          <div className="glass-card-gold p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 border-b border-amber-500/30 pb-2">FD Yield Projection Summary</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="text-xs text-slate-400">Total Maturity Value</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">${fdRes.maturity.toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-[11px] text-slate-400">Principal Amount</div>
                    <div className="text-sm font-bold text-slate-200">${fdPrincipal.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Total Interest Earned</div>
                    <div className="text-sm font-bold text-emerald-400">+${fdRes.interest.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-amber-400 font-mono mt-4">Quarterly Compounding Formula Applied</span>
          </div>
        </div>
      )}

      {calcType === 'EMI' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Loan EMI Inputs</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Loan Amount ($)</label>
              <input
                type="number"
                value={emiPrincipal}
                onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-amber-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Interest Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                value={emiRate}
                onChange={(e) => setEmiRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Loan Tenure (Months)</label>
              <input
                type="number"
                value={emiTenureMonths}
                onChange={(e) => setEmiTenureMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
              />
            </div>
          </div>

          <div className="glass-card-gold p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 border-b border-amber-500/30 pb-2">Monthly EMI Breakdown</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="text-xs text-slate-400">Monthly EMI Payment</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">${emiRes.emi.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ mo</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-[11px] text-slate-400">Total Interest Payable</div>
                    <div className="text-sm font-bold text-red-400">${emiRes.totalInterest.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Total Amount Payable</div>
                    <div className="text-sm font-bold text-slate-200">${emiRes.totalPayment.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {calcType === 'Currency' && (
        <div className="glass-card p-6 rounded-2xl max-w-2xl mx-auto space-y-6">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Real-Time Forex Currency Conversion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Amount</label>
              <input
                type="number"
                value={currencyAmount}
                onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-amber-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 font-bold"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 font-bold"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-amber-500/30 text-center">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Converted Equivalent</div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">
              {toCurrency === 'INR' ? '₹' : toCurrency === 'EUR' ? '€' : toCurrency === 'GBP' ? '£' : '$'} {convertCurrency()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
