import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Award, Trophy, ShieldCheck, CheckCircle } from "lucide-react";

export default function AwardsPage() {
  const awards = [
    {
      id: 1,
      title: "Best Super-Speciality Hospital in Odisha 2025",
      issuer: "Eastern India Healthcare Excellence Conclave",
      description: "Awarded for state-of-the-art ICU infrastructure, 24/7 cath-lab response, and high clinical success rates."
    },
    {
      id: 2,
      title: "Excellence in Emergency & Trauma Response Award",
      issuer: "Odisha Medical Quality Council",
      description: "Recognized for level-1 trauma care response and fastest door-to-balloon time in primary angioplasty."
    },
    {
      id: 3,
      title: "NABH Hospital Accreditation Certificate",
      issuer: "National Accreditation Board for Hospitals & Healthcare Providers",
      description: "Full accreditation for compliance with national patient safety and clinical care standards."
    },
    {
      id: 4,
      title: "NABL Pathology Diagnostics Certification",
      issuer: "National Accreditation Board for Testing and Calibration Laboratories",
      description: "Certified accuracy in clinical pathology, biochemistry, microbiology, and haematology testing."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-[#1b365d] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-extrabold px-3 py-1 rounded-full border border-teal-400/40 uppercase">
              RECOGNITION & CERTIFICATIONS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Awards & Accolades
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Celebrating clinical competency, NABH quality accreditations, and medical achievements at Briskode Hospital.
            </p>
          </div>
        </section>

        {/* Awards Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((awd) => (
              <div key={awd.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Trophy className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{awd.title}</h3>
                <p className="text-xs font-bold text-blue-600">{awd.issuer}</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{awd.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
