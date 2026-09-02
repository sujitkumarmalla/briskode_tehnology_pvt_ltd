import React, { useState, useEffect } from 'react';
import { UserCheck, LogOut, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';

export const Header = ({ activeModule, onReturnHome, onRoleChange }) => {
  const { user, switchRole, logout } = useAuth();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
    if (onRoleChange) onRoleChange(newRole);
  };

  const isCustomer = user?.role === 'Customer';

  return (
    <header className="min-h-[5rem] py-3 bg-white/95 backdrop-blur-md border-b border-[#D1D5DB] px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between sticky top-0 z-40 gap-3 shadow-sm">
      {/* Left Title & Status */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            ApexBank Enterprise Portal
          </h2>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#475569] mt-0.5">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Operational
            </span>
            <span>•</span>
            <span className="font-mono">{time}</span>
          </div>
        </div>
      </div>

      {/* Center Role Switcher (Tester Pill) */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#EBF0F5] p-1.5 rounded-2xl border border-[#D1D5DB] shadow-inner overflow-x-auto max-w-full">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#475569] px-2 sm:px-3 uppercase tracking-wider flex items-center gap-1 shrink-0">
          <UserCheck className="w-3.5 h-3.5 text-[#1478F2]" /> Role:
        </span>
        {['Admin', 'Staff', 'Customer'].map(role => (
          <button
            key={role}
            onClick={() => handleRoleSwitch(role)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
              user?.role === role
                ? 'bg-[#1478F2] text-white shadow-md'
                : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#EAF4FF]'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Right Actions: Language Selector ONLY for User Dashboard + Home & Logout */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Language Selector visible ONLY on User Dashboard */}
        {isCustomer && <LanguageSelector />}

        <button
          onClick={onReturnHome}
          className="px-3 py-1.5 rounded-xl bg-[#EBF0F5] text-[#0F172A] border border-[#D1D5DB] hover:bg-[#EAF4FF] hover:text-[#1478F2] hover:border-[#1478F2] transition-all flex items-center gap-1.5 text-xs font-bold"
          title="Return to Public Home"
        >
          <Home className="w-4 h-4 text-[#1478F2]" /> <span className="hidden sm:inline">Home</span>
        </button>

        <div className="flex items-center gap-2.5 pl-2 sm:pl-4 border-l border-[#D1D5DB]">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1478F2] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-md shrink-0">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-[#0F172A] truncate max-w-[100px]">{user?.name}</div>
            <div className="text-[10px] text-[#475569] font-semibold uppercase tracking-wider">{user?.role}</div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 sm:p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all ml-1 sm:ml-2"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
