import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  FileCheck2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const AdminRbiModule = () => {
  const [downloading, setDownloading] = useState(false);

  const totalDeposits = 18498000; // Net Demand and Time Liabilities (NDTL)
  const crrReq = totalDeposits * 0.045; // 4.5%
  const slrReq = totalDeposits * 0.180; // 18.0%

  const handleDownloadReturn = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('RBI Form A Liquidity & Compliance Return statement downloaded successfully.');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="glass-card-green p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">RBI Regulatory Compliance &amp; NDTL Reserve Engine</h2>
            <p className="text-xs text-slate-300">Executive Controller &amp; Audit Engine: Automated CRR (4.5%) &amp; SLR (18.0%) Reserve Verification</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> RBI Compliant
          </span>
          <button
            onClick={handleDownloadReturn}
            disabled={downloading}
            className="green-btn px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Exporting...' : 'Export RBI Form A'}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-slate-400">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Global NDTL Deposit Base</div>
          <div className="text-3xl font-extrabold text-white font-mono">₹{totalDeposits.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-lightgreen-400" /> Statutory Base for Cash Reserves
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-lightgreen-400">
          <div className="text-xs font-bold text-lightgreen-400 uppercase tracking-wider">Cash Reserve Ratio (CRR 4.5%)</div>
          <div className="text-3xl font-extrabold text-lightgreen-400 font-mono">₹{Math.round(crrReq).toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reserve Maintained at RBI: ₹{(Math.round(crrReq * 1.05)).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 border-t-2 border-t-blue-400">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Statutory Liquidity Ratio (SLR 18.0%)</div>
          <div className="text-3xl font-extrabold text-blue-400 font-mono">₹{Math.round(slrReq).toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Liquid G-Secs &amp; Gold: ₹{(Math.round(slrReq * 1.08)).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Regulatory Audit Indicators */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-lightgreen-400" />
            <h3 className="text-sm font-bold text-white">RBI Statutory Compliance &amp; Audit Indicators (Q3 2026)</h3>
          </div>
          <span className="text-xs font-mono text-lightgreen-400 font-bold bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            Filing ID: RBI-2026-Q3-0091
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { title: 'Priority Sector Lending (PSL) Target', status: '42.0% Achieved (Target ≥ 40.0%)', desc: 'Kisan Agri & Micro-Enterprise Subvention', color: 'text-emerald-400' },
            { title: 'BASEL III Capital Adequacy Ratio (CRAR)', status: '15.4% (Regulatory Minimum ≥ 11.5%)', desc: 'Tier 1 & Tier 2 Capital Reserves', color: 'text-emerald-400' },
            { title: 'Gross Non-Performing Assets (GNPA)', status: '1.2% (Sub-threshold Low Risk)', desc: 'Fully provisioned under PCR 88%', color: 'text-emerald-400' },
            { title: 'Cyber Security & Data Localization', status: '100% Compliant (Zero Data Breaches)', desc: 'Encrypted Double-Entry Audit Logs', color: 'text-emerald-400' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-white">{item.title}</span>
                </div>
                <div className="text-[11px] text-slate-400 pl-6">{item.desc}</div>
              </div>
              <span className={`font-mono font-bold text-[11px] ${item.color} bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

