import React, { useState } from 'react';
import { Sprout, Send, CheckCircle2 } from 'lucide-react';

export const CustomerAgriApplyModule = () => {
  const [formData, setFormData] = useState({
    farmerName: 'Rajesh Kumar',
    amount: '350000',
    surveyNumber: 'SY-8892/A',
    acreage: '12.5',
    cropSeason: 'Kharif'
  });

  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('AgriLoan application submitted with Govt 3.0% Subvention applied (4.0% net rate).');
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-grey p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Kisan Priority AgriLoan Application</h2>
            <p className="text-xs text-slate-300">Customer Self-Service: Agricultural Credit with 3% Govt Interest Subvention (4.0% Net Rate)</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      <div className="glass-card p-8 rounded-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Applicant Name</label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Loan Credit Amount ($)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Land Survey Number</label>
              <input
                type="text"
                value={formData.surveyNumber}
                onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Land Acreage (Acres)</label>
              <input
                type="number"
                step="0.1"
                value={formData.acreage}
                onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="white-btn px-6 py-2.5 rounded-xl text-xs flex items-center gap-2">
              <Send className="w-4 h-4" /> Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
