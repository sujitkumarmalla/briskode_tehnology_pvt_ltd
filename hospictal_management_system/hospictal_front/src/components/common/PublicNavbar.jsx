import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  Phone,
  MapPin,
  Calendar,
  Lock,
  ChevronDown,
  Globe,
  Share2,
  Mail,
  Heart,
  ClipboardList,
  Users
} from "lucide-react";
import API from "../../utils/api";

export default function PublicNavbar() {
  const location = useLocation();
  const [departments, setDepartments] = useState([]);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await API.get("/departments");
        if (res.data.success) setDepartments(res.data.departments);
      } catch (err) {
        // Fallback departments if backend offline
        setDepartments([
          { _id: "1", name: "Cardiology" },
          { _id: "2", name: "Neurology" },
          { _id: "3", name: "Gastroenterology" },
          { _id: "4", name: "Nephrology" },
          { _id: "5", name: "Oncology" },
          { _id: "6", name: "Orthopedics" }
        ]);
      }
    };
    fetchDepts();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 1. TOP EMERGENCY & LOCATION ANNOUNCEMENT BAR */}
      <div className="bg-[#10223e] text-white text-xs py-2 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-2 border-b border-blue-900/50">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+9106742740000"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold px-3 py-1 rounded-full text-[11px] transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" /> 24/7 EMERGENCY: +91 0674 2 740 000
          </a>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-blue-400" /> OMFED Square, Patia, Bhubaneswar, Odisha 751024
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-[10px] uppercase font-bold text-slate-500 hidden lg:inline">Social Media:</span>
          <div className="flex items-center gap-2.5">
            <a href="#" className="hover:text-white transition-colors"><Globe className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Share2 className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Mail className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* 2. DEEP ROYAL BLUE NAVBAR (Matching screenshot media_1788330329191.png) */}
      <header className="sticky top-0 z-40 bg-[#1b365d] text-white shadow-xl border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Unique Hospital Emblem Image */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/briskode_logo.png"
              alt="Briskode Hospital Logo"
              className="h-12 sm:h-14 bg-white p-1.5 rounded-2xl shadow-md group-hover:scale-105 transition-transform object-contain"
            />
            {/* Vertical Line Divider */}
            <div className="h-10 w-0.5 bg-blue-400/40 hidden sm:block"></div>
            <div className="hidden sm:block">
              <span className="text-xs font-black text-white uppercase tracking-wider block">OMFED SQUARE, PATIA</span>
              <p className="text-[10px] text-teal-300 font-extrabold italic">BHUBANESWAR, ODISHA</p>
            </div>
          </Link>

          {/* Navigation Links & Sub-Pill Filter Buttons (Matching screenshot) */}
          <div className="hidden lg:flex flex-col items-start gap-2">
            {/* Main Menu Links */}
            <nav className="flex items-center gap-5 text-xs font-bold text-slate-200">
              <Link to="/" className={`transition-colors py-1 ${isActive("/") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Home
              </Link>
              <Link to="/about" className={`transition-colors py-1 ${isActive("/about") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                About Us
              </Link>

              {/* Departments Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDeptDropdownOpen(true)}
                onMouseLeave={() => setIsDeptDropdownOpen(false)}
              >
                <Link
                  to="/departments"
                  className={`flex items-center gap-1 transition-colors py-1 ${isActive("/departments") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}
                >
                  Departments <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {isDeptDropdownOpen && (
                  <div className="absolute top-full left-0 w-60 bg-[#10223e] border border-blue-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-xs">
                    {departments.map((d) => (
                      <Link
                        key={d._id}
                        to="/departments"
                        className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-blue-800/60 font-semibold"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/doctors" className={`transition-colors py-1 ${isActive("/doctors") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Doctors
              </Link>
              <Link to="/career" className={`transition-colors py-1 ${isActive("/career") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Career
              </Link>
              <Link to="/contact" className={`transition-colors py-1 ${isActive("/contact") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Contact
              </Link>
              <Link to="/gallery" className={`transition-colors py-1 ${isActive("/gallery") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Gallery
              </Link>
              <Link to="/blog" className={`transition-colors py-1 ${isActive("/blog") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Blog
              </Link>
              <Link to="/awards" className={`transition-colors py-1 ${isActive("/awards") ? "text-teal-300 border-b-2 border-teal-300" : "hover:text-teal-300"}`}>
                Awards & Accolades
              </Link>
            </nav>

            {/* Pill Filter Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to="/health-checkups"
                className="flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-[11px] font-semibold px-3 py-1 rounded-full border border-blue-400/30 transition-colors"
              >
                <ClipboardList className="w-3 h-3 text-teal-300" /> Health Check Packages
              </Link>
              <Link
                to="/pmjay-scheme"
                className="flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 text-teal-300 text-[11px] font-bold px-3 py-1 rounded-full border border-teal-400/40 transition-colors"
              >
                <ShieldCheck className="w-3 h-3 text-teal-300" /> Healthcare Partners & Ayushman PM-JAY
              </Link>
            </div>
          </div>

          {/* Action Buttons: Glowing Book Appointment & Staff Login */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 bg-blue-950/80 hover:bg-blue-900 text-blue-200 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-blue-700/60 transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Staff Login
            </Link>

            {/* Glowing Gradient Teal/Green Button matching screenshot */}
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-full shadow-lg shadow-teal-400/30 transition-all transform hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-slate-950" /> Book Appointment
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
