import React, { useState } from 'react';
import { Sprout, CheckCircle2 } from 'lucide-react';

export const StaffAgriDisburseModule = () => {
  const [loans, setLoans] = useState([
    { id: 'l1', farmer: 'Rajesh Kumar', amount: 350000, interestRate: 4.0, survey: 'SY-8892/A', acreage: 12.5, season: 'Kharif', status: 'Approved' },
    { id: 'l2', farmer: 'Anita Desai', amount: 180000, interestRate: 4.0, survey: 'SY-4410/C', acreage: 6.0, season: 'Rabi', status: 'Submitted' }
  ]);

  const [msg, setMsg] = useState(null);

  const handleDisburse = (id) => {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'Disbursed' } : l));
    setMsg(`Loan ${id} funds disbursed directly to farmer Savings Account.`);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">AgriLoan Disbursement Desk</h2>
            <p className="text-xs text-slate-300">Staff Operations Module: Land Survey Verification &amp; Kisan Subvention Credit Disbursement</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-700/80 pb-3">AgriLoan Application &amp; Disbursement Queue</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3">Loan ID</th>
                <th className="p-3">Farmer Name</th>
                <th className="p-3">Survey No</th>
                <th className="p-3">Acreage</th>
                <th className="p-3">Crop Season</th>
                <th className="p-3">Net Rate</th>
                <th className="p-3 text-right">Amount (₹)</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {loans.map(l => (
                <tr key={l.id} className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">{l.id}</td>
                  <td className="p-3 font-sans text-white">{l.farmer}</td>
                  <td className="p-3 text-slate-400">{l.survey}</td>
                  <td className="p-3 text-slate-400">{l.acreage} Acres</td>
                  <td className="p-3 font-sans">{l.season}</td>
                  <td className="p-3 text-emerald-400 font-bold">{l.interestRate}%</td>
                  <td className="p-3 text-right text-white font-bold">₹{l.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right font-sans">
                    {l.status === 'Disbursed' ? (
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Disbursed ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDisburse(l.id)}
                        className="px-3 py-1 rounded text-xs font-bold bg-white text-slate-950 hover:bg-slate-200"
                      >
                        Approve &amp; Disburse
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
