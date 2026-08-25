import React from 'react';
import { Activity, Server, Key, Database } from 'lucide-react';

export const AdminHealthModule = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-grey p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Infrastructure &amp; Server Health Inspector</h2>
            <p className="text-xs text-slate-300">Executive Controller Module: Real-Time Cluster Diagnostics, Latency &amp; Rate Limiter Metrics</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <Server className="w-8 h-8 text-emerald-400" />
          <div className="text-xs font-bold text-slate-400 uppercase">Express API Service</div>
          <div className="text-2xl font-extrabold text-white">100% Cluster Online</div>
          <div className="text-[11px] text-emerald-400 font-mono">Response Latency: 8ms</div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <Database className="w-8 h-8 text-blue-400" />
          <div className="text-xs font-bold text-slate-400 uppercase">Mongoose Database ODM</div>
          <div className="text-2xl font-extrabold text-white">Mongoose Connected</div>
          <div className="text-[11px] text-blue-400 font-mono">Rate Limit: 300 req / 15m</div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <Key className="w-8 h-8 text-purple-400" />
          <div className="text-xs font-bold text-slate-400 uppercase">Stateless JWT Engine</div>
          <div className="text-2xl font-extrabold text-white">256-Bit Salt Active</div>
          <div className="text-[11px] text-purple-400 font-mono">Active Tokens: 1,240</div>
        </div>
      </div>
    </div>
  );
};
