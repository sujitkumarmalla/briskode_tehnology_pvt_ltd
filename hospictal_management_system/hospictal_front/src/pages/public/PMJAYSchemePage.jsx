import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { ShieldCheck, CheckCircle, Phone, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function PMJAYSchemePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-[#1b365d] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-extrabold px-3 py-1 rounded-full border border-teal-400/40 uppercase">
              AYUSHMAN BHARAT — PM-JAY SCHEME
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Cashless Healthcare Treatment Under Ayushman Bharat PM-JAY
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Briskode Hospital is an approved empanelled hospital offering 100% cashless medical and surgical treatment under Pradhan Mantri Jan Arogya Yojana (PM-JAY).
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white p-8 rounded-3xl border border-blue-200 shadow-xl space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Ayushman PM-JAY Coverage Benefits at Briskode Hospital</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-800">
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">₹5 Lakhs Annual Family Coverage</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">Free secondary & tertiary hospital care coverage per family per year across all empanelled hospitals in India.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">1,900+ Medical & Surgical Packages</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">Includes cardiac surgery, neurosurgery, joint replacements, chemotherapy, and ICU critical care.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">100% Cashless & Paperless Treatment</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">No out-of-pocket expenses for medicines, diagnostics, surgery, bed charges, and post-hospitalization care.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Dedicated Ayushman Mitra Helpdesk</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">On-site Ayushman Mitra executives at Patia hospital reception to assist card verification and pre-authorization.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Helpdesk Contact Box */}
          <div className="bg-[#1b365d] text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white">Need Ayushman PM-JAY Card Verification Assistance?</h3>
              <p className="text-xs text-slate-300 mt-1">Visit our dedicated Ayushman Mitra helpdesk counter at OMFED Square, Patia, or call our coordinator.</p>
            </div>
            <a
              href="tel:+9106742740000"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 flex-shrink-0"
            >
              <Phone className="w-4 h-4" /> Ayushman Mitra: +91 0674 2 740 000
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
