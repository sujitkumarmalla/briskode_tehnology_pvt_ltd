import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Activity, 
  Key, 
  FileText, 
  Server
} from 'lucide-react';

export const AdminModule = () => {
  const [activeTab, setActiveTab] = useState('Users'); // Users | Health | Audit
=
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Vikram Sharma', email: 'admin@apexbank.com', role: 'Admin', locked: false, status: 'Active' },
    { id: 'u2', name: 'Priya Patel', email: 'staff@apexbank.com', role: 'Staff', locked: false, status: 'Active' },
    { id: 'u3', name: 'Rajesh Kumar', email: 'customer@apexbank.com', role: 'Customer', locked: false, status: 'Active' },
    { id: 'u4', name: 'Anita Desai', email: 'anita@apexbank.com', role: 'Customer', locked: true, status: 'Locked Out (Failed PIN)' }
  ]);

  const toggleLockout = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newLockState = !u.locked;
        return {
          ...u,
          locked: newLockState,
          status: newLockState ? 'Locked Out (Failed PIN)' : 'Active'
        };
      }
      return u;
    }));
  };

  const changeRole = (id, newRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-gold p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">System Administration &amp; Security Portal</h2>
            <p className="text-xs text-slate-400">Core Navigation Module 4: Role-Based Access Control, System Health &amp; Immutable Audit Logs</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
          Admin Privilege Level 0
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('Users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Users' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Role &amp; Lockout Override Management
        </button>
        <button
          onClick={() => setActiveTab('Health')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Health' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" /> Core System Health &amp; Infrastructure
        </button>
        <button
          onClick={() => setActiveTab('Audit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Audit' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Global Security Audit Logs
        </button>
      </div>

      {/* TAB 1: User Management */}
      {activeTab === 'Users' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200">System Users &amp; Role Assignments</h3>
            <span className="text-[11px] text-slate-400">Total Users: {users.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Active Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Lockout Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-slate-100">{u.name}</td>
                    <td className="p-3 font-mono text-slate-400">{u.email}</td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs text-amber-400 font-bold rounded px-2 py-1"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.locked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleLockout(u.id)}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          u.locked
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                        }`}
                      >
                        {u.locked ? 'Override & Unlock' : 'Lock Account'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: System Health */}
      {activeTab === 'Health' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-2">
            <Server className="w-8 h-8 text-emerald-400" />
            <div className="text-xs font-bold text-slate-400">Core React Engine</div>
            <div className="text-xl font-extrabold text-slate-100">100% Operational</div>
            <div className="text-[11px] text-emerald-400">Latency: 4ms • State Sync Active</div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-2">
            <Activity className="w-8 h-8 text-amber-400" />
            <div className="text-xs font-bold text-slate-400">Audit Ledger Engine</div>
            <div className="text-xl font-extrabold text-slate-100">Immutable Active</div>
            <div className="text-[11px] text-amber-400">Double-Entry Ledger Verified</div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-2">
            <Key className="w-8 h-8 text-blue-400" />
            <div className="text-xs font-bold text-slate-400">Security Encryption Layer</div>
            <div className="text-xl font-extrabold text-slate-100">Stateless Session</div>
            <div className="text-[11px] text-blue-400">256-Bit Cryptographic Salt</div>
          </div>
        </div>
      )}

      {/* TAB 3: Audit Logs */}
      {activeTab === 'Audit' && (
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200">Immutable System Transaction &amp; Action Log</h3>
            <span className="text-[11px] text-amber-400">Cryptographically Chained Records</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {[
              { id: 'LOG-8821', time: '2026-08-25 11:12:00', actor: 'Vikram Sharma (Admin)', action: 'Lockout Override executed on Account u4', ip: '192.168.1.1' },
              { id: 'LOG-8820', time: '2026-08-25 10:45:12', actor: 'System Passing Engine', action: 'Approved High-Value Transfer #t1 ($25,000)', ip: '127.0.0.1' },
              { id: 'LOG-8819', time: '2026-08-25 09:30:00', actor: 'Priya Patel (Staff)', action: 'AgriLoan #l1 Disbursed ($350,000)', ip: '192.168.1.4' }
            ].map(log => (
              <div key={log.id} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold">[{log.id}]</span> <span className="text-slate-400">{log.time}</span> - <span className="text-slate-200 font-semibold">{log.actor}</span>: {log.action}
                </div>
                <span className="text-[10px] text-slate-500">{log.ip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
