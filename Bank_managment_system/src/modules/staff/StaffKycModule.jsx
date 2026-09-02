import React, { useState } from 'react';
import { UserCheck, CheckCircle2, ShieldCheck, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffKycModule = () => {
  const { kycQueue, setKycQueue, t } = useAuth();
  const [assignedInfo, setAssignedInfo] = useState(null);

  const handleVerifyAndAssignAccount = (usr) => {
    const generatedAccNo = '1000' + Math.floor(100000 + Math.random() * 900000);
    const ifsc = 'APEX0009821';

    setAssignedInfo({
      name: usr.name,
      email: usr.email,
      accountNo: generatedAccNo,
      ifscCode: ifsc
    });

    setKycQueue(prev => prev.filter(u => u._id !== usr._id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Customer KYC & Account Number Assignment Desk')}</h2>
            <p className="text-xs text-blue-100">{t('Staff Desk: Verify KYC document uploads and issue live 10-Digit Account Number & IFSC Code (APEX0009821).')}</p>
          </div>
        </div>
      </div>

      {assignedInfo && (
        <div className="p-6 rounded-2xl bg-white border border-[#1478F2]/40 space-y-2 text-center shadow-md">
          <div className="text-xs text-[#1478F2] uppercase font-bold tracking-wider">{t('Account & IFSC Successfully Issued')}</div>
          <div className="text-xl font-bold text-[#111827]">{assignedInfo.name} ({assignedInfo.email})</div>
          <div className="flex justify-center gap-6 font-mono text-sm pt-2">
            <div>Account No: <span className="text-[#1478F2] font-extrabold text-base">{assignedInfo.accountNo}</span></div>
            <div>IFSC Code: <span className="text-[#111827] font-extrabold text-base">{assignedInfo.ifscCode}</span></div>
          </div>
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Pending KYC Review Queue')}</h3>

        {kycQueue.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280] text-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
            {t('All customer KYC checks cleared and accounts assigned.')}
          </div>
        ) : (
          <div className="space-y-3">
            {kycQueue.map(u => (
              <div key={u._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#111827]">{u.name} ({u.email})</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">
                    Doc: <span className="text-[#111827] font-semibold">{u.idType}</span> • ID Number: <span className="font-mono text-[#111827]">{u.idNumber}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleVerifyAndAssignAccount(u)}
                  className="blue-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Key className="w-4 h-4" /> {t('Verify KYC & Assign Account No')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
