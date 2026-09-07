import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Award, Trophy, ShieldCheck, CheckCircle, Crown, FileCheck, Star } from "lucide-react";

export default function AwardsPage() {
  // Government Approved Certificates
  const govtCertificates = [
    {
      id: "govt-1",
      title: "Government of Odisha Health Department Approval Certificate",
      issuer: "Health & Family Welfare Department, Govt. of Odisha",
      regNo: "Reg No: HFW-OD-2024-889",
      description: "Official government registration & approval certificate for operating a 500+ bedded super-speciality public hospital in Bhubaneswar."
    },
    {
      id: "govt-2",
      title: "Ayushman Bharat PM-JAY & BSKY Government Empanelment Certificate",
      issuer: "National Health Authority (NHA) & Govt. of Odisha",
      regNo: "Empanelment ID: OD-HOSP-PMJAY-4421",
      description: "Official government approved empanelment certificate for rendering 100% cashless medical & surgical care to cardholders."
    },
    {
      id: "govt-3",
      title: "NABH Hospital Accreditation Certificate (Govt. Approved)",
      issuer: "National Accreditation Board for Hospitals & Healthcare Providers",
      regNo: "Certificate No: NABH-2025-0981",
      description: "Full government-recognized accreditation for compliance with national patient safety and high-standard clinical care."
    },
    {
      id: "govt-4",
      title: "NABL Diagnostic Testing Laboratory Certificate",
      issuer: "National Accreditation Board for Testing and Calibration Laboratories",
      regNo: "Certificate No: NABL-PATH-8812",
      description: "Certified medical diagnostic laboratory approval for haematology, biochemistry, and microbiology testing."
    }
  ];

  // Chief Minister Mohan Majhi Award Certificate
  const ministerAward = {
    title: "Odisha State Healthcare Excellence & Service Award 2025",
    awardedBy: "Shri Mohan Charan Majhi",
    designation: "Hon'ble Chief Minister of Odisha",
    event: "Odisha State Healthcare Conclave & Excellence Ceremony",
    description: "Honorary State Certificate & Trophy awarded and presented by Hon'ble Chief Minister Shri Mohan Charan Majhi for outstanding 24/7 cardiac emergency response, Ayushman PM-JAY patient care, and clinical excellence in Odisha."
  };

  const generalAwards = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-[#1b365d] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Awards & Government Accreditations
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Celebrating clinical competency, government-approved regulatory certifications, and state accolades.
            </p>
          </div>
        </section>

        {/* 1. Chief Minister Mohan Majhi Award Feature Box */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-amber-400">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
              <Crown className="w-80 h-80" />
            </div>

            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-slate-950/40 text-amber-200 text-xs font-black px-4 py-1.5 rounded-full border border-amber-300/40 uppercase tracking-wider backdrop-blur-md">
                <Crown className="w-4 h-4 text-amber-300" />
                State Honor & Certificate
              </div>

              <h2 className="text-2xl sm:text-4xl font-black leading-tight text-white drop-shadow-md">
                {ministerAward.title}
              </h2>

              <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-2xl border border-amber-300/30 text-xs sm:text-sm space-y-2">
                <p className="font-extrabold text-amber-300 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Awarded & Presented By: <strong>{ministerAward.awardedBy}</strong> ({ministerAward.designation})</span>
                </p>
                <p className="text-slate-200 font-medium">
                  <strong>Occasion / Event:</strong> {ministerAward.event}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-amber-50 leading-relaxed font-medium">
                {ministerAward.description}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Government Approved Certificates */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" /> Government Approved Certificates
              </h2>
              <p className="text-xs text-slate-500 mt-1">Regulatory approvals, license registrations, and government health empanelments</p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
              Verified Govt Standards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {govtCertificates.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-3xl border-2 border-emerald-500/30 shadow-md hover:shadow-xl transition-all space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 flex-shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">{cert.title}</h3>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">{cert.issuer}</p>
                    <p className="text-[11px] font-mono text-slate-500 font-bold mt-1 bg-slate-100 px-2 py-0.5 rounded inline-block">
                      {cert.regNo}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium pt-2 border-t border-slate-100">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. General Industry & Quality Conclave Awards */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" /> Clinical Excellence Conclave Awards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generalAwards.map((awd) => (
              <div key={awd.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{awd.title}</h3>
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

