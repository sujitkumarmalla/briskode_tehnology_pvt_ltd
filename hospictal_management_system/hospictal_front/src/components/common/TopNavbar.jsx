import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";
import { Menu, Bell, User, LogOut, CheckCheck, Search, Moon, Sun, ChevronDown } from "lucide-react";

export default function TopNavbar({ onMenuToggle, title }) {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Portal</span>
            <span>&gt;</span>
            <span className="text-slate-800 dark:text-slate-100 font-bold truncate">{title || "Dashboard"}</span>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md items-center relative">
        <Search className="w-4 h-4 absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search doctors, records, symptoms..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-transparent focus:border-blue-500 rounded-full transition-all outline-none shadow-inner"
        />
      </div>

      {/* Right: Controls & Profile */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Dark Mode Toggle Icon */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* Notifications Popup Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100/80 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white shadow-sm">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAsRead("all")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm font-medium text-slate-400">No new notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => markAsRead(n._id)}
                      className={`p-3.5 hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        !n.isRead ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-slate-800">{n.title}</p>
                        <span className="text-[10px] text-slate-400">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 px-3 rounded-full hover:bg-slate-100/80 border border-slate-200/60 transition-colors bg-white/70"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
              {user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "SD"}
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:block truncate max-w-[140px]">
              {user?.name || "Swapna sarthak Das"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 z-50 py-1.5 divide-y divide-slate-100">
              <div className="px-4 py-3">
                <p className="text-xs font-bold text-slate-900">{user?.name || "Healthcare Professional"}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.email || "staff@briskode.com"}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {user?.role || "Staff"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{user?.empId}</span>
                </div>
              </div>
              <div className="py-1">
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
