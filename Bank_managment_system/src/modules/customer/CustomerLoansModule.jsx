import React, { useState } from 'react';
import { GraduationCap, Sprout, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CustomerLoansModule = () => {
  const { user, studyLoans, addStudyLoan, agriLoans, addAgriLoan, t } = useAuth();
  const [loanTab, setLoanTab] = useState('Study');

  // Study Loan Form
  const [studyForm, setStudyForm] = useState({
    applicant: user?.name || 'Rajesh Kumar',
    institute: 'IIT Bombay',
    course: 'M.Tech AI & Data Science',
    duration: '2 Years',
    amount: '800000',
    guarantor: 'Suresh Kumar (Father)'
  });

  // Agri Loan Form
  const [agriForm, setAgriForm] = useState({
    applicant: user?.name || 'Rajesh Kumar',
    surveyNo: 'SY-8892/A',
    acreage: '12.5',
    season: 'Kharif',
    cropType: 'Cotton & Wheat',
    amount: '350000'
  });

  const [msg, setMsg] = useState(null);

  const handleStudySubmit = (e) => {
    e.preventDefault();
    const newL = {
      _id: 'sl_' + Date.now(),
      applicant: studyForm.applicant,
      accountNo: user?.accountNo || '1000982341',
      institute: studyForm.institute,
      course: studyForm.course,
      duration: studyForm.duration,
      amount: Number(studyForm.amount),
      status: 'Submitted',
      staffNote: ''
    };
    addStudyLoan(newL);
    setMsg('Study Loan application submitted to Staff review team.');
    setTimeout(() => setMsg(null), 4000);
  };

  const handleAgriSubmit = (e) => {
    e.preventDefault();
    const newL = {
      _id: 'al_' + Date.now(),
      applicant: agriForm.applicant,
      accountNo: user?.accountNo || '1000982341',
      surveyNo: agriForm.surveyNo,
      acreage: Number(agriForm.acreage),
      season: agriForm.season,
      amount: Number(agriForm.amount),
      netRate: 4.0,
      status: 'Submitted',
      staffNote: ''
    };
    addAgriLoan(newL);
    setMsg('AgriLoan application submitted with 3.0% Govt Subvention applied (4.0% net rate).');
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      {/* Banner */}
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Study & Agri Loan Applications Portal')}</h2>
            <p className="text-xs text-blue-100">{t('Submit requests → Reviewed by Staff → Final Approval granted by Admin.')}</p>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
        </div>
      )}

      {/* Loan Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setLoanTab('Study')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
            loanTab === 'Study' 
              ? 'bg-[#1478F2] text-white shadow-md' 
              : 'bg-[#F6F9FD] text-[#6B7280] border border-[#E5EAF1] hover:bg-[#EAF4FF] hover:text-[#1478F2]'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> {t('Apply for Study Loan (Education)')}
        </button>
        <button
          onClick={() => setLoanTab('Agri')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
            loanTab === 'Agri' 
              ? 'bg-[#1478F2] text-white shadow-md' 
              : 'bg-[#F6F9FD] text-[#6B7280] border border-[#E5EAF1] hover:bg-[#EAF4FF] hover:text-[#1478F2]'
          }`}
        >
          <Sprout className="w-4 h-4" /> {t('Apply for Agri Loan (Kisan Subvention)')}
        </button>
      </div>

      {/* FORM: Study Loan */}
      {loanTab === 'Study' && (
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Education / Study Credit Application')}</h3>
          <form onSubmit={handleStudySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Student / Applicant Name')}</label>
                <input
                  type="text"
                  value={studyForm.applicant}
                  onChange={(e) => setStudyForm({ ...studyForm, applicant: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Educational Institution / University')}</label>
                <input
                  type="text"
                  value={studyForm.institute}
                  onChange={(e) => setStudyForm({ ...studyForm, institute: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Course Name & Specialization')}</label>
                <input
                  type="text"
                  value={studyForm.course}
                  onChange={(e) => setStudyForm({ ...studyForm, course: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Course Duration')}</label>
                <input
                  type="text"
                  value={studyForm.duration}
                  onChange={(e) => setStudyForm({ ...studyForm, duration: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Required Loan Amount (₹)')}</label>
                <input
                  type="number"
                  value={studyForm.amount}
                  onChange={(e) => setStudyForm({ ...studyForm, amount: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#1478F2] font-mono font-bold focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Guarantor Name & Relation')}</label>
                <input
                  type="text"
                  value={studyForm.guarantor}
                  onChange={(e) => setStudyForm({ ...studyForm, guarantor: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="blue-btn px-8 py-3 rounded-xl text-xs flex items-center gap-2">
                <Send className="w-4 h-4" /> {t('Submit Study Loan Request')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FORM: Agri Loan */}
      {loanTab === 'Agri' && (
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('Kisan Agricultural Subsidized Credit Application')}</h3>
          <form onSubmit={handleAgriSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Farmer Applicant Name')}</label>
                <input
                  type="text"
                  value={agriForm.applicant}
                  onChange={(e) => setAgriForm({ ...agriForm, applicant: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Land Survey / Gut Number')}</label>
                <input
                  type="text"
                  value={agriForm.surveyNo}
                  onChange={(e) => setAgriForm({ ...agriForm, surveyNo: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Land Acreage (Acres)')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={agriForm.acreage}
                  onChange={(e) => setAgriForm({ ...agriForm, acreage: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Crop Season')}</label>
                <select
                  value={agriForm.season}
                  onChange={(e) => setAgriForm({ ...agriForm, season: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#1478F2]"
                >
                  <option value="Kharif">Kharif (Monsoon Season)</option>
                  <option value="Rabi">Rabi (Winter Season)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1">{t('Required Loan Credit (₹)')}</label>
                <input
                  type="number"
                  value={agriForm.amount}
                  onChange={(e) => setAgriForm({ ...agriForm, amount: e.target.value })}
                  className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl px-4 py-2.5 text-xs text-[#1478F2] font-mono font-bold focus:outline-none focus:border-[#1478F2]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="blue-btn px-8 py-3 rounded-xl text-xs flex items-center gap-2">
                <Send className="w-4 h-4" /> {t('Submit Agri Loan Request')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Submitted Loans Pipeline */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-[#111827] border-b border-[#E5EAF1] pb-3">{t('My Loan Applications Pipeline (Staff Review → Admin Final Decision)')}</h3>

        <div className="space-y-3 font-mono text-xs">
          {studyLoans.map(l => (
            <div key={l._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#111827] flex items-center gap-2 font-sans">
                  <GraduationCap className="w-4 h-4 text-[#1478F2]" /> Study Loan: {l.course} ({l.institute})
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Staff Note: {l.staffNote || 'Awaiting Staff Review'}</div>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-sans font-bold ${
                l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                l.status === 'Staff Recommended' ? 'bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30' :
                'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {l.status}
              </span>
            </div>
          ))}

          {agriLoans.map(l => (
            <div key={l._id} className="p-4 rounded-xl bg-[#F6F9FD] border border-[#E5EAF1] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#111827] flex items-center gap-2 font-sans">
                  <Sprout className="w-4 h-4 text-[#22C55E]" /> Agri Loan: {l.season} Crop ({l.surveyNo})
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1">Amount: ₹{l.amount.toLocaleString('en-IN')} • Subsidized Rate: 4.0% • Staff Note: {l.staffNote || 'Awaiting Staff Review'}</div>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-sans font-bold ${
                l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                l.status === 'Staff Recommended' ? 'bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30' :
                'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
