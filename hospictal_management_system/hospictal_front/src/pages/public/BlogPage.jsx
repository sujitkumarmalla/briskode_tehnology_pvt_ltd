import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { BookOpen, Calendar, User, ArrowRight, Award, ShieldCheck, UserCheck, Star } from "lucide-react";

export default function BlogPage() {
  const leadershipKeyFigures = [
    {
      id: "author",
      roleTitle: "Chief Author & Editor",
      name: "Dr. Swarna Sarthak Mohanty",
      designation: "Senior Cardiologist & Chief Medical Editor",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      description: "Leads clinical research writing and authors emergency cardiac care & preventive health guides.",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      id: "director",
      roleTitle: "Medical Director",
      name: "Dr. Rajesh Kumar Mohapatra",
      designation: "Managing Director & Chief of Surgery",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
      description: "Directs hospital medical guidelines, clinical peer reviews, and surgical safety protocols.",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300"
    },
    {
      id: "important-person",
      roleTitle: "Important Person & Patron",
      name: "Shri Mohan Charan Majhi",
      designation: "Hon'ble Chief Minister of Odisha & Guest Contributor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      description: "Key leader patronizing state health awareness initiatives, free BSKY/PM-JAY schemes, and public health publications.",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
    }
  ];

  const articles = [
    {
      id: 1,
      title: "Recognizing Early Warning Signs of a Heart Attack & Golden Hour Action",
      coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
      author: "Dr. Swarna Sarthak Mohanty",
      authorRole: "Senior Cardiologist & Author",
      authorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
      director: "Dr. Rajesh Kumar Mohapatra",
      directorRole: "Medical Director",
      directorImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200",
      importantPerson: "Shri Mohan Charan Majhi",
      importantPersonRole: "Hon'ble CM of Odisha (Patron)",
      importantPersonImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      date: "August 28, 2026",
      category: "Cardiac Care",
      excerpt: "Timely emergency cath-lab intervention within the first 60 minutes saves heart muscle and restores blood flow effectively."
    },
    {
      id: 2,
      title: "Understanding Hyperacute Stroke: FAST Symptoms & Emergency Treatment",
      coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
      author: "Dr. Sunita Mehta",
      authorRole: "Consultant Neurologist & Author",
      authorImage: "https://images.unsplash.com/photo-1594824813566-78a05c7553b4?auto=format&fit=crop&q=80&w=200",
      director: "Dr. Rajesh Kumar Mohapatra",
      directorRole: "Medical Director",
      directorImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200",
      importantPerson: "Shri Mohan Charan Majhi",
      importantPersonRole: "Hon'ble CM of Odisha (Patron)",
      importantPersonImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      date: "August 22, 2026",
      category: "Neurology",
      excerpt: "Recognizing Facial drooping, Arm weakness, and Speech difficulty helps stroke patients reach thrombolysis treatment on time."
    },
    {
      id: 3,
      title: "Preventive Kidney Health: Managing Diabetes & Hypertension Early",
      coverImage: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
      author: "Dr. Subrat Kumar Das",
      authorRole: "Nephrology Specialist & Author",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
      director: "Dr. Rajesh Kumar Mohapatra",
      directorRole: "Medical Director",
      directorImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200",
      importantPerson: "Shri Mohan Charan Majhi",
      importantPersonRole: "Hon'ble CM of Odisha (Patron)",
      importantPersonImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
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
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Medical Insights & Health Articles
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Written by senior consultants, reviewed by our Medical Director, and patronized by key state leaders.
            </p>
          </div>
        </section>

        {/* Featured Key Figures Section with Photos: Author, Director, Important Person */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-slate-900">Editorial Board & Key Figures</h2>
              <p className="text-xs text-slate-500 mt-1">Meet our Chief Author, Medical Director, and Chief Guest Patron driving clinical publications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadershipKeyFigures.map((fig) => (
                <div key={fig.id} className="bg-slate-50 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    {/* Header Role Badge */}
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${fig.badgeColor} uppercase tracking-wider inline-block`}>
                      {fig.roleTitle}
                    </span>

                    {/* Profile Photo and Details */}
                    <div className="flex items-center gap-4">
                      <img
                        src={fig.image}
                        alt={fig.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">{fig.name}</h3>
                        <p className="text-xs font-bold text-blue-700 leading-snug">{fig.designation}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1 border-t border-slate-200">
                      {fig.description}
                    </p>
                  </div>

                  <div className="px-6 py-3 bg-slate-100/80 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-semibold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Editorial Board
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Verified Profile</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-slate-900">Latest Medical Articles</h2>
            <span className="text-xs font-bold text-slate-500">{articles.length} Published Articles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div key={art.id} className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
                <div>
                  {/* Article Cover Image */}
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">{art.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{art.excerpt}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 space-y-3">
                  {/* Author with Avatar */}
                  <div className="flex items-center gap-2.5">
                    <img src={art.authorImage} alt={art.author} className="w-8 h-8 rounded-full object-cover border border-blue-200" />
                    <div className="text-[11px]">
                      <p className="font-extrabold text-slate-900 leading-tight">{art.author}</p>
                      <p className="text-blue-600 font-semibold text-[10px]">{art.authorRole}</p>
                    </div>
                  </div>

                  {/* Medical Director with Avatar */}
                  <div className="flex items-center gap-2.5 bg-purple-50/70 p-2 rounded-xl border border-purple-100">
                    <img src={art.directorImage} alt={art.director} className="w-7 h-7 rounded-full object-cover border border-purple-300" />
                    <div className="text-[10px]">
                      <p className="font-bold text-slate-900 leading-tight"><span className="text-slate-500 font-normal">Director:</span> {art.director}</p>
                      <p className="text-purple-700 font-semibold text-[9px]">{art.directorRole}</p>
                    </div>
                  </div>

                  {/* Important Person / Patron with Avatar */}
                  <div className="flex items-center gap-2.5 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    <img src={art.importantPersonImage} alt={art.importantPerson} className="w-7 h-7 rounded-full object-cover border border-amber-300" />
                    <div className="text-[10px]">
                      <p className="font-bold text-amber-950 leading-tight"><span className="text-amber-700 font-normal">Patron:</span> {art.importantPerson}</p>
                      <p className="text-amber-800 font-semibold text-[9px]">{art.importantPersonRole}</p>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-slate-400 text-[10px]">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                    <span className="font-bold text-teal-600">Peer Reviewed</span>
                  </div>
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


