import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: "Recognizing Early Warning Signs of a Heart Attack & Golden Hour Action",
      author: "Dr. Swarna Sarthak Mohanty (Senior Cardiologist)",
      date: "August 28, 2026",
      category: "Cardiac Care",
      excerpt: "Timely emergency cath-lab intervention within the first 60 minutes saves heart muscle and restores blood flow effectively."
    },
    {
      id: 2,
      title: "Understanding Hyperacute Stroke: FAST Symptoms & Emergency Treatment",
      author: "Dr. Sunita Mehta (Consultant Neurologist)",
      date: "August 22, 2026",
      category: "Neurology",
      excerpt: "Recognizing Facial drooping, Arm weakness, and Speech difficulty helps stroke patients reach thrombolysis treatment on time."
    },
    {
      id: 3,
      title: "Preventive Kidney Health: Managing Diabetes & Hypertension Early",
      author: "Dr. Subrat Kumar Das (Nephrology Specialist)",
      date: "August 15, 2026",
      category: "Renal Health",
      excerpt: "Regular blood pressure monitoring and serum creatinine tests prevent progressive chronic kidney disease (CKD)."
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
              CLINICAL HEALTH BLOG
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Medical Insights & Health Articles
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Written by senior consultants and specialists at Briskode Hospital, Patia, Bhubaneswar.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div key={art.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200">
                    {art.category}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">{art.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{art.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <p className="font-bold text-slate-800">{art.author}</p>
                  <p className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {art.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
