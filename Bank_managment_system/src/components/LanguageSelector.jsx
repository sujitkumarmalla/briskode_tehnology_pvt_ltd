import React from 'react';
import { Globe } from 'lucide-react';
import { useAuth, LANGUAGES } from '../context/AuthContext';

export const LanguageSelector = () => {
  const { currentLang, setCurrentLang } = useAuth();

  return (
    <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
      <Globe className="w-3.5 h-3.5 text-lightgreen-400" />
      <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">Lang:</span>
      <select
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
        className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
      >
        {LANGUAGES.map(l => (
          <option key={l.code} value={l.code} className="bg-slate-900 text-white">
            {l.native} ({l.name})
          </option>
        ))}
      </select>
    </div>
  );
};
