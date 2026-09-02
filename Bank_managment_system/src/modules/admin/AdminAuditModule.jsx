import React from 'react';
import { FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminAuditModule = () => {
  const { t } = useAuth();
  const auditLogs = [
    { id: 'LOG-9921', timestamp: '2026-08-25 11:45:00', actor: 'Vikram Sharma (Admin)', action: 'Lockout Override executed on Account u4', ip: '192.168.1.1' },
    { id: 'LOG-9920', timestamp: '2026-08-25 10:30:12', actor: 'Priya Patel (Staff)', action: 'Approved High-Value Transfer #t3 (₹5,50,000)', ip: '192.168.1.4' },
    { id: 'LOG-9919', timestamp: '2026-08-25 09:15:22', actor: 'Rajesh Kumar (Customer)', action: 'Opened New Savings Account #1000982341', ip: '10.0.0.12' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Cryptographic Audit Vault')}</h2>
            <p className="text-xs text-blue-100">{t('Executive Controller Module: Immutable Double-Entry System Audit Ledger')}</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Chained Security Audit Records')}</h3>
        <div className="space-y-3 font-mono text-xs">
          {auditLogs.map(log => (
            <div key={log.id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
              <div>
                <span className="text-[#1478F2] font-bold">[{log.id}]</span> <span className="text-[#6B7280]">{log.timestamp}</span> — <span className="text-[#111827] font-sans font-semibold">{log.actor}</span>: {log.action}
              </div>
              <span className="text-[10px] text-[#6B7280]">{log.ip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
