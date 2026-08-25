import React, { useState } from 'react';
import { Key } from 'lucide-react';

export const StaffVaultModule = () => {
  const [lockers, setLockers] = useState([
    { id: 'LCK-101', size: 'Medium Vault', branch: 'Apex Main Branch', fee: '₹2,500/yr', holder: 'Rajesh Kumar', status: 'Allocated' },
    { id: 'LCK-102', size: 'Large Safe', branch: 'Apex Main Branch', fee: '₹4,500/yr', holder: 'Anita Desai', status: 'Allocated' },
    { id: 'LCK-103', size: 'Executive Extra-Large', branch: 'Apex Main Branch', fee: '₹8,000/yr', holder: 'N/A', status: 'Available' }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <Key className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Vault &amp; Safe Deposit Locker Ledger</h2>
            <p className="text-xs text-slate-300">Staff Operations Module: Physical Locker Allocations, Annual Fees &amp; Vault Access Verification</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-700/80 pb-3">Branch Vault Locker Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lockers.map(l => (
            <div key={l.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-white font-bold text-sm">{l.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  l.status === 'Allocated' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {l.status}
                </span>
              </div>
              <div className="text-xs text-slate-200 font-semibold">{l.size}</div>
              <div className="text-[11px] text-slate-400">Holder: <span className="text-white font-semibold">{l.holder}</span></div>
              <div className="text-[11px] text-slate-400">Fee: <span className="font-mono text-white">{l.fee}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
