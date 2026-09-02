import React from 'react';
import { Globe } from 'lucide-react';
import { useAuth, LANGUAGES } from '../context/AuthContext';

export const LanguageSelector = () => {
  const { currentLang, setCurrentLang } = useAuth();

  return (
    <div className="flex items-center gap-1.5 bg-[#F6F9FD] px-3 py-1.5 rounded-xl border border-[#E5EAF1] text-xs shadow-sm">
      <Globe className="w-3.5 h-3.5 text-[#1478F2]" />
      <span className="text-[11px] font-bold text-[#6B7280] hidden sm:inline">Lang:</span>
      <select
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
        className="bg-transparent text-[#111827] font-bold focus:outline-none cursor-pointer text-xs"
      >
        {LANGUAGES.map(l => (
          <option key={l.code} value={l.code} className="bg-white text-[#111827]">
            {l.native} ({l.name})
          </option>
        ))}
      </select>
    </div>
  );
};
