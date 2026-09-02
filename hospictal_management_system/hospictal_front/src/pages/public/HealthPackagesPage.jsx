import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { ClipboardList, CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HealthPackagesPage() {
  const packages = [
    {
      id: 1,
      name: "Master Executive Health Checkup",
      price: 2999,
      originalPrice: 4500,
      testsCount: "45 Tests",
      tests: [
        "Complete Blood Count (CBC)",
        "Fastings & Post Blood Sugar",
        "Lipid Profile (Cholesterol, Triglycerides)",
        "Liver Function Test (LFT)",
        "Kidney Function Test (KFT)",
        "ECG & Chest X-Ray",
        "Senior Physician Consultation"
      ]
    },
    {
      id: 2,
      name: "Comprehensive Cardiac Health Check",
      price: 3999,
      originalPrice: 6000,
      testsCount: "52 Tests",
      tests: [
        "Complete Blood Count (CBC)",
        "2D Echocardiography (Echo)",
        "Treadmill Stress Test (TMT / ECG)",
        "Lipid Profile & Hs-CRP",
        "HbA1c & Fasting Glucose",
        "Kidney Function Test (Serum Creatinine)",
        "Senior Cardiologist Consultation"
      ]
    },
    {
      id: 3,
      name: "Diabetic & Renal Care Package",
      price: 1999,
      originalPrice: 3200,
      testsCount: "35 Tests",
      tests: [
        "Fasting & Post Prandial Glucose",
        "HbA1c Average Blood Sugar",
        "Kidney Function Test (KFT)",
        "Urine Microalbumin",
        "Serum Electrolytes",
        "Nephrologist / Physician Consultation"
      ]
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
              PREVENTIVE HEALTHCARE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Executive Health Check Packages
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Comprehensive health checkup packages with fast laboratory reporting at Briskode Hospital, Patia.
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="bg-teal-50 text-teal-700 text-[10px] font-extrabold px-3 py-1 rounded-full border border-teal-200">
                    {pkg.testsCount} Included
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-blue-700 font-mono">₹{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through font-mono">₹{pkg.originalPrice}</span>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-800 mb-2">Package Inclusions:</p>
                    {pkg.tests.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4 text-slate-950" /> Book Package Checkup
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
