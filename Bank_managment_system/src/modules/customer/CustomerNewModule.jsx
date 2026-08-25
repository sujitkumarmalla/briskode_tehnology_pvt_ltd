import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Check, CheckCircle2, ArrowRight, CreditCard, Building, User, FileCheck, ShieldCheck, Sparkles } from 'lucide-react';

export const ACCOUNT_TYPES = [
  { id: 'Savings', name: 'Savings Account', desc: 'Standard retail deposit account with compounding interest' },
  { id: 'Current', name: 'Current Account', desc: 'Commercial operational account for high volume transactions' },
  { id: 'Fixed Deposit', name: 'Fixed Deposit (FD)', desc: 'High yield term deposit with fixed maturity schedule' },
  { id: 'Recurring Deposit', name: 'Recurring Deposit (RD)', desc: 'Monthly disciplined savings program' },
  { id: 'Pigmy', name: 'Pigmy Small Deposit', desc: 'Daily doorstep micro-deposit collection scheme' },
  { id: 'Loan', name: 'Term Loan Account', desc: 'Personal or commercial term credit facility' },
  { id: 'CC/OD', name: 'Cash Credit / Overdraft', desc: 'Working capital limit against inventory or assets' },
  { id: 'Share', name: 'Bank Share Capital', desc: 'Cooperative equity and member share account' },
  { id: 'Locker', name: 'Safe Deposit Locker', desc: 'Secure vault storage reservation account' },
  { id: 'Investment', name: 'Wealth & Mutual Investment', desc: 'Capital growth portfolio holding account' },
  { id: 'Sundry', name: 'Sundry Office Account', desc: 'Internal bank clearing and suspense ledger' },
  { id: 'Borrowing', name: 'Inter-Bank Borrowing', desc: 'Institutional liquidity borrowing facility' }
];

export const CustomerNewModule = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountType: 'Savings',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@apexbank.com',
    idType: 'Aadhaar Card',
    idNumber: '9988-7766-5544',
    natureOfAccount: 'Individual',
    operatorType: 'Self Operated',
    category: 'General',
    initialDeposit: '10000',
    nomineeName: 'Sunita Kumar',
    nomineeRelation: 'Spouse',
    signatureVerified: true
  });

  const [createdAccount, setCreatedAccount] = useState(null);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockNo = '1000' + Math.floor(100000 + Math.random() * 900000);
    setCreatedAccount({
      accountNo: mockNo,
      accountType: formData.accountType,
      userName: formData.customerName,
      balance: Number(formData.initialDeposit),
      nominee: { name: formData.nomineeName, relation: formData.nomineeRelation }
    });
    setStep(5);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="glass-card-grey p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">5-Step Account Opening Wizard</h2>
            <p className="text-xs text-slate-300">Customer Onboarding: Select from 12 Account Types &amp; Generate Live 10-Digit Account Number</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20">
          Step {step} of 5
        </span>
      </div>

      <div className="glass-card p-8 rounded-2xl space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-700/80 pb-3">Step 1: Module Entry</h3>
            <p className="text-xs text-slate-300">Initiate a new bank account opening application under RBI compliance rules.</p>
            <button onClick={handleNext} className="white-btn px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2">
              Begin Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-700/80 pb-3">Step 2: Select Banking Product (12 Types)</h3>
            <select
              value={formData.accountType}
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-bold"
            >
              {ACCOUNT_TYPES.map(a => (
                <option key={a.id} value={a.id}>{a.name} — ({a.desc})</option>
              ))}
            </select>
            <div className="flex justify-between pt-4">
              <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300">Back</button>
              <button onClick={handleNext} className="white-btn px-6 py-2 rounded-xl text-xs">Next: Customer KYC</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-700/80 pb-3">Step 3: Customer KYC Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ID Document Type</label>
                <select
                  value={formData.idType}
                  onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Passport">Passport</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300">Back</button>
              <button onClick={handleNext} className="white-btn px-6 py-2 rounded-xl text-xs">Next: Account Details</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-700/80 pb-3">Step 4: Operational Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Initial Opening Deposit ($)</label>
                <input
                  type="number"
                  value={formData.initialDeposit}
                  onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300">Back</button>
              <button onClick={handleNext} className="white-btn px-6 py-2 rounded-xl text-xs">Next: Nominee & Save</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            {!createdAccount ? (
              <>
                <h3 className="text-base font-bold text-white border-b border-slate-700/80 pb-3">Step 5: Nominee Details & Authorization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Nominee Full Name</label>
                    <input
                      type="text"
                      value={formData.nomineeName}
                      onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Relationship</label>
                    <input
                      type="text"
                      value={formData.nomineeRelation}
                      onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300">Back</button>
                  <button onClick={handleSubmit} className="white-btn px-8 py-3 rounded-xl text-xs">Save &amp; Generate Account No.</button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Account Successfully Generated!</h3>
                <div className="text-3xl font-extrabold font-mono text-white tracking-widest bg-slate-950 py-3 rounded-xl border border-white/20 select-all max-w-md mx-auto">
                  {createdAccount.accountNo}
                </div>
                <p className="text-xs text-slate-400">Registered in ApexBank core ledger for {createdAccount.userName}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
