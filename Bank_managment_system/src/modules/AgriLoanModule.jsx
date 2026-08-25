import React, { useState } from 'react';
import { 
  Sprout, 
  CheckCircle2, 
  Send
} from 'lucide-react';

export const AgriLoanModule = () => {
  const [formData, setFormData] = useState({
    farmerName: 'Rajesh Kumar',
    loanType: 'AgriLoan',
    amount: '350000',
    tenure: '24',
    surveyNumber: 'SY-8892/A',
    acreage: '12.5',
    cropSeason: 'Kharif',
    cropType: 'Cotton & Wheat'
  });

  const [loans, setLoans] = useState([
    { id: 'l1', farmer: 'Rajesh Kumar', amount: 350000, interestRate: 4.0, survey: 'SY-8892/A', acreage: 12.5, season: 'Kharif', status: 'Approved' },
    { id: 'l2', farmer: 'Anita Desai', amount: 180000, interestRate: 4.0, survey: 'SY-4410/C', acreage: 6.0, season: 'Rabi', status: 'Submitted' }
  ]);

  const [submittedMessage, setSubmittedMessage] = useState(null);

  const baseRate = 7.0;
  const subsidyPercent = 3.0;
  const effectiveRate = baseRate - subsidyPercent; // 4.0%

  const handleSubmit = (e) => {
    e.preventDefault();
    const newL = {
      id: 'l_' + Date.now(),
      farmer: formData.farmerName,
      amount: Number(formData.amount),
      interestRate: effectiveRate,
      survey: formData.surveyNumber,
      acreage: Number(formData.acreage),
      season: formData.cropSeason,
      status: 'Submitted'
    };
    setLoans([newL, ...loans]);
    setSubmittedMessage('AgriLoan application logged with Govt Interest Subvention of 3.0% applied.');
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  const handleDisburse = (id) => {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'Disbursed' } : l));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Kisan Priority Agricultural Credit (AgriLoan)</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 8: Land Survey Inputs, Crop Season Interest Subvention &amp; Disbursement Tracking</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Govt Interest Subvention</div>
          <div className="text-lg font-extrabold text-emerald-400 font-mono">4.0% Subsidized Rate</div>
        </div>
      </div>

      {submittedMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {submittedMessage}
        </div>
      )}

      {/* Form & Subvention Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">AgriLoan Credit Application</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Farmer / Applicant Name</label>
                <input
                  type="text"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Loan Credit Amount ($)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono font-bold text-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Land Survey / Gut Number</label>
                <input
                  type="text"
                  value={formData.surveyNumber}
                  onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Land Acreage (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.acreage}
                  onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Crop Season</label>
                <select
                  value={formData.cropSeason}
                  onChange={(e) => setFormData({ ...formData, cropSeason: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
                >
                  <option value="Kharif">Kharif (Monsoon Season)</option>
                  <option value="Rabi">Rabi (Winter Season)</option>
                  <option value="Zaid">Zaid (Summer Season)</option>
                  <option value="Perennial">Perennial Commercial Crops</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Crop Type</label>
                <input
                  type="text"
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-2">
                <Send className="w-4 h-4" /> Submit AgriLoan Request
              </button>
            </div>
          </form>
        </div>

        {/* Subvention Card */}
        <div className="glass-card-gold p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 border-b border-amber-500/30 pb-2">Subsidized Interest Matrix</h3>
            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Standard Card Rate:</span>
                <span className="font-mono text-slate-200">7.00%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Govt Interest Subvention:</span>
                <span className="font-mono text-emerald-400">-3.00%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="font-bold text-slate-100">Net Farmer Interest Rate:</span>
                <span className="font-mono font-extrabold text-amber-400 text-sm">4.00% p.a.</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
            Disbursement directly credited to verified farmer Savings Account upon land revenue verification.
          </div>
        </div>
      </div>

      {/* Active AgriLoans Table */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">AgriLoan Disbursement Ledger</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold">
              <tr>
                <th className="p-3">Loan ID</th>
                <th className="p-3">Farmer Name</th>
                <th className="p-3">Survey No</th>
                <th className="p-3">Acreage</th>
                <th className="p-3">Season</th>
                <th className="p-3">Net Rate</th>
                <th className="p-3 text-right">Amount ($)</th>
                <th className="p-3 text-right">Disbursement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {loans.map(l => (
                <tr key={l.id} className="hover:bg-slate-900/40">
                  <td className="p-3 text-amber-400 font-bold">{l.id}</td>
                  <td className="p-3 font-sans text-slate-200">{l.farmer}</td>
                  <td className="p-3 text-slate-400">{l.survey}</td>
                  <td className="p-3 text-slate-400">{l.acreage} Acres</td>
                  <td className="p-3 font-sans">{l.season}</td>
                  <td className="p-3 text-emerald-400 font-bold">{l.interestRate}%</td>
                  <td className="p-3 text-right text-slate-100 font-bold">${l.amount.toLocaleString()}</td>
                  <td className="p-3 text-right font-sans">
                    {l.status === 'Disbursed' ? (
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Disbursed ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDisburse(l.id)}
                        className="px-3 py-1 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
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
