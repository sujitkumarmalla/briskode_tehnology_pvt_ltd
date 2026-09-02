import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Landmark, Mail, Lock, CreditCard, Building2, ArrowRight, ShieldCheck } from 'lucide-react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white border border-[#D1D5DB] rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 overflow-hidden text-[#0F172A] my-auto max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={closeAuthModal}
            className="absolute top-6 right-6 p-2 rounded-xl bg-[#F6F9FD] text-[#6B7280] hover:text-[#111827] hover:bg-[#EAF4FF]"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#1478F2] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Landmark className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#111827]">
              {activeTab === 'login' ? 'OTP Banking Login' : 'Create Banking Profile'}
            </h3>
            <p className="text-xs text-[#6B7280]">Account No + IFSC + 6-Digit OTP Verification</p>
          </div>

          {/* Login / Register Toggle */}
          <div className="flex bg-[#F6F9FD] p-1.5 rounded-xl border border-[#E5EAF1]">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-[#1478F2] text-white shadow' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-[#1478F2] text-white shadow' : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-wider text-center">
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
                      ? 'bg-[#EAF4FF] border-[#1478F2] text-[#1478F2] font-extrabold shadow-sm'
                      : 'bg-[#F6F9FD] border-[#E5EAF1] text-[#6B7280] hover:border-[#1478F2]/50'
                  }`}
                >
                  <div className="text-xs">{item.role}</div>
                  <div className="text-[9px] text-[#6B7280] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form inputs */}
          <form onSubmit={handleInitiateLogin} className="space-y-4">
            {selectedRole === 'Customer' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">10-Digit Account Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 1000982341"
                      value={formData.accountNo}
                      onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                      className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Branch IFSC Code</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. APEX0009821"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                      className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Official Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder={selectedRole === 'Admin' ? 'admin@apexbank.com' : 'staff@apexbank.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-[#F6F9FD] border border-[#E5EAF1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111827] font-mono focus:outline-none focus:border-[#1478F2]"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full blue-btn py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
            >
              Generate OTP &amp; Proceed <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo shortcuts */}
          <div className="pt-4 border-t border-[#E5EAF1] text-center space-y-2">
            <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
              Quick Evaluator Demo OTP Logins
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleQuickDemo('Customer')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#EAF4FF] text-[#1478F2] border border-[#1478F2]/30 hover:bg-[#1478F2] hover:text-white transition-all"
              >
                ⚡ User OTP Login
              </button>
              <button
                onClick={() => handleQuickDemo('Staff')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#F6F9FD] text-[#0D5FC4] border border-[#0D5FC4]/30 hover:bg-[#0D5FC4] hover:text-white transition-all"
              >
                ⚡ Staff OTP Login
              </button>
              <button
                onClick={() => handleQuickDemo('Admin')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-all"
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
