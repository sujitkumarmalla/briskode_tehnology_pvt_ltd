import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Table
} from 'lucide-react';

export const ReportsModule = () => {
  const [accountNo, setAccountNo] = useState('1000982341');
  const [downloadMsg, setDownloadMsg] = useState(null);

  const statementData = [
    { id: 'TX-901', date: '2026-08-25', desc: 'IMPS Fund Transfer to 1000982343', type: 'DR', amount: 25000, balance: 254800 },
    { id: 'TX-900', date: '2026-08-24', desc: 'NEFT Salary Deposit Credit', type: 'CR', amount: 150000, balance: 279800 },
    { id: 'TX-899', date: '2026-08-20', desc: 'ATM Withdrawal - Apex Station', type: 'DR', amount: 5000, balance: 129800 },
    { id: 'TX-898', date: '2026-08-15', desc: 'Quarterly Savings Interest Credit', type: 'CR', amount: 3450, balance: 134800 }
  ];

  const handleDownload = (format) => {
    setDownloadMsg(`Generating & downloading official account statement in ${format} format...`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Account Statements &amp; Ledger Reporting</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 6: Comprehensive Account Passbook Statements &amp; PDF/CSV Export Engine</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleDownload('PDF')}
            className="gold-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button
            onClick={() => handleDownload('CSV')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 flex items-center gap-1.5"
          >
            <Table className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {downloadMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {downloadMsg}
        </div>
      )}

      {/* Filter Header */}
      <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase">Select Account No</label>
            <select
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono font-bold text-amber-400"
            >
              <option value="1000982341">1000982341 - Rajesh Kumar (Savings)</option>
              <option value="1000982342">1000982342 - Rajesh Kumar (Fixed Deposit)</option>
              <option value="1000982343">1000982343 - Anita Desai (Current)</option>
            </select>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <div>Statement Period: <span className="text-slate-200 font-semibold">01-Aug-2026 to 25-Aug-2026</span></div>
          <div>Branch Code: <span className="text-amber-400 font-mono">APEX-0091 (Main Branch)</span></div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Particulars / Description</th>
                <th className="p-3">CR / DR</th>
                <th className="p-3 text-right">Transaction Amount ($)</th>
                <th className="p-3 text-right">Running Balance ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {statementData.map(row => (
                <tr key={row.id} className="hover:bg-slate-900/40">
                  <td className="p-3 text-amber-400 font-bold">{row.id}</td>
                  <td className="p-3 text-slate-400">{row.date}</td>
                  <td className="p-3 font-sans text-slate-200">{row.desc}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.type === 'CR' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-bold ${row.type === 'CR' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {row.type === 'CR' ? '+' : '-'}${row.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-100">${row.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
