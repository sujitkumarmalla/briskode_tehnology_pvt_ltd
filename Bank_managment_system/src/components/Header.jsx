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
    <header className="h-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left Title & Status */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            ApexBank Enterprise Portal
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Core System Operational
            </span>
            <span>•</span>
            <span className="font-mono text-slate-400">{time}</span>
          </div>
        </div>
      </div>

      {/* Center Role Switcher (Tester Pill) */}
      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
        <span className="text-[11px] font-bold text-slate-400 px-3 uppercase tracking-wider flex items-center gap-1">
          <UserCheck className="w-3.5 h-3.5 text-white" /> Role:
        </span>
        {['Admin', 'Staff', 'Customer'].map(role => (
          <button
            key={role}
            onClick={() => handleRoleSwitch(role)}
            className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${
              user?.role === role
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Right Actions: Language Selector ONLY for User Dashboard + Home & Logout */}
      <div className="flex items-center gap-4">
        {/* Language Selector visible ONLY on User Dashboard */}
        {isCustomer && <LanguageSelector />}

        <button
          onClick={onReturnHome}
          className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold"
          title="Return to Public Home"
        >
          <Home className="w-4 h-4 text-slate-300" /> Home
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="w-9 h-9 rounded-full bg-white text-slate-950 font-extrabold text-sm flex items-center justify-center">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-white">{user?.name}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{user?.role}</div>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all ml-2"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
