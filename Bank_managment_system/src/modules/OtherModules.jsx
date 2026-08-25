import React, { useState } from 'react';
import { 
  Grid, 
  Key, 
  HelpCircle, 
  TrendingUp, 
  Plus
} from 'lucide-react';

export const OtherModules = () => {
  const [subTab, setSubTab] = useState('Lockers'); // Lockers | ServiceRequests | Investments

  const [lockers, setLockers] = useState([
    { id: 'LCK-101', size: 'Medium Vault', branch: 'Apex Main Branch', fee: '$250/yr', status: 'Booked' },
    { id: 'LCK-102', size: 'Large Safe', branch: 'Apex City Branch', fee: '$450/yr', status: 'Available' },
    { id: 'LCK-103', size: 'Executive Extra-Large', branch: 'Apex Capital Branch', fee: '$800/yr', status: 'Available' }
  ]);

  const [serviceReqs, setServiceReqs] = useState([
    { id: 'SR-801', type: 'Cheque Book Request (50 Leaves)', date: '2026-08-24', status: 'In Process' },
    { id: 'SR-802', type: 'Address Change Mandate Update', date: '2026-08-20', status: 'Completed' }
  ]);

  const handleBookLocker = (id) => {
    setLockers(prev => prev.map(l => l.id === id ? { ...l, status: 'Booked' } : l));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Grid className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Auxiliary &amp; Extended Banking Services</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 10: Safe Deposit Locker Management, Service Requests &amp; Wealth Portal</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setSubTab('Lockers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            subTab === 'Lockers' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          <Key className="w-4 h-4" /> Safe Deposit Locker Reservation
        </button>
        <button
          onClick={() => setSubTab('ServiceRequests')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            subTab === 'ServiceRequests' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Customer Service Tickets
        </button>
        <button
          onClick={() => setSubTab('Investments')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            subTab === 'Investments' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Bank Shares &amp; Investment Portal
        </button>
      </div>

      {/* Content */}
      {subTab === 'Lockers' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Vault Locker Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lockers.map(l => (
              <div key={l.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold font-mono text-amber-400 text-sm">{l.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    l.status === 'Booked' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {l.status}
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-semibold">{l.size}</div>
                <div className="text-[11px] text-slate-400">{l.branch} • <span className="text-slate-300 font-mono">{l.fee}</span></div>
                {l.status === 'Available' && (
                  <button
                    onClick={() => handleBookLocker(l.id)}
                    className="w-full gold-btn py-1.5 rounded-lg text-xs font-bold text-slate-950"
                  >
                    Reserve Locker
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'ServiceRequests' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-200">Customer Support Ticket Ledger</h3>
            <button className="gold-btn px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> New Ticket
            </button>
          </div>
          <div className="space-y-2">
            {serviceReqs.map(sr => (
              <div key={sr.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-400 font-mono">{sr.id}</span> - <span className="text-slate-200">{sr.type}</span>
                  <div className="text-[10px] text-slate-500">{sr.date}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {sr.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'Investments' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Cooperative Shareholding &amp; Mutual Funds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
              <div className="text-xs text-slate-400 uppercase font-bold">Bank Share Capital Units</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">1,250 Shares</div>
              <div className="text-[11px] text-emerald-400 font-semibold">Current Value: $125,000 (Dividend Yield 12% p.a.)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 uppercase font-bold">Mutual Wealth Portfolio</div>
              <div className="text-2xl font-extrabold text-slate-100 font-mono">$48,500</div>
              <div className="text-[11px] text-emerald-400 font-semibold">+8.4% YTD Return</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
