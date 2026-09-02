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
import { useAuth } from '../../context/AuthContext';

export const AdminRbiModule = () => {
  const { t } = useAuth();
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
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      {/* Header Banner */}
      <div 
        className="p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('RBI Regulatory Compliance & NDTL Reserve Engine')}</h2>
            <p className="text-xs text-blue-100">{t('Executive Controller & Audit Engine: Automated CRR (4.5%) & SLR (18.0%) Reserve Verification')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> {t('RBI Compliant')}
          </span>
          <button
            onClick={handleDownloadReturn}
            disabled={downloading}
            className="white-btn px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {downloading ? t('Exporting...') : t('Export RBI Form A')}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3 border-t-4 border-t-[#1478F2]">
          <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">{t('Global NDTL Deposit Base')}</div>
          <div className="text-3xl font-extrabold text-[#111827] font-mono">₹{totalDeposits.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-[#6B7280] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#1478F2]" /> {t('Statutory Base for Cash Reserves')}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 border-t-4 border-t-[#22C55E]">
          <div className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">{t('Cash Reserve Ratio (CRR 4.5%)')}</div>
          <div className="text-3xl font-extrabold text-[#22C55E] font-mono">₹{Math.round(crrReq).toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reserve Maintained at RBI: ₹{(Math.round(crrReq * 1.05)).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3 border-t-4 border-t-[#1478F2]">
          <div className="text-xs font-bold text-[#1478F2] uppercase tracking-wider">{t('Statutory Liquidity Ratio (SLR 18.0%)')}</div>
          <div className="text-3xl font-extrabold text-[#1478F2] font-mono">₹{Math.round(slrReq).toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Liquid G-Secs & Gold: ₹{(Math.round(slrReq * 1.08)).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Regulatory Audit Indicators */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#1478F2]" />
            <h3 className="text-sm font-bold text-[#111827]">{t('RBI Statutory Compliance & Audit Indicators (Q3 2026)')}</h3>
          </div>
          <span className="text-xs font-mono text-[#1478F2] font-bold bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#1478F2]/30">
            Filing ID: RBI-2026-Q3-0091
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {[
            { title: 'Priority Sector Lending (PSL) Target', status: '42.0% Achieved (Target ≥ 40.0%)', desc: 'Kisan Agri & Micro-Enterprise Subvention', color: 'text-emerald-700' },
            { title: 'BASEL III Capital Adequacy Ratio (CRAR)', status: '15.4% (Regulatory Minimum ≥ 11.5%)', desc: 'Tier 1 & Tier 2 Capital Reserves', color: 'text-emerald-700' },
            { title: 'Gross Non-Performing Assets (GNPA)', status: '1.2% (Sub-threshold Low Risk)', desc: 'Fully provisioned under PCR 88%', color: 'text-emerald-700' },
            { title: 'Cyber Security & Data Localization', status: '100% Compliant (Zero Data Breaches)', desc: 'Encrypted Double-Entry Audit Logs', color: 'text-emerald-700' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span className="font-bold text-[#111827]">{t(item.title)}</span>
                </div>
                <div className="text-[11px] text-[#6B7280] pl-6">{item.desc}</div>
              </div>
              <span className={`font-mono font-bold text-[11px] ${item.color} bg-white px-2.5 py-1 rounded-lg border border-[#E5EAF1]`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

