import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';

// Admin Modules
import { AdminLoanApprovalModule } from '../modules/admin/AdminLoanApprovalModule';
import { AdminUsersModule } from '../modules/admin/AdminUsersModule';
import { AdminHealthModule } from '../modules/admin/AdminHealthModule';
import { AdminAuditModule } from '../modules/admin/AdminAuditModule';
import { AdminRbiModule } from '../modules/admin/AdminRbiModule';

// Staff Modules
import { StaffPassingModule } from '../modules/staff/StaffPassingModule';
import { StaffKycModule } from '../modules/staff/StaffKycModule';
import { StaffLoanForwardModule } from '../modules/staff/StaffLoanForwardModule';
import { StaffVaultModule } from '../modules/staff/StaffVaultModule';

// Customer Modules
import { CustomerAccountsModule } from '../modules/customer/CustomerAccountsModule';
import { CustomerTransferModule } from '../modules/customer/CustomerTransferModule';
import { CustomerLoansModule } from '../modules/customer/CustomerLoansModule';
import { CustomerCardModule } from '../modules/customer/CustomerCardModule';
import { CustomerCalcsModule } from '../modules/customer/CustomerCalcsModule';

export const DashboardPage = ({ onReturnHome }) => {
  const { user } = useAuth();
  const currentRole = user?.role || 'Customer';

  const getDefaultModuleForRole = (role) => {
    if (role === 'Admin') return 'admin-loans';
    if (role === 'Staff') return 'staff-passing';
    return 'customer-accounts';
  };

  const [activeModule, setActiveModule] = useState(getDefaultModuleForRole(currentRole));

  useEffect(() => {
    setActiveModule(getDefaultModuleForRole(currentRole));
  }, [currentRole]);

  const renderModule = () => {
    switch (activeModule) {
      // Admin Modules
      case 'admin-loans': return <AdminLoanApprovalModule />;
      case 'admin-users': return <AdminUsersModule />;
      case 'admin-health': return <AdminHealthModule />;
      case 'admin-audit': return <AdminAuditModule />;
      case 'admin-rbi':
      case 'compliance':
      case 'rbi-compliance':
      case 'rbi':
        return <AdminRbiModule />;

      // Staff Modules
      case 'staff-passing': return <StaffPassingModule />;
      case 'staff-kyc': return <StaffKycModule />;
      case 'staff-loan-forward': return <StaffLoanForwardModule />;
      case 'staff-vault': return <StaffVaultModule />;

      // Customer Modules
      case 'customer-accounts': return <CustomerAccountsModule />;
      case 'customer-transfer': return <CustomerTransferModule />;
      case 'customer-loans': return <CustomerLoansModule />;
      case 'customer-card': return <CustomerCardModule />;
      case 'customer-calcs': return <CustomerCalcsModule />;

      default:
        if (currentRole === 'Admin') return <AdminLoanApprovalModule />;
        if (currentRole === 'Staff') return <StaffPassingModule />;
        return <CustomerAccountsModule />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#EBF0F5] text-[#0F172A]">
      {/* Fixed Responsive Sidebar */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#EBF0F5] max-w-full overflow-x-hidden">
        {/* Sticky Header */}
        <Header activeModule={activeModule} onReturnHome={onReturnHome} onRoleChange={(r) => setActiveModule(getDefaultModuleForRole(r))} />

        {/* Dynamic Module View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
