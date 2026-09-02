import React from 'react';
import { Landmark, ShieldCheck, Lock, Globe } from 'lucide-react';

export const Footer = ({ dark = false }) => {
  return (
    <footer className={`py-12 px-6 lg:px-12 text-xs transition-colors ${
      dark 
        ? 'bg-[#070D1E] border-t border-blue-900/40 text-slate-400' 
        : 'bg-[#FFFFFF] border-t border-[#D1D5DB] text-[#475569]'
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1478F2] flex items-center justify-center text-white font-bold shadow-md">
              <Landmark className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className={`font-extrabold text-base ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
              ApexBank Enterprise
            </span>
          </div>
          <p className={`text-[11px] leading-relaxed ${dark ? 'text-slate-400' : 'text-[#475569]'}`}>
            Licensed Scheduled Commercial &amp; Cooperative Banking Core Infrastructure Engine. Regulated under RBI Banking Regulation Act.
          </p>
        </div>

        <div>
          <h4 className={`font-bold uppercase text-[11px] tracking-wider mb-3 ${dark ? 'text-white' : 'text-[#0F172A]'}`}>Core Modules</h4>
          <ul className={`space-y-2 text-[11px] ${dark ? 'text-slate-400' : 'text-[#475569]'}`}>
            <li>"New" 5-Step Account Wizard</li>
            <li>Real-Time NEFT / IMPS Transfers</li>
            <li>Bank Staff Passing Queue</li>
            <li>AgriLoan Subvention Flow</li>
          </ul>
        </div>

        <div>
          <h4 className={`font-bold uppercase text-[11px] tracking-wider mb-3 ${dark ? 'text-white' : 'text-[#0F172A]'}`}>Regulatory &amp; Security</h4>
          <ul className={`space-y-2 text-[11px] ${dark ? 'text-slate-400' : 'text-[#475569]'}`}>
            <li>RBI CRR &amp; SLR Reserve Reporting</li>
            <li>Stateless JWT Authentication</li>
            <li>bcrypt Password Encryption</li>
            <li>Double-Entry Audit Logging</li>
          </ul>
        </div>

        <div>
          <h4 className={`font-bold uppercase text-[11px] tracking-wider mb-3 ${dark ? 'text-white' : 'text-[#0F172A]'}`}>Corporate Headquarters</h4>
          <p className={`text-[11px] leading-relaxed ${dark ? 'text-slate-400' : 'text-[#475569]'}`}>
            ApexBank Towers, Financial District<br />
            Core Plaza, Level 14<br />
            ISO 27001 Certified Financial Facility
          </p>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto pt-6 border-t flex flex-col md:flex-row items-center justify-between text-[10px] gap-4 ${
        dark ? 'border-blue-900/40 text-slate-500' : 'border-[#D1D5DB] text-[#475569]'
      }`}>
        <div>&copy; 2026 ApexBank Enterprise Core System. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#22C55E] font-semibold"><ShieldCheck className="w-3.5 h-3.5" /> RBI Compliant Core v4.2</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#1478F2] font-semibold"><Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted</span>
        </div>
      </div>
    </footer>
  );
};
