import React, { useState } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  Clock
} from 'lucide-react';

export const PassingModule = () => {
  const [activeTab, setActiveTab] = useState('Transactions'); // Transactions | KYC

  const [transactions, setTransactions] = useState([
    { _id: 't3', fromAcc: '1000982341', toAcc: '1000989999', amount: 550000, type: 'Transfer', mode: 'NEFT', status: 'Pending Passing', timestamp: '2026-08-25 10:30 AM', initiatedBy: 'Rajesh Kumar', remarks: 'High Value Property Advance' },
    { _id: 't4', fromAcc: '1000982343', toAcc: '1000981111', amount: 250000, type: 'Transfer', mode: 'IMPS', status: 'Pending Passing', timestamp: '2026-08-25 11:05 AM', initiatedBy: 'Anita Desai', remarks: 'Commercial Inventory Procurement' }
  ]);

  const [kycUsers, setKycUsers] = useState([
    { _id: 'u4', name: 'Anita Desai', email: 'anita@apexbank.com', idType: 'Voter ID', idNumber: 'VOT987654', date: '2026-08-24' }
  ]);

  const handleActionTx = (id, action) => {
    setTransactions(prev => prev.filter(t => t._id !== id));
  };

  const handleActionKyc = (id, action) => {
    setKycUsers(prev => prev.filter(u => u._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <CheckSquare className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Staff Passing &amp; Approval Queue</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 3: Dual-Control Passing View for High-Value Operations &amp; KYC Approvals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Queue Count: {transactions.length + kycUsers.length} Items Pending
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('Transactions')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Transactions'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" /> Pending High-Value Transfers ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('KYC')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'KYC'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" /> Pending KYC Verifications ({kycUsers.length})
        </button>
      </div>

      {/* Transactions Queue */}
      {activeTab === 'Transactions' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200">High-Value Transfer Approval Queue (&gt; $100,000)</h3>
            <span className="text-[11px] text-amber-400">Maker-Checker Policy Active</span>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
              All pending transactions passed! Queue is completely empty.
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(t => (
                <div key={t._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold font-mono text-amber-400">${t.amount.toLocaleString()}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">{t.mode}</span>
                      <span className="text-xs text-slate-400">by <span className="text-slate-200 font-semibold">{t.initiatedBy}</span></span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      From: <span className="text-slate-300">{t.fromAcc}</span> -&gt; To: <span className="text-slate-300">{t.toAcc}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Remarks: {t.remarks} • {t.timestamp}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleActionTx(t._id, 'Approve')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Pass &amp; Authorize
                    </button>
                    <button
                      onClick={() => handleActionTx(t._id, 'Reject')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* KYC Queue */}
      {activeTab === 'KYC' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200">Customer Identity (KYC) Document Review Queue</h3>
            <span className="text-[11px] text-amber-400">Mandatory RBI Onboarding Check</span>
          </div>

          {kycUsers.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
              All pending customer KYC checks completed.
            </div>
          ) : (
            <div className="space-y-3">
              {kycUsers.map(u => (
                <div key={u._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-200">{u.name} ({u.email})</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Doc Type: <span className="text-amber-400 font-semibold">{u.idType}</span> • ID No: <span className="font-mono text-slate-300">{u.idNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleActionKyc(u._id, 'Approve')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Verify KYC
                    </button>
                    <button
                      onClick={() => handleActionKyc(u._id, 'Reject')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
