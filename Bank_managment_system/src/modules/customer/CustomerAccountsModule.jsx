import React, { useState } from 'react';
import { FileText, Download, Table, CheckCircle2, Lock, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OtpModal } from '../../components/OtpModal';

export const CustomerAccountsModule = () => {
  const { accounts, user, t } = useAuth();
  const [selectedAcc, setSelectedAcc] = useState(user?.accountNo || '1000982341');
  const [isBalanceUnlocked, setIsBalanceUnlocked] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState(null);

  const statementData = [
    { id: 'TX-901', date: '2026-08-25', desc: 'IMPS Fund Transfer to 1000982343', type: 'DR', amount: 25000, status: 'Completed' },
    { id: 'TX-900', date: '2026-08-24', desc: 'NEFT Salary Credit Deposit', type: 'CR', amount: 150000, status: 'Completed' },
    { id: 'TX-899', date: '2026-08-20', desc: 'ATM Cash Withdrawal - Apex Station', type: 'DR', amount: 5000, status: 'Completed' }
  ];

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    setIsBalanceUnlocked(true);
  };

  const handleDownload = (format) => {
    setDownloadMsg(`Downloading official statement for Account ${selectedAcc} in ${format}...`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('myAccounts')}</h2>
            <p className="text-xs text-slate-300">Account No: <span className="font-mono text-white font-bold">{user?.accountNo}</span> • IFSC: <span className="font-mono text-lightgreen-400 font-bold">{user?.ifscCode}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isBalanceUnlocked ? (
            <button
              onClick={() => setShowOtpModal(true)}
              className="green-btn px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> {t('unlockBalance')}
            </button>
          ) : (
            <button
              onClick={() => setIsBalanceUnlocked(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4 text-emerald-400" /> {t('hideBalance')}
            </button>
          )}
        </div>
      </div>

      {downloadMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {downloadMsg}
        </div>
      )}

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map(acc => (
          <div
            key={acc.accountNo}
            onClick={() => setSelectedAcc(acc.accountNo)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedAcc === acc.accountNo ? 'bg-slate-900 border-lightgreen-400/80 shadow-lg' : 'bg-slate-950/80 border-slate-800'
            }`}
          >
            <div className="text-xs text-slate-400 font-bold uppercase">{acc.type}</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              {isBalanceUnlocked ? `₹${acc.balance.toLocaleString('en-IN')}` : '₹••••••••'}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between">
              <span>No: {acc.accountNo}</span>
              <span className="text-lightgreen-400 font-bold">{acc.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white">{t('myAccounts')} ({selectedAcc})</h3>
          <div className="flex gap-2">
            <button onClick={() => handleDownload('PDF')} className="white-btn px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button onClick={() => handleDownload('CSV')} className="grey-btn px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
              <Table className="w-3.5 h-3.5" /> CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-right">Amount (₹)</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {statementData.map(row => (
                <tr key={row.id} className="hover:bg-slate-800/40">
                  <td className="p-3 text-white font-bold">{row.id}</td>
                  <td className="p-3 text-slate-400">{row.date}</td>
                  <td className="p-3 font-sans text-white">{row.desc}</td>
                  <td className="p-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.type === 'CR' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-bold ${row.type === 'CR' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {row.type === 'CR' ? '+' : '-'}₹{row.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right font-sans text-emerald-400 font-bold">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OTP Balance Unlock Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerified}
        title={t('unlockBalance')}
        subtitle="Enter 6-digit OTP code to view unmasked balance"
      />
    </div>
  );
};
