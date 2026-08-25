import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Key, Mail, Lock, CreditCard, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OtpModal } from './OtpModal';

export const AuthModal = () => {
  const { authModalOpen, authMode, closeAuthModal, setPendingOtpTarget, verifyLoginOtp } = useAuth();

  const [activeTab, setActiveTab] = useState(authMode || 'login');
  const [selectedRole, setSelectedRole] = useState('Customer');
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [formData, setFormData] = useState({
    accountNo: '1000982341',
    ifscCode: 'APEX0009821',
    email: 'customer@apexbank.com',
    password: 'password123'
  });

  if (!authModalOpen) return null;

  const handleInitiateLogin = (e) => {
    e.preventDefault();
    setPendingOtpTarget({
      accountNo: formData.accountNo,
      ifscCode: formData.ifscCode,
      email: formData.email,
      role: selectedRole
    });
    setShowOtpModal(true);
  };

  const handleQuickDemo = (role) => {
    setSelectedRole(role);
    const targetPayload = {
      accountNo: role === 'Customer' ? '1000982341' : `${role.toUpperCase()}-001`,
      ifscCode: 'APEX0009821',
      email: `${role.toLowerCase()}@apexbank.com`,
      role
    };
    setPendingOtpTarget(targetPayload);
    setShowOtpModal(true);
  };

  const handleOtpVerified = (otpCode) => {
    setShowOtpModal(false);
    verifyLoginOtp(otpCode);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-8 shadow-2xl relative space-y-6 overflow-hidden"
        >
          <button
            onClick={closeAuthModal}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-lightgreen-400/20 border border-lightgreen-400/40 text-lightgreen-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-lightgreen-400/10">
              <Key className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {activeTab === 'login' ? 'OTP Banking Login' : 'Create Banking Profile'}
            </h3>
            <p className="text-xs text-slate-400">Account No + IFSC + 6-Digit OTP Verification</p>
          </div>

          {/* Login / Register Toggle */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-white text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-white text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Select Role Workspace
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'Customer', desc: 'Account Holder' },
                { role: 'Staff', desc: 'Branch Officer' },
                { role: 'Admin', desc: 'System Executive' }
              ].map(item => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => setSelectedRole(item.role)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedRole === item.role
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs">{item.role}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form inputs */}
          <form onSubmit={handleInitiateLogin} className="space-y-4">
            {selectedRole === 'Customer' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">10-Digit Account Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 1000982341"
                      value={formData.accountNo}
                      onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Branch IFSC Code</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. APEX0009821"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Official Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder={selectedRole === 'Admin' ? 'admin@apexbank.com' : 'staff@apexbank.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full green-btn py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              Generate OTP &amp; Proceed <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo shortcuts */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Quick Evaluator Demo OTP Logins
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleQuickDemo('Customer')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
              >
                ⚡ User OTP Login
              </button>
              <button
                onClick={() => handleQuickDemo('Staff')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
              >
                ⚡ Staff OTP Login
              </button>
              <button
                onClick={() => handleQuickDemo('Admin')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
              >
                ⚡ Admin OTP Login
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerified}
        title={`OTP Verification (${selectedRole})`}
        subtitle={selectedRole === 'Customer' ? `Enter 6-digit OTP sent for Account ${formData.accountNo}` : `Enter 6-digit OTP sent to ${formData.email}`}
      />
    </>
  );
};
