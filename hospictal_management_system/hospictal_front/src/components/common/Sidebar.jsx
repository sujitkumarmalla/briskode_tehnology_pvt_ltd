import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
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
  Microscope,
  FileSpreadsheet
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, role, logout } = useAuth();

  const roleUpper = role?.toUpperCase() || "";

  // Categorized navigation matching modern healthcare dashboard with large readable typography
  const categorizedMenus = {
    ADMIN: [
      {
        category: "MAIN",
        items: [
          { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
          { name: "System Settings", path: "/admin/settings", icon: Settings }
        ]
      },
      {
        category: "CARE & VISITS",
        items: [
          { name: "Doctors", path: "/admin/doctors", icon: Stethoscope },
          { name: "Staff", path: "/admin/staff", icon: Users },
          { name: "Patients", path: "/admin/patients", icon: UserCheck },
          { name: "Appointments", path: "/admin/appointments", icon: Calendar },
          { name: "Beds & Wards", path: "/admin/beds", icon: BedDouble }
        ]
      },
      {
        category: "MEDICAL RECORDS & SERVICES",
        items: [
          { name: "Departments", path: "/admin/departments", icon: Building2 },
          { name: "Pharmacy", path: "/admin/pharmacy", icon: Pill },
          { name: "Laboratory", path: "/admin/laboratory", icon: FlaskConical },
          { name: "Billing", path: "/admin/billing", icon: Receipt },
          { name: "Reports", path: "/admin/reports", icon: FileText }
        ]
      }
    ],
    DOCTOR: [
      {
        category: "MAIN",
        items: [
          { name: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
          { name: "My Profile", path: "/doctor/profile", icon: User }
        ]
      },
      {
        category: "HEALTH & CLINICAL",
        items: [
          { name: "Consultations", path: "/doctor/consultations", icon: Stethoscope },
          { name: "Prescriptions", path: "/doctor/prescriptions", icon: Pill },
          { name: "Lab Requests", path: "/doctor/lab-requests", icon: FlaskConical }
        ]
      },
      {
        category: "CARE & VISITS",
        items: [
          { name: "Appointments", path: "/doctor/appointments", icon: Calendar },
          { name: "My Patients", path: "/doctor/patients", icon: UserCheck },
          { name: "Follow-ups", path: "/doctor/follow-ups", icon: Clock }
        ]
      },
      {
        category: "MEDICAL RECORDS",
        items: [
          { name: "Medical Records", path: "/doctor/medical-records", icon: ClipboardList }
        ]
      }
    ],
    RECEPTIONIST: [
      {
        category: "MAIN",
        items: [
          { name: "Dashboard", path: "/receptionist/dashboard", icon: LayoutDashboard },
          { name: "My Profile", path: "/receptionist/profile", icon: User }
        ]
      },
      {
        category: "CARE & VISITS",
        items: [
          { name: "Register Patient", path: "/receptionist/register-patient", icon: UserPlus },
          { name: "Patients List", path: "/receptionist/patients", icon: UserCheck },
          { name: "Appointments", path: "/receptionist/appointments", icon: Calendar },
          { name: "Check-In Desk", path: "/receptionist/check-in", icon: Clock },
          { name: "Check-Out Desk", path: "/receptionist/check-out", icon: Receipt },
          { name: "Doctor Schedule", path: "/receptionist/doctors", icon: Stethoscope },
          { name: "Beds Allocation", path: "/receptionist/beds", icon: BedDouble }
        ]
      },
      {
        category: "BILLING & RECORDS",
        items: [
          { name: "Billing Desk", path: "/receptionist/billing", icon: Receipt }
        ]
      }
    ],
    PHARMACIST: [
      {
        category: "MAIN",
        items: [
          { name: "Dashboard", path: "/pharmacy/dashboard", icon: LayoutDashboard },
          { name: "My Profile", path: "/pharmacy/profile", icon: User }
        ]
      },
      {
        category: "HEALTH & DISPENSARY",
        items: [
          { name: "Prescriptions", path: "/pharmacy/prescriptions", icon: FileText },
          { name: "Medicines List", path: "/pharmacy/medicines", icon: Pill }
        ]
      },
      {
        category: "INVENTORY & REPORTS",
        items: [
          { name: "Stock Inventory", path: "/pharmacy/inventory", icon: ClipboardList },
          { name: "Sales Counter", path: "/pharmacy/sales", icon: Receipt },
          { name: "Low Stock Alerts", path: "/pharmacy/low-stock", icon: AlertTriangle },
          { name: "Expiry Tracker", path: "/pharmacy/expiry", icon: Clock },
          { name: "Pharmacy Reports", path: "/pharmacy/reports", icon: FileSpreadsheet }
        ]
      }
    ],
    LABORATORY: [
      {
        category: "MAIN",
        items: [
          { name: "Dashboard", path: "/laboratory/dashboard", icon: LayoutDashboard },
          { name: "My Profile", path: "/laboratory/profile", icon: User }
        ]
      },
      {
        category: "HEALTH & DIAGNOSTICS",
        items: [
          { name: "Test Requests", path: "/laboratory/test-requests", icon: FlaskConical },
          { name: "Sample Collection", path: "/laboratory/samples", icon: TestTube },
          { name: "Processing Lab", path: "/laboratory/processing", icon: Microscope },
          { name: "Test Results", path: "/laboratory/results", icon: FileText }
        ]
      },
      {
        category: "RECORDS & CATALOG",
        items: [
          { name: "Lab Reports", path: "/laboratory/reports", icon: FileSpreadsheet },
          { name: "Test Catalog", path: "/laboratory/test-catalog", icon: ClipboardList },
          { name: "Billing Desk", path: "/laboratory/billing", icon: Receipt }
        ]
      }
    ]
  };

  const currentGroups = categorizedMenus[roleUpper] || [];

  const roleBadgeStyles = {
    ADMIN: "bg-purple-100 text-purple-700 border-purple-200",
    DOCTOR: "bg-blue-100 text-blue-700 border-blue-200",
    RECEPTIONIST: "bg-teal-100 text-teal-700 border-teal-200",
    PHARMACIST: "bg-emerald-100 text-emerald-700 border-emerald-200",
    LABORATORY: "bg-indigo-100 text-indigo-700 border-indigo-200"
  };

  const { isDark } = useTheme();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Spacious Clean Solid White Sidebar w-80 */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 shadow-2xl select-none`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo & Branding */}
          <div className="px-7 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <img
                src="/briskode_logo.png"
                alt="Briskode Medicare"
                className="h-10 object-contain bg-white dark:bg-slate-800 p-1 rounded-xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-blue-900 dark:text-blue-400 leading-none">
                  Briskode <span className="text-blue-600 dark:text-blue-400 font-extrabold">Medicare</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">
                  Healthcare Management
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Summary Card */}
          <div className="px-6 py-4 mx-4 mt-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <img
              src={user?.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"}
              alt={user?.name || "User"}
              className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-md flex-shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate leading-snug">
                {user?.name || "Healthcare Staff"}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roleBadgeStyles[roleUpper] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200"}`}>
                  {roleUpper || "USER"}
                </span>
                {user?.empId && (
                  <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-400">
                    #{user.empId}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Categorized Navigation List with Large Simple Font */}
          <nav className="flex-1 px-5 py-5 overflow-y-auto space-y-6 custom-scrollbar bg-white dark:bg-slate-900">
            {currentGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <p className="px-3 text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.category}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[15px] font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold shadow-sm border border-blue-100 dark:border-blue-800/50 scale-[1.01]"
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                          }`
                        }
                      >
                        <Icon className="w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400 transition-colors" />
                        <span className="truncate">{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Sign Out Action */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2.5 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 bg-red-50 dark:bg-red-950/40 hover:bg-red-100/80 dark:hover:bg-red-900/50 border border-red-100 dark:border-red-900/50 rounded-2xl transition-all shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Account</span>
          </button>
        </div>
      </aside>
    </>
  );
}
