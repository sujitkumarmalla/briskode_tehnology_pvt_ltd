import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileCheck, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  User, 
  Building,
  Sparkles,
  Search,
  Lock
} from 'lucide-react';

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

export const NewModule = () => {
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
    valueDate: new Date().toISOString().split('T')[0],
    nomineeName: 'Sunita Kumar',
    nomineeRelation: 'Spouse',
    nomineeDob: '1988-06-15',
    signatureVerified: true
  });

  const [createdAccount, setCreatedAccount] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const mockNo = '1000' + Math.floor(100000 + Math.random() * 900000);
      setCreatedAccount({
        accountNo: mockNo,
        accountType: formData.accountType,
        userName: formData.customerName,
        balance: Number(formData.initialDeposit),
        status: 'Active',
        nominee: { name: formData.nomineeName, relation: formData.nomineeRelation }
      });
      setStep(5);
      setIsSubmitting(false);
    }, 1000);
  };

  const stepsList = [
    { num: 1, title: 'Module Entry' },
    { num: 2, title: 'Select Product' },
    { num: 3, title: 'Customer KYC' },
    { num: 4, title: 'Account Details' },
    { num: 5, title: 'Nominee & Generate' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Module Title Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">5-Step Account Opening Wizard</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 1: Onboarding &amp; Live Account Lifecycle Setup</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
          Workflow Status: Step {step} of 5
        </span>
      </div>

      {/* Wizard Step Progress Tracker */}
      <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
        {stepsList.map((s, idx) => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;
          return (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isDone ? 'bg-emerald-500 text-slate-950' :
                  isCurrent ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20' :
                  'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <div className="hidden sm:block">
                  <div className={`text-xs font-bold ${isCurrent ? 'text-amber-400' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                    Step {s.num}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">{s.title}</div>
                </div>
              </div>
              {idx < stepsList.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${isDone ? 'bg-emerald-500/60' : 'bg-slate-800'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Wizard Form Body */}
      <div className="glass-card p-8 rounded-2xl">
        <AnimatePresence mode="wait">
          {/* STEP 1: MODULE ENTRY */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" /> Step 1: Module Entry (New -&gt; Account)
                </h3>
                <p className="text-xs text-slate-400">Initiate a new customer account opening process under core banking compliance rules.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-all">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Primary Action</div>
                  <h4 className="text-base font-semibold text-slate-200">Open Retail / Corporate Account</h4>
                  <p className="text-xs text-slate-400 mt-1">Issue account numbers for Savings, Current, Fixed Deposits, Loans, or Pigmy accounts.</p>
                  <button onClick={handleNext} className="mt-4 gold-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-2">
                    Begin Application <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Compliance Notice</div>
                  <h4 className="text-base font-semibold text-slate-300">RBI KYC Policy 2026</h4>
                  <p className="text-xs text-slate-400 mt-1">Mandatory verification of Aadhaar Card, PAN Card, or Passport before account activation.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SELECT PRODUCT (Dropdown of 12 Account Types) */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Building className="w-5 h-5 text-amber-400" /> Step 2: Select Banking Product (12 Core Types)
                </h3>
                <p className="text-xs text-slate-400">Choose from all 12 supported financial products under ApexBank core system.</p>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Select Product Account Type
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                >
                  {ACCOUNT_TYPES.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} - ({acc.desc})
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {ACCOUNT_TYPES.map(acc => (
                    <div
                      key={acc.id}
                      onClick={() => setFormData({ ...formData, accountType: acc.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.accountType === acc.id
                          ? 'bg-amber-500/10 border-amber-500/60 shadow-md shadow-amber-500/10'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-200 flex items-center justify-between">
                        {acc.name}
                        {formData.accountType === acc.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{acc.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">Back</button>
                <button onClick={handleNext} className="gold-btn px-6 py-2 rounded-xl text-xs font-bold text-slate-950">Next: Customer KYC</button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CUSTOMER KYC */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" /> Step 3: Customer KYC Verification
                </h3>
                <p className="text-xs text-slate-400">Search existing user profile or verify new identity details.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ID Document Type</label>
                  <select
                    value={formData.idType}
                    onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-amber-500"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ID Document Number</label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-emerald-300">Biometric Verification Cleared</div>
                    <div className="text-[11px] text-emerald-400/80">UIDAI / NSDL Online Validation Successful</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">Verified</span>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">Back</button>
                <button onClick={handleNext} className="gold-btn px-6 py-2 rounded-xl text-xs font-bold text-slate-950">Next: Account Details</button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: ACCOUNT DETAILS */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-amber-400" /> Step 4: Account Operational Details
                </h3>
                <p className="text-xs text-slate-400">Specify operational parameters, dates, category, and initial opening balance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nature of Account</label>
                  <select
                    value={formData.natureOfAccount}
                    onChange={(e) => setFormData({ ...formData, natureOfAccount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Joint">Joint Account</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Term Deposit">Term Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Operator Type</label>
                  <select
                    value={formData.operatorType}
                    onChange={(e) => setFormData({ ...formData, operatorType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                  >
                    <option value="Self Operated">Self Operated</option>
                    <option value="Either or Survivor">Either or Survivor</option>
                    <option value="Power of Attorney">Power of Attorney</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                  >
                    <option value="General">General Public</option>
                    <option value="Senior Citizen">Senior Citizen (Bonus Interest)</option>
                    <option value="Staff">Bank Staff Member</option>
                    <option value="Priority Sector">Priority Sector / Farmer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Initial Opening Deposit ($)</label>
                  <input
                    type="number"
                    value={formData.initialDeposit}
                    onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Value Date</label>
                  <input
                    type="date"
                    value={formData.valueDate}
                    onChange={(e) => setFormData({ ...formData, valueDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">Back</button>
                <button onClick={handleNext} className="gold-btn px-6 py-2 rounded-xl text-xs font-bold text-slate-950">Next: Nominee & Save</button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: NOMINEE & SAVE (Generate Live Account Number) */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              {!createdAccount ? (
                <>
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-400" /> Step 5: Nominee Details & Authorization
                    </h3>
                    <p className="text-xs text-slate-400">Final step: capture nominee details and generate live account number.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nominee Full Name</label>
                      <input
                        type="text"
                        value={formData.nomineeName}
                        onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Relationship</label>
                      <input
                        type="text"
                        value={formData.nomineeRelation}
                        onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Nominee Date of Birth</label>
                      <input
                        type="date"
                        value={formData.nomineeDob}
                        onChange={(e) => setFormData({ ...formData, nomineeDob: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">Signature & Mandate Verification</div>
                      <div className="text-[11px] text-slate-400">Specimen signature scanned and matched with KYC card</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, signatureVerified: !formData.signatureVerified })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formData.signatureVerified
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {formData.signatureVerified ? 'Signature Verified ✓' : 'Signature Unverified ✗'}
                    </button>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button onClick={handlePrev} className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">Back</button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gold-btn px-8 py-3 rounded-xl text-xs font-extrabold text-slate-950 flex items-center gap-2"
                    >
                      {isSubmitting ? 'Generating Account...' : 'Save & Generate Account No.'} <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                /* Success Screen with live generated Account Number */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-100">Account Successfully Created!</h3>
                    <p className="text-xs text-slate-400 mt-1">Live Account Number generated and registered in ApexBank Core ledger.</p>
                  </div>

                  <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-3">
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Generated 10-Digit Account No</div>
                    <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-widest bg-amber-500/10 py-3 rounded-xl border border-amber-500/20 select-all">
                      {createdAccount.accountNo}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-left pt-2 border-t border-slate-800">
                      <div><span className="text-slate-500">Account Type:</span> <span className="font-semibold text-slate-200">{createdAccount.accountType}</span></div>
                      <div><span className="text-slate-500">Primary Holder:</span> <span className="font-semibold text-slate-200">{createdAccount.userName}</span></div>
                      <div><span className="text-slate-500">Initial Balance:</span> <span className="font-semibold text-emerald-400">${createdAccount.balance.toLocaleString()}</span></div>
                      <div><span className="text-slate-500">Nominee:</span> <span className="font-semibold text-slate-200">{createdAccount.nominee?.name}</span></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCreatedAccount(null);
                      setStep(1);
                    }}
                    className="gold-btn px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950"
                  >
                    Open Another Account
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
