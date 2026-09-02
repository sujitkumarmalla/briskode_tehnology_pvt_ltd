import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  Clock,
  Globe,
  Share2,
  Lock,
  ChevronRight,
  Award
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#10223e] text-slate-300 font-sans border-t border-blue-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Hospital Branding & Badges */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/briskode_logo.png"
                alt="Briskode Hospital Logo"
                className="h-14 bg-white p-2 rounded-2xl shadow-md object-contain"
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Briskode Public Hospital is Odisha's premier 500+ bedded super-speciality tertiary healthcare institution located at OMFED Square, Patia, Bhubaneswar.
              Providing 24/7 emergency trauma care, advanced cardiac cath-lab, and cashless treatment under Ayushman Bharat PM-JAY Scheme.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-blue-900/60 text-blue-200 text-[10px] font-extrabold px-3 py-1 rounded-full border border-blue-700 flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-400" /> NABH Accredited
              </span>
              <span className="bg-blue-900/60 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-teal-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-300" /> NABL Certified Lab
              </span>
              <span className="bg-blue-900/60 text-purple-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-purple-700">
                Ayushman PM-JAY
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-blue-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-teal-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" /> Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" /> About Hospital
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-teal-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" /> Super Specialities
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-teal-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" /> Doctor Directory
                </Link>
              </li>
              <li>
                <Link to="/pmjay-scheme" className="hover:text-teal-300 transition-colors flex items-center gap-1 text-teal-300 font-extrabold">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" /> Ayushman PM-JAY Card
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-300 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" /> Contact & Location
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-300 transition-colors flex items-center gap-1 text-blue-400 font-bold">
                  <Lock className="w-3.5 h-3.5 text-blue-400" /> Staff Login Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Super Specialities */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-blue-800 pb-2">
              Super Specialities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="hover:text-white transition-colors">Cardiac Sciences & Cath-Lab</li>
              <li className="hover:text-white transition-colors">Neuro Surgery & Stroke Unit</li>
              <li className="hover:text-white transition-colors">Gastroenterology & HPB</li>
              <li className="hover:text-white transition-colors">Renal Sciences & Dialysis</li>
              <li className="hover:text-white transition-colors">Oncology & Chemotherapy</li>
              <li className="hover:text-white transition-colors">Orthopedics & Joint Replacement</li>
              <li className="hover:text-white transition-colors">24/7 Trauma & Casualty</li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-blue-800 pb-2">
              Emergency & Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>OMFED Square, Patia, Bhubaneswar, Odisha 751024</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="font-bold text-white">Helpline: +91 0674 2 740 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-300 flex-shrink-0" />
                <span>OPD Hours: Mon–Sat 9am–6pm</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>care@briskodehospital.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#0b172a] border-t border-blue-950 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Briskode Public Hospital, OMFED Square, Patia, Bhubaneswar. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <Link to="/login" className="text-blue-400 hover:underline font-bold">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
