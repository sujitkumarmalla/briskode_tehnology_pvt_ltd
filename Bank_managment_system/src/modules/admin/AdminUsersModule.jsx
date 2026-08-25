import React, { useState } from 'react';
import { Users, ShieldAlert, Lock, Unlock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminUsersModule = () => {
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Vikram Sharma', email: 'admin@apexbank.com', role: 'Admin', status: 'Active', locked: false },
    { id: 'u2', name: 'Priya Patel', email: 'staff@apexbank.com', role: 'Staff', status: 'Active', locked: false },
    { id: 'u3', name: 'Rajesh Kumar', email: 'customer@apexbank.com', role: 'Customer', status: 'Active', locked: false },
    { id: 'u4', name: 'Anita Desai', email: 'anita@apexbank.com', role: 'Customer', status: 'Locked Out (Failed PIN)', locked: true }
  ]);

  const [msg, setMsg] = useState(null);

  const toggleLock = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const isLocked = !u.locked;
        setMsg(isLocked ? `Account ${u.email} has been locked out.` : `Lockout overridden for ${u.email}. Account unlocked!`);
        return {
          ...u,
          locked: isLocked,
          status: isLocked ? 'Locked Out (Failed PIN)' : 'Active'
        };
      }
      return u;
    }));
    setTimeout(() => setMsg(null), 3000);
  };

  const changeRole = (id, newRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    setMsg(`User role updated to ${newRole}`);
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Banner */}
      <div className="glass-card-grey p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">User &amp; Role Administration Desk</h2>
            <p className="text-xs text-slate-300">Executive Controller Module: Privilege Elevation, Role Management &amp; PIN Lockout Overrides</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
          Admin Privilege Level 0
        </span>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Users Table */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <h3 className="text-sm font-bold text-white">Registered User Master Ledger</h3>
          <span className="text-xs text-slate-400">Total System Users: {users.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Lockout Status</th>
                <th className="p-3 text-right">Security Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-sans font-bold text-white">{u.name}</td>
                  <td className="p-3 text-slate-400">{u.email}</td>
                  <td className="p-3 font-sans">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-xs text-white font-bold rounded px-2.5 py-1"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </td>
                  <td className="p-3 font-sans">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      u.locked ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-sans">
                    <button
                      onClick={() => toggleLock(u.id)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                        u.locked
                          ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                          : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                      }`}
                    >
                      {u.locked ? 'Override & Unlock' : 'Lock User'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
