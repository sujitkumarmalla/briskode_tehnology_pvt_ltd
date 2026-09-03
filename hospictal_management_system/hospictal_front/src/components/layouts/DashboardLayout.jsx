import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../common/Sidebar";
import TopNavbar from "../common/TopNavbar";

export default function DashboardLayout({ allowedRole, title }) {
  const { user, token, role, loading } = useAuth();
  const { isDark } = useTheme();
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
    <div className="relative min-h-screen bg-slate-950 text-slate-800 dark:text-slate-100 flex overflow-x-hidden transition-colors duration-300">
      {/* Background Image Layer with Blur Effect */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('/images/hero.jpg'), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')`
        }}
      >
        {/* Soft glass overlay & blur matching active theme */}
        <div className={`absolute inset-0 transition-all duration-500 backdrop-blur-md ${
          isDark
            ? "bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-slate-950/90"
            : "bg-gradient-to-br from-slate-100/85 via-white/80 to-blue-50/75"
        }`} />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 lg:pl-80 transition-all duration-300">
        <TopNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title={title} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Glass Card Container Wrapper */}
          <div className={`transition-all duration-300 backdrop-blur-xl border shadow-2xl rounded-3xl p-4 sm:p-6 lg:p-8 ${
            isDark
              ? "bg-slate-900/85 border-slate-800/80 text-slate-100 shadow-black/40"
              : "bg-white/85 border-white/60 text-slate-800 shadow-slate-200/50"
          }`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
