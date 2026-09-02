import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Landmark, ArrowRight, X, Smartphone, RefreshCw } from 'lucide-react';

export const OtpModal = ({ isOpen, onClose, onVerify, title = 'Security OTP Verification', subtitle = 'Enter 6-Digit OTP sent to your registered mobile/email' }) => {
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setOtp(['1', '2', '3', '4', '5', '6']);
    setTimer(60);
    setError(null);

    const countdown = setInterval(() => {
      setTimer(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (val, idx) => {
    const nextOtp = [...otp];
    nextOtp[idx] = val.slice(-1);
    setOtp(nextOtp);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter complete 6-digit OTP code.');
      return;
    }
    onVerify(otpCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white border border-[#E5EAF1] rounded-3xl p-8 shadow-2xl relative space-y-6 text-center text-[#111827]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-[#F6F9FD] text-[#6B7280] hover:text-[#111827] hover:bg-[#EAF4FF]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#1478F2] text-white flex items-center justify-center mx-auto shadow-lg">
          <Landmark className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-[#111827]">{title}</h3>
          <p className="text-xs text-[#6B7280] mt-1">{subtitle}</p>
        </div>

        {/* Demo OTP Hint Pill */}
        <div className="p-3 rounded-xl bg-[#F6F9FD] border border-[#1478F2]/30 text-xs text-[#1478F2] font-mono flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-sans font-semibold"><ShieldCheck className="w-4 h-4 text-[#1478F2]" /> Demo Security OTP:</span>
          <span className="font-extrabold text-[#0D5FC4] text-sm bg-[#EAF4FF] px-2 py-0.5 rounded border border-[#1478F2]/40">123456</span>
        </div>

        <form onSubmit={handleConfirm} className="space-y-6">
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                className="w-9 sm:w-11 h-10 sm:h-12 text-center text-base sm:text-lg font-bold font-mono bg-[#EBF0F5] border border-[#D1D5DB] rounded-xl text-[#0F172A] focus:border-[#1478F2] focus:outline-none"
              />
            ))}
          </div>

          {error && <div className="text-xs text-red-600 font-bold">{error}</div>}

          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <span>Resend OTP in: <strong className="text-[#111827] font-mono">{timer}s</strong></span>
            {timer === 0 && (
              <button
                type="button"
                onClick={() => setTimer(60)}
                className="text-[#1478F2] font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Resend
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full blue-btn py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
          >
            Verify OTP &amp; Continue <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
