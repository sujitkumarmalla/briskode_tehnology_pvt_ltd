import React from 'react';
import { Landmark, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';

export const Navbar = () => {
  const { openAuthModal, t } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-6 lg:px-12 h-20 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-950 shadow-lg font-bold">
          <Landmark className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl text-white tracking-tight">{t('brandName')}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/20">
              ENT
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide">Enterprise Core System</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
        <a href="#about" className="hover:text-white transition-colors">{t('navAbout')}</a>
        <a href="#roles" className="hover:text-white transition-colors">{t('navRoles')}</a>
        <a href="#compliance" className="hover:text-white transition-colors">{t('navCompliance')}</a>
      </nav>

      {/* Language Selector & Auth Actions */}
      <div className="flex items-center gap-3">
        <LanguageSelector />

        <button
          onClick={() => openAuthModal('login')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 flex items-center gap-1.5 transition-all"
        >
          <LogIn className="w-4 h-4 text-white" /> {t('portalLogin')}
        </button>
        <button
          onClick={() => openAuthModal('register')}
          className="white-btn px-5 py-2 rounded-xl text-xs font-extrabold text-slate-950 flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" /> {t('openAccount')}
        </button>
      </div>
    </header>
  );
};
