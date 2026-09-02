import React, { useState } from 'react';
import { Users, ShieldAlert, Lock, Unlock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminUsersModule = () => {
  const { t } = useAuth();
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
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#111827]">
      {/* Banner */}
      <div 
        className="p-6 rounded-2xl flex items-center justify-between text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1478F2, #0D5FC4)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white backdrop-blur-md">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{t('User & Role Administration Desk')}</h2>
            <p className="text-xs text-blue-100">{t('Executive Controller Module: Privilege Elevation, Role Management & PIN Lockout Overrides')}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md">
          {t('Admin Privilege Level 0')}
        </span>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
        </div>
      )}

      {/* Users Table */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5EAF1] pb-3">
          <h3 className="text-sm font-bold text-[#111827]">{t('Registered User Master Ledger')}</h3>
          <span className="text-xs text-[#6B7280]">Total System Users: {users.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#111827]">
            <thead className="bg-[#F6F9FD] text-[#6B7280] uppercase font-bold text-[11px] tracking-wider border-b border-[#E5EAF1]">
              <tr>
                <th className="p-3">{t('User Name')}</th>
                <th className="p-3">{t('Email Address')}</th>
                <th className="p-3">{t('Assigned Role')}</th>
                <th className="p-3">{t('Lockout Status')}</th>
                <th className="p-3 text-right">{t('Security Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF1] font-mono">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-[#F6F9FD]">
                  <td className="p-3 font-sans font-bold text-[#111827]">{u.name}</td>
                  <td className="p-3 text-[#6B7280]">{u.email}</td>
                  <td className="p-3 font-sans">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                      className="bg-[#F6F9FD] border border-[#E5EAF1] text-xs text-[#111827] font-bold rounded px-2.5 py-1 focus:outline-none focus:border-[#1478F2]"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </td>
                  <td className="p-3 font-sans">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      u.locked ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-right font-sans">
                    <button
                      onClick={() => toggleLock(u.id)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                        u.locked
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      {u.locked ? t('Override & Unlock') : t('Lock User')}
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
