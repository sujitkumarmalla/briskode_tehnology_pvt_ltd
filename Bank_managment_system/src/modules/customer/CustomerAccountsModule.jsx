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
      {/* Banner / Total Balance Card with linear-gradient(135deg, #1478F2, #0D5FC4) */}
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-xl"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('myAccounts')}</h2>
            <p className="text-xs text-blue-100">Account No: <span className="font-mono text-white font-bold">{user?.accountNo}</span> • IFSC: <span className="font-mono text-white font-bold">{user?.ifscCode}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isBalanceUnlocked ? (
            <button
              onClick={() => setShowOtpModal(true)}
              className="white-btn px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <Lock className="w-4 h-4 text-[#1478F2]" /> {t('unlockBalance')}
            </button>
          ) : (
            <button
              onClick={() => setIsBalanceUnlocked(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/20 text-white border border-white/30 hover:bg-white/30 flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4 text-white" /> {t('hideBalance')}
            </button>
          )}
        </div>
      </div>

      {downloadMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {downloadMsg}
        </div>
      )}

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map(acc => (
          <div
            key={acc.accountNo}
            onClick={() => setSelectedAcc(acc.accountNo)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedAcc === acc.accountNo 
                ? 'bg-white border-[#1478F2] ring-2 ring-[#1478F2]/30 shadow-lg' 
                : 'bg-white border-[#E5EAF1] hover:border-[#1478F2]/40 shadow-sm'
            }`}
          >
            <div className="text-xs text-[#6B7280] font-bold uppercase">{acc.type}</div>
            <div className="text-2xl font-extrabold text-[#111827] font-mono mt-1">
              {isBalanceUnlocked ? `₹${acc.balance.toLocaleString('en-IN')}` : '₹••••••••'}
            </div>
            <div className="text-[11px] text-[#6B7280] mt-2 font-mono flex items-center justify-between">
              <span>No: {acc.accountNo}</span>
              <span className="text-[#1478F2] font-bold">{acc.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#E5EAF1] pb-3">
          <h3 className="text-sm font-bold text-[#111827]">{t('myAccounts')} ({selectedAcc})</h3>
          <div className="flex gap-2">
            <button onClick={() => handleDownload('PDF')} className="blue-btn px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
            <button onClick={() => handleDownload('CSV')} className="grey-btn px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
              <Table className="w-3.5 h-3.5" /> CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#111827]">
            <thead className="bg-[#F6F9FD] text-[#6B7280] uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-right">Amount (₹)</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF1] font-mono">
              {statementData.map(row => (
                <tr key={row.id} className="hover:bg-[#F6F9FD]">
                  <td className="p-3 text-[#1478F2] font-bold">{row.id}</td>
                  <td className="p-3 text-[#6B7280]">{row.date}</td>
                  <td className="p-3 font-sans text-[#111827]">{row.desc}</td>
                  <td className="p-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.type === 'CR' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-bold ${row.type === 'CR' ? 'text-[#22C55E]' : 'text-[#111827]'}`}>
                    {row.type === 'CR' ? '+' : '-'}₹{row.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right font-sans text-[#22C55E] font-bold">{row.status}</td>
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
