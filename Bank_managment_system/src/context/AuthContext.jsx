import React, { createContext, useContext, useState } from 'react';
import { getTranslation } from '../utils/translations';

const AuthContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const t = (key) => getTranslation(currentLang, key);

  const [user, setUser] = useState({
    id: 'u3',
    name: 'Rajesh Kumar',
    email: 'customer@apexbank.com',
    accountNo: '1000982341',
    ifscCode: 'APEX0009821',
    role: 'Customer',
    kycStatus: 'Verified'
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [pendingOtpTarget, setPendingOtpTarget] = useState(null);

  // Synchronized Banking State Across Roles (All values in ₹ Indian Rupees)
  const [accounts, setAccounts] = useState([
    { accountNo: '1000982341', ifscCode: 'APEX0009821', userName: 'Rajesh Kumar', type: 'Savings Account', balance: 254800, status: 'Active' },
    { accountNo: '1000982342', ifscCode: 'APEX0009821', userName: 'Rajesh Kumar', type: 'Fixed Deposit (FD)', balance: 1200000, status: 'Active' },
    { accountNo: '1000982343', ifscCode: 'APEX0009821', userName: 'Anita Desai', type: 'Current Account', balance: 45000, status: 'Active' }
  ]);

  const [transactions, setTransactions] = useState([
    { _id: 'tx_101', fromAcc: '1000982341', toAcc: '1000982343', amount: 25000, mode: 'IMPS', status: 'Pending Staff Approval', timestamp: '2026-08-25 11:30 AM', initiatedBy: 'Rajesh Kumar', remarks: 'Vendor Procurement' }
  ]);

  const [studyLoans, setStudyLoans] = useState([
    { _id: 'sl_1', applicant: 'Rajesh Kumar', accountNo: '1000982341', institute: 'IIT Bombay', course: 'M.Tech AI & Data Science', duration: '2 Years', amount: 800000, status: 'Submitted', staffNote: '' }
  ]);

  const [agriLoans, setAgriLoans] = useState([
    { _id: 'al_1', applicant: 'Rajesh Kumar', accountNo: '1000982341', surveyNo: 'SY-8892/A', acreage: 12.5, season: 'Kharif', amount: 350000, netRate: 4.0, status: 'Submitted', staffNote: '' }
  ]);

  const [kycQueue, setKycQueue] = useState([
    { _id: 'u4', name: 'Anita Desai', email: 'anita@apexbank.com', idType: 'Voter ID', idNumber: 'VOT987654', date: '2026-08-24', accountNo: '1000982343', ifscCode: 'APEX0009821' }
  ]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  const switchRole = (newRole) => {
    let name = 'Vikram Sharma';
    let email = 'admin@apexbank.com';
    let accountNo = 'ADMIN-001';
    let ifscCode = 'APEX0009821';
    let id = 'u1';

    if (newRole === 'Staff') {
      name = 'Priya Patel (Branch Manager)';
      email = 'staff@apexbank.com';
      accountNo = 'STAFF-002';
      id = 'u2';
    } else if (newRole === 'Customer') {
      name = 'Rajesh Kumar (Account Holder)';
      email = 'customer@apexbank.com';
      accountNo = '1000982341';
      id = 'u3';
    }

    setUser({ id, name, email, accountNo, ifscCode, role: newRole, kycStatus: 'Verified' });
  };

  const verifyLoginOtp = (otpCode) => {
    if (!pendingOtpTarget) return;
    const { email, accountNo, ifscCode, role } = pendingOtpTarget;

    let name = 'Rajesh Kumar';
    if (role === 'Admin') name = 'Vikram Sharma (Admin)';
    else if (role === 'Staff') name = 'Priya Patel (Staff)';

    setUser({
      id: 'u_' + Date.now(),
      name,
      email: email || `${accountNo}@apexbank.com`,
      accountNo: accountNo || '1000982341',
      ifscCode: ifscCode || 'APEX0009821',
      role,
      kycStatus: 'Verified'
    });
    setIsAuthenticated(true);
    setPendingOtpTarget(null);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Banking State Handlers
  const addTransaction = (tx) => setTransactions([tx, ...transactions]);

  const approveTransactionByStaff = (txId) => {
    setTransactions(prev => prev.map(t => {
      if (t._id === txId) {
        setAccounts(accs => accs.map(a => {
          if (a.accountNo === t.fromAcc) return { ...a, balance: a.balance - t.amount };
          if (a.accountNo === t.toAcc) return { ...a, balance: a.balance + t.amount };
          return a;
        }));
        return { ...t, status: 'Completed (Staff Approved)' };
      }
      return t;
    }));
  };

  const addStudyLoan = (loan) => setStudyLoans([loan, ...studyLoans]);
  const addAgriLoan = (loan) => setAgriLoans([loan, ...agriLoans]);

  const staffRecommendLoan = (type, id, note) => {
    if (type === 'Study') {
      setStudyLoans(prev => prev.map(l => l._id === id ? { ...l, status: 'Staff Recommended', staffNote: note } : l));
    } else {
      setAgriLoans(prev => prev.map(l => l._id === id ? { ...l, status: 'Staff Recommended', staffNote: note } : l));
    }
  };

  const adminFinalApproveLoan = (type, id, decision) => {
    if (type === 'Study') {
      setStudyLoans(prev => prev.map(l => l._id === id ? { ...l, status: decision } : l));
    } else {
      setAgriLoans(prev => prev.map(l => l._id === id ? { ...l, status: decision } : l));
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentLang,
      setCurrentLang,
      t,
      user,
      authModalOpen,
      authMode,
      pendingOtpTarget,
      setPendingOtpTarget,
      openAuthModal,
      closeAuthModal,
      switchRole,
      verifyLoginOtp,
      logout,
      accounts,
      transactions,
      addTransaction,
      approveTransactionByStaff,
      studyLoans,
      addStudyLoan,
      agriLoans,
      addAgriLoan,
      staffRecommendLoan,
      adminFinalApproveLoan,
      kycQueue,
      setKycQueue
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
