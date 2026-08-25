import React from 'react';
import { Landmark, ShieldCheck, Lock, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 px-6 lg:px-12 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Landmark className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-base text-slate-100">ApexBank Enterprise</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Licensed Scheduled Commercial &amp; Cooperative Banking Core Infrastructure Engine. Regulated under RBI Banking Regulation Act.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase text-[11px] tracking-wider mb-3">Core Modules</h4>
          <ul className="space-y-2 text-[11px]">
            <li>"New" 5-Step Account Wizard</li>
            <li>Real-Time NEFT / IMPS Transfers</li>
            <li>Bank Staff Passing Queue</li>
            <li>AgriLoan Subvention Flow</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase text-[11px] tracking-wider mb-3">Regulatory &amp; Security</h4>
          <ul className="space-y-2 text-[11px]">
            <li>RBI CRR &amp; SLR Reserve Reporting</li>
            <li>Stateless JWT Authentication</li>
            <li>bcrypt Password Encryption</li>
            <li>Double-Entry Audit Logging</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-200 uppercase text-[11px] tracking-wider mb-3">Corporate Headquarters</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            ApexBank Towers, Financial District<br />
            Core Plaza, Level 14<br />
            ISO 27001 Certified Financial Facility
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 gap-4">
        <div>&copy; 2026 ApexBank Enterprise Core System. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400 font-mono"><ShieldCheck className="w-3.5 h-3.5" /> RBI Compliant Core v4.2</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-amber-400 font-mono"><Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted</span>
        </div>
      </div>
    </footer>
  );
};
