import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  UserCheck,
  Building2,
  Calendar,
  BedDouble,
  Pill,
  FlaskConical,
  Receipt,
  FileText,
  Settings,
  UserPlus,
  Clock,
  ClipboardList,
  AlertTriangle,
  TestTube,
  User,
  LogOut,
  ShieldCheck,
  Microscope,
  FileSpreadsheet
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, role, logout } = useAuth();

  const roleUpper = role?.toUpperCase() || "";

  const menuConfig = {
    ADMIN: [
      { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Doctors", path: "/admin/doctors", icon: Stethoscope },
      { name: "Staff", path: "/admin/staff", icon: Users },
      { name: "Patients", path: "/admin/patients", icon: UserCheck },
      { name: "Departments", path: "/admin/departments", icon: Building2 },
      { name: "Appointments", path: "/admin/appointments", icon: Calendar },
      { name: "Beds & Wards", path: "/admin/beds", icon: BedDouble },
      { name: "Pharmacy", path: "/admin/pharmacy", icon: Pill },
      { name: "Laboratory", path: "/admin/laboratory", icon: FlaskConical },
      { name: "Billing", path: "/admin/billing", icon: Receipt },
      { name: "Reports", path: "/admin/reports", icon: FileText },
      { name: "Settings", path: "/admin/settings", icon: Settings }
    ],
    DOCTOR: [
      { name: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
      { name: "Appointments", path: "/doctor/appointments", icon: Calendar },
      { name: "My Patients", path: "/doctor/patients", icon: UserCheck },
      { name: "Consultation", path: "/doctor/consultations", icon: Stethoscope },
      { name: "Prescriptions", path: "/doctor/prescriptions", icon: Pill },
      { name: "Lab Requests", path: "/doctor/lab-requests", icon: FlaskConical },
      { name: "Medical Records", path: "/doctor/medical-records", icon: ClipboardList },
      { name: "Follow-ups", path: "/doctor/follow-ups", icon: Clock },
      { name: "Profile", path: "/doctor/profile", icon: User }
    ],
    RECEPTIONIST: [
      { name: "Dashboard", path: "/receptionist/dashboard", icon: LayoutDashboard },
      { name: "Register Patient", path: "/receptionist/register-patient", icon: UserPlus },
      { name: "Patients", path: "/receptionist/patients", icon: UserCheck },
      { name: "Appointments", path: "/receptionist/appointments", icon: Calendar },
      { name: "Check-In", path: "/receptionist/check-in", icon: Clock },
      { name: "Check-Out", path: "/receptionist/check-out", icon: Receipt },
      { name: "Doctor Schedule", path: "/receptionist/doctors", icon: Stethoscope },
      { name: "Beds", path: "/receptionist/beds", icon: BedDouble },
      { name: "Billing", path: "/receptionist/billing", icon: Receipt },
      { name: "Profile", path: "/receptionist/profile", icon: User }
    ],
    PHARMACIST: [
      { name: "Dashboard", path: "/pharmacy/dashboard", icon: LayoutDashboard },
      { name: "Prescriptions", path: "/pharmacy/prescriptions", icon: FileText },
      { name: "Medicines", path: "/pharmacy/medicines", icon: Pill },
      { name: "Inventory", path: "/pharmacy/inventory", icon: ClipboardList },
      { name: "Sales", path: "/pharmacy/sales", icon: Receipt },
      { name: "Low Stock", path: "/pharmacy/low-stock", icon: AlertTriangle },
      { name: "Expiry", path: "/pharmacy/expiry", icon: Clock },
      { name: "Reports", path: "/pharmacy/reports", icon: FileSpreadsheet },
      { name: "Profile", path: "/pharmacy/profile", icon: User }
    ],
    LABORATORY: [
      { name: "Dashboard", path: "/laboratory/dashboard", icon: LayoutDashboard },
      { name: "Test Requests", path: "/laboratory/test-requests", icon: FlaskConical },
      { name: "Sample Collection", path: "/laboratory/samples", icon: TestTube },
      { name: "Processing", path: "/laboratory/processing", icon: Microscope },
      { name: "Results", path: "/laboratory/results", icon: FileText },
      { name: "Reports", path: "/laboratory/reports", icon: FileSpreadsheet },
      { name: "Test Catalog", path: "/laboratory/test-catalog", icon: ClipboardList },
      { name: "Billing", path: "/laboratory/billing", icon: Receipt },
      { name: "Profile", path: "/laboratory/profile", icon: User }
    ]
  };

  const navItems = menuConfig[roleUpper] || [];

  const roleColors = {
    ADMIN: "bg-purple-600 text-purple-100",
    DOCTOR: "bg-blue-600 text-blue-100",
    RECEPTIONIST: "bg-teal-600 text-teal-100",
    PHARMACIST: "bg-emerald-600 text-emerald-100",
    LABORATORY: "bg-indigo-600 text-indigo-100"
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col justify-between border-r border-slate-800 shadow-2xl`}
    >
      <div>
        {/* Briskode Hospital Header Logo */}
        <div className="flex items-center justify-center px-6 py-5 border-b border-slate-800 bg-slate-950/60">
          <img
            src="/briskode_logo.png"
            alt="Briskode Hospital Logo"
            className="h-12 bg-white p-1.5 rounded-2xl shadow-md object-contain"
          />
        </div>

        {/* User Emp ID Badge */}
        <div className="mx-4 mt-5 p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-center gap-3.5">
          <img
            src={user?.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"}
            alt={user?.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-slate-600 shadow-sm"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${roleColors[roleUpper] || "bg-slate-700 text-slate-200"}`}>
                {roleUpper}
              </span>
              <span className="text-[10px] text-slate-400 font-mono font-semibold">{user?.empId}</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="px-4 py-5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-230px)] custom-scrollbar">
          <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-3">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80"
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-5 border-t border-slate-800 bg-slate-950/60">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 px-4 py-3 text-xs font-extrabold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 rounded-xl transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Account</span>
        </button>
      </div>
    </aside>
  );
}
