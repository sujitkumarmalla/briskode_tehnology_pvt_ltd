import React, { useState } from 'react';
import { Landmark, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';

export const Navbar = ({ dark = false }) => {
  const { openAuthModal, t } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between transition-all ${
      dark 
        ? 'bg-[#0B132B]/95 backdrop-blur-xl border-b border-blue-500/20 text-white shadow-2xl' 
        : 'bg-white/95 backdrop-blur-xl border-b border-[#D1D5DB] text-[#0F172A] shadow-sm'
    }`}>
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1478F2] flex items-center justify-center text-white shadow-lg font-bold shrink-0">
          <Landmark className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold text-base sm:text-xl tracking-tight ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
              {t('brandName')}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
              ENT
            </span>
          </div>
          <p className={`text-[9px] sm:text-[10px] font-medium tracking-wide ${dark ? 'text-slate-400' : 'text-[#475569]'}`}>
            Enterprise Core System
          </p>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <nav className={`hidden md:flex items-center gap-6 text-xs font-semibold ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>
        <a href="#about" className="hover:text-[#1478F2] transition-colors">{t('navAbout')}</a>
        <a href="#roles" className="hover:text-[#1478F2] transition-colors">{t('navRoles')}</a>
        <a href="#compliance" className="hover:text-[#1478F2] transition-colors">{t('navCompliance')}</a>
      </nav>

      {/* Desktop Language Selector & Auth Actions */}
      <div className="hidden md:flex items-center gap-3">
        <LanguageSelector />

        <button
          onClick={() => openAuthModal('login')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            dark 
              ? 'bg-slate-800/80 border border-slate-700 text-white hover:bg-slate-700' 
              : 'bg-[#EBF0F5] border border-[#D1D5DB] text-[#0F172A] hover:bg-[#EAF4FF] hover:text-[#1478F2]'
          }`}
        >
          <Landmark className="w-4 h-4 text-[#1478F2]" /> {t('portalLogin')}
        </button>
        <button
          onClick={() => openAuthModal('register')}
          className="blue-btn px-5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5"
        >
          <Landmark className="w-4 h-4 text-white" /> {t('openAccount')}
        </button>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <div className="flex md:hidden items-center gap-2">
        <LanguageSelector />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 rounded-xl border transition-all ${
            dark 
              ? 'bg-slate-800 border-slate-700 text-white' 
              : 'bg-[#EBF0F5] border-[#D1D5DB] text-[#0F172A]'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className={`absolute top-20 left-0 right-0 p-5 border-b shadow-2xl md:hidden flex flex-col gap-4 animate-in slide-in-from-top duration-200 ${
          dark 
            ? 'bg-[#0B132B] border-blue-500/30 text-white' 
            : 'bg-white border-[#D1D5DB] text-[#0F172A]'
        }`}>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-bold py-2 border-b border-slate-700/40 hover:text-[#1478F2]"
          >
            {t('navAbout')}
          </a>
          <a
            href="#roles"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-bold py-2 border-b border-slate-700/40 hover:text-[#1478F2]"
          >
            {t('navRoles')}
          </a>
          <a
            href="#compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-bold py-2 border-b border-slate-700/40 hover:text-[#1478F2]"
          >
            {t('navCompliance')}
          </a>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openAuthModal('login'); }}
              className="w-full py-3 rounded-xl text-xs font-bold bg-[#1478F2] text-white flex items-center justify-center gap-2"
            >
              <Landmark className="w-4 h-4" /> {t('portalLogin')}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); openAuthModal('register'); }}
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-[#0D5FC4] text-white flex items-center justify-center gap-2"
            >
              <Landmark className="w-4 h-4" /> {t('openAccount')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
