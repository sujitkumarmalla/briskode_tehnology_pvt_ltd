import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { ShieldCheck, CheckCircle, Phone, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function BSKYSchemePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-emerald-800 text-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-600 uppercase">
              BIJU SWASTHYA KALYAN YOJANA (BSKY) — ODISHA
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Cashless Healthcare Treatment Under BSKY Scheme
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl">
              Capital Public Seva Hospital, Patia, is an approved empanelled hospital offering 100% cashless medical and surgical treatment under the Odisha BSKY Smart Health Card scheme.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-xl space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">BSKY Coverage Benefits at Capital Public Seva Hospital</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-800">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">₹5 Lakhs per Family Annual Coverage</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">Free secondary & tertiary hospital care coverage for all eligible Odisha family cardholders.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">₹10 Lakhs Coverage for Women Members</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">Extended annual healthcare financial limit up to ₹10 Lakhs for female family members.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Cashless Surgeries & ICU Stay</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">Zero out-of-pocket expenses for approved cardiac, neuro, gastro, and orthopedic surgeries.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Dedicated 24/7 BSKY Helpdesk</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">Swasthya Mitra executives at Patia reception desk to assist card verification and pre-authorization.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Helpdesk Contact Box */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white">Need BSKY Card Verification Assistance?</h3>
              <p className="text-xs text-slate-300 mt-1">Visit our dedicated BSKY helpdesk counter at OMFED Square, Patia, or call our coordinator.</p>
            </div>
            <a
              href="tel:+9106742740000"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 flex-shrink-0"
            >
              <Phone className="w-4 h-4" /> BSKY Coordinator: +91 0674 2 740 000
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
