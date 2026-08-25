import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

export const RbiReportModule = () => {
  const totalDeposits = 1849800; // Net Demand and Time Liabilities
  const crrReq = totalDeposits * 0.045; // 4.5%
  const slrReq = totalDeposits * 0.180; // 18.0%

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">RBI Regulatory Compliance &amp; Statutory Audit</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 7: Automated Audit Summary Logs &amp; Liquidity Reserve Reporting (CRR / SLR)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> RBI Compliant
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Demand &amp; Time Liabilities (NDTL)</div>
          <div className="text-3xl font-extrabold text-slate-100 font-mono">${totalDeposits.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">Global Customer Deposits Base</div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Cash Reserve Ratio (CRR 4.5%)</div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">${Math.round(crrReq).toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-medium">Maintained Reserve: ${(Math.round(crrReq * 1.05)).toLocaleString()} (Passed ✓)</div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Statutory Liquidity Ratio (SLR 18.0%)</div>
          <div className="text-3xl font-extrabold text-blue-400 font-mono">${Math.round(slrReq).toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-medium">Maintained Reserve: ${(Math.round(slrReq * 1.08)).toLocaleString()} (Passed ✓)</div>
        </div>
      </div>

      {/* Section: Regulatory Audit Summary */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-200">RBI Form A Return &amp; Liquidity Audit Ledger</h3>
          <span className="text-[11px] font-mono text-amber-400">Quarterly Submission ID: RBI-2026-Q3-0091</span>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { title: 'Priority Sector Lending (PSL) Compliance', status: 'Compliant (42% achieved vs 40% target)', color: 'text-emerald-400' },
            { title: 'Capital Adequacy Ratio (BASEL III CRAR)', status: '15.4% (Threshold &gt; 11.5%)', color: 'text-emerald-400' },
            { title: 'Non-Performing Asset (Gross NPA Ratio)', status: '1.2% (Sub-threshold Risk)', color: 'text-emerald-400' },
            { title: 'Cybersecurity Incident Inspection Log', status: '0 Unresolved Breaches Logged', color: 'text-emerald-400' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-200">{item.title}</span>
              </div>
              <span className={`font-mono font-bold ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
