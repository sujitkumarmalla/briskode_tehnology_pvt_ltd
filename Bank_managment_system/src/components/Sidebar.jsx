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
    <>
      {/* Desktop Vertical Sidebar (md:flex) */}
      <aside className="hidden md:flex w-72 bg-[#0968D7] border-r border-[#0D5FC4] text-white flex-col h-screen sticky top-0 z-30 select-none shadow-xl shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0968D7] flex items-center justify-center shadow-lg font-bold">
            <Landmark className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-lg text-white tracking-tight">ApexBank</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/30">
                ENT
              </span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium">OTP Core System v4.2</p>
          </div>
        </div>

        {/* Active Role Indicator */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-[#0D5FC4]/80 border border-white/15 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-200" />
            <span className="text-xs font-semibold text-blue-100">Active Role:</span>
          </div>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
            currentRole === 'Admin' ? 'bg-red-500/30 text-white border border-red-400/40' :
            currentRole === 'Staff' ? 'bg-amber-500/30 text-white border border-amber-400/40' :
            'bg-white/20 text-white border border-white/30'
          }`}>
            {currentRole}
          </span>
        </div>

        {/* Nav List */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-bold text-blue-200 uppercase tracking-wider">
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
                    ? 'bg-[#EAF4FF] text-[#0D5FC4] shadow-md font-extrabold'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0D5FC4]' : 'text-blue-100'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-[#1478F2] text-white' : 'bg-white/15 text-white border border-white/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#0D5FC4] stroke-[3]" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0D5FC4]/50 text-center">
          <p className="text-[11px] text-white font-bold">Apex Bank Core Engine</p>
          <p className="text-[10px] text-blue-200 font-mono mt-0.5">Blue &amp; White Enterprise Theme</p>
        </div>
      </aside>

      {/* Mobile Horizontal Navigation Bar (md:hidden) */}
      <div className="flex md:hidden bg-[#0968D7] text-white p-3 border-b border-[#0D5FC4] overflow-x-auto gap-2 scrollbar-none sticky top-20 z-30 shadow-md">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                isActive 
                  ? 'bg-[#EAF4FF] text-[#0D5FC4] shadow-sm font-extrabold' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label.split('.')[1] || item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
