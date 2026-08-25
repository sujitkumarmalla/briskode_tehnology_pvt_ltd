import React from 'react';
import { 
  Users, 
  Activity, 
  FileText, 
  Building2, 
  CheckSquare, 
  UserCheck, 
  Sprout, 
  Key, 
  ArrowRightLeft, 
  CreditCard, 
  Calculator, 
  Landmark, 
  ShieldCheck, 
  ChevronRight,
  GraduationCap,
  Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const roleNavigation = {
  Admin: [
    { id: 'admin-loans', label: '1. Executive Loan Approval Portal', icon: ShieldCheck, badge: 'Final Authority' },
    { id: 'admin-users', label: '2. User & Role Administration', icon: Users },
    { id: 'admin-health', label: '3. Infrastructure Health', icon: Activity },
    { id: 'admin-audit', label: '4. Cryptographic Audit Vault', icon: FileText },
    { id: 'admin-rbi', label: '5. RBI Regulatory Engine', icon: Building2 }
  ],
  Staff: [
    { id: 'staff-passing', label: '1. Dual-Control Transfer Desk', icon: CheckSquare, badge: 'Pass Queue' },
    { id: 'staff-kyc', label: '2. KYC & Account No Assignment', icon: UserCheck },
    { id: 'staff-loan-forward', label: '3. Study & Agri Loan Desk', icon: Send },
    { id: 'staff-vault', label: '4. Vault & Safe Locker Ledger', icon: Key }
  ],
  Customer: [
    { id: 'customer-accounts', label: '1. My Accounts & OTP Passbook', icon: FileText },
    { id: 'customer-transfer', label: '2. Fund Transfers (NEFT/IMPS)', icon: ArrowRightLeft },
    { id: 'customer-loans', label: '3. Study & Agri Loan Apply', icon: GraduationCap },
    { id: 'customer-card', label: '4. Digital Card Controls', icon: CreditCard },
    { id: 'customer-calcs', label: '5. Calculators & Wealth', icon: Calculator }
  ]
};

export const Sidebar = ({ activeModule, setActiveModule }) => {
  const { user } = useAuth();
  const currentRole = user?.role || 'Customer';

  const navItems = roleNavigation[currentRole] || roleNavigation.Customer;

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-lightgreen-400 text-slate-950 flex items-center justify-center shadow-lg font-bold">
          <Landmark className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-lg text-white tracking-tight">ApexBank</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-lightgreen-400/20 text-lightgreen-400 border border-lightgreen-400/30">
              ENT
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">OTP Core System v4.2</p>
        </div>
      </div>

      {/* Active Role Indicator */}
      <div className="mx-4 mt-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-lightgreen-400" />
          <span className="text-xs font-semibold text-slate-300">Active Role:</span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
          currentRole === 'Admin' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
          currentRole === 'Staff' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
          'bg-lightgreen-400/20 text-lightgreen-400 border border-lightgreen-400/30'
        }`}>
          {currentRole}
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {currentRole} Modules
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-lightgreen-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-950 text-white' : 'bg-white/10 text-white border border-white/20'
                }`}>
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-center">
        <p className="text-[11px] text-lightgreen-400 font-semibold">OTP Verification Engine</p>
        <p className="text-[10px] text-slate-400 font-mono mt-0.5">Dim Grey &amp; Light Green Theme</p>
      </div>
    </aside>
  );
};
