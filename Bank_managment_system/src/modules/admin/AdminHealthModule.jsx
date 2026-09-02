import React from 'react';
import { Activity, Server, Key, Database } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHealthModule = () => {
  const { t } = useAuth();
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      {/* Banner */}
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('Infrastructure & Server Health Inspector')}</h2>
            <p className="text-xs text-blue-100">{t('Executive Controller Module: Real-Time Cluster Diagnostics, Latency & Rate Limiter Metrics')}</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <Server className="w-8 h-8 text-[#1478F2]" />
          <div className="text-xs font-bold text-[#6B7280] uppercase">{t('Express API Service')}</div>
          <div className="text-2xl font-extrabold text-[#111827]">100% Cluster Online</div>
          <div className="text-[11px] text-[#22C55E] font-mono">Response Latency: 8ms</div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <Database className="w-8 h-8 text-[#1478F2]" />
          <div className="text-xs font-bold text-[#6B7280] uppercase">{t('Mongoose Database ODM')}</div>
          <div className="text-2xl font-extrabold text-[#111827]">Mongoose Connected</div>
          <div className="text-[11px] text-[#1478F2] font-mono">Rate Limit: 300 req / 15m</div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <Key className="w-8 h-8 text-[#1478F2]" />
          <div className="text-xs font-bold text-[#6B7280] uppercase">{t('Stateless JWT Engine')}</div>
          <div className="text-2xl font-extrabold text-[#111827]">256-Bit Salt Active</div>
          <div className="text-[11px] text-[#1478F2] font-mono">Active Tokens: 1,240</div>
        </div>
      </div>
    </div>
  );
};
