import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { ShieldCheck, Award, Heart, Stethoscope, Users, Building, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="bg-blue-900/80 text-blue-300 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-700 uppercase">
              ABOUT BRISKODE PUBLIC HOSPITAL
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Pioneering World-Class Healthcare in Odisha
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Located at OMFED Square, Patia, Bhubaneswar, Briskode Public Hospital is a premier 500+ bedded multi-super speciality hospital equipped with advanced diagnostic labs and state-of-the-art ICUs.
            </p>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                To render compassionate, high-quality, and affordable healthcare services to every citizen of Odisha, blending advanced medical technology with human empathy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                To be recognized as the most trusted healthcare institution in Eastern India, known for clinical excellence, transparent ethical care, and research innovation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">NABH & NABL Accreditation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Fully accredited by NABH for hospital standards and NABL certified for pathology laboratory diagnostics, ensuring absolute patient safety and accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* Infrastructure Stats */}
        <section className="py-16 bg-blue-50/50 border-y border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Hospital Infrastructure</h2>
              <p className="text-xs text-slate-500 mt-2">World-class facilities built for rapid emergency response and patient comfort</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h4 className="text-3xl font-black text-blue-600 font-mono">500+</h4>
                <p className="text-xs font-bold text-slate-700 mt-1">Inpatient Hospital Beds</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h4 className="text-3xl font-black text-emerald-600 font-mono">120+</h4>
                <p className="text-xs font-bold text-slate-700 mt-1">ICU & Critical Care Beds</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h4 className="text-3xl font-black text-purple-600 font-mono">12</h4>
                <p className="text-xs font-bold text-slate-700 mt-1">Operation Theatres</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h4 className="text-3xl font-black text-amber-600 font-mono">24/7</h4>
                <p className="text-xs font-bold text-slate-700 mt-1">Emergency Cath-Lab</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
