import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../common/Sidebar";
import TopNavbar from "../common/TopNavbar";

export default function DashboardLayout({ allowedRole, title }) {
  const { user, token, role, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-500">Loading Hospital Portal...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const roleUpper = role?.toUpperCase();
  const allowedUpper = allowedRole?.toUpperCase();

  if (allowedRole && roleUpper !== allowedUpper) {
    const roleRedirects = {
      ADMIN: "/admin/dashboard",
      DOCTOR: "/doctor/dashboard",
      RECEPTIONIST: "/receptionist/dashboard",
      PHARMACIST: "/pharmacy/dashboard",
      LABORATORY: "/laboratory/dashboard"
    };
    return <Navigate to={roleRedirects[roleUpper] || "/login"} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <TopNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title={title} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
