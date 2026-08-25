import React, { useState } from 'react';
import { UserCheck, CheckCircle2, ShieldCheck, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StaffKycModule = () => {
  const { kycQueue, setKycQueue } = useAuth();
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
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-green p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-lightgreen-400/20 border border-lightgreen-400/40 flex items-center justify-center text-lightgreen-400">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Customer KYC &amp; Account Number Assignment Desk</h2>
            <p className="text-xs text-slate-300">Staff Desk: Verify KYC document uploads and issue live 10-Digit Account Number &amp; IFSC Code (`APEX0009821`).</p>
          </div>
        </div>
      </div>

      {assignedInfo && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-lightgreen-400/40 space-y-2 text-center">
          <div className="text-xs text-lightgreen-400 uppercase font-bold tracking-wider">Account &amp; IFSC Successfully Issued</div>
          <div className="text-xl font-bold text-white">{assignedInfo.name} ({assignedInfo.email})</div>
          <div className="flex justify-center gap-6 font-mono text-sm pt-2">
            <div>Account No: <span className="text-lightgreen-400 font-extrabold text-base">{assignedInfo.accountNo}</span></div>
            <div>IFSC Code: <span className="text-white font-extrabold text-base">{assignedInfo.ifscCode}</span></div>
          </div>
        </div>
      )}

      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Pending KYC Review Queue</h3>

        {kycQueue.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
            All customer KYC checks cleared and accounts assigned.
          </div>
        ) : (
          <div className="space-y-3">
            {kycQueue.map(u => (
              <div key={u._id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{u.name} ({u.email})</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Doc: <span className="text-white font-semibold">{u.idType}</span> • ID Number: <span className="font-mono text-slate-300">{u.idNumber}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleVerifyAndAssignAccount(u)}
                  className="green-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Key className="w-4 h-4" /> Verify KYC &amp; Assign Account No
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
