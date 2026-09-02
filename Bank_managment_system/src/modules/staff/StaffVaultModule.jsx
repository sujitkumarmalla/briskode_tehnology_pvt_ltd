import React, { useState } from 'react';
import { Key } from 'lucide-react';

export const StaffVaultModule = () => {
  const { t } = useAuth();
  const [lockers, setLockers] = useState([
    { id: 'LCK-101', size: 'Medium Vault', branch: 'Apex Main Branch', fee: '₹2,500/yr', holder: 'Rajesh Kumar', status: 'Allocated' },
    { id: 'LCK-102', size: 'Large Safe', branch: 'Apex Main Branch', fee: '₹4,500/yr', holder: 'Anita Desai', status: 'Allocated' },
    { id: 'LCK-103', size: 'Executive Extra-Large', branch: 'Apex Main Branch', fee: '₹8,000/yr', holder: 'N/A', status: 'Available' }
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <Key className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Vault & Safe Deposit Locker Ledger')}</h2>
            <p className="text-xs text-blue-100">{t('Staff Operations Module: Physical Locker Allocations, Annual Fees & Vault Access Verification')}</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Branch Vault Locker Inventory')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lockers.map(l => (
            <div key={l.id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[#111827] font-bold text-sm">{l.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  l.status === 'Allocated' ? 'bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {l.status}
                </span>
              </div>
              <div className="text-xs text-[#111827] font-semibold">{l.size}</div>
              <div className="text-[11px] text-[#6B7280]">Holder: <span className="text-[#111827] font-semibold">{l.holder}</span></div>
              <div className="text-[11px] text-[#6B7280]">Fee: <span className="font-mono text-[#111827]">{l.fee}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
