import React from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Image, Camera } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Hospital Building Exterior",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "24/7 Emergency Cath-Lab Unit",
      category: "Cardiac Sciences",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Super Speciality ICU Ward",
      category: "Critical Care",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "3D Neuro Surgery Operation Theatre",
      category: "Neurosurgery",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      title: "NABL Certified Pathology Laboratory",
      category: "Diagnostics",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      title: "Renal Hemodialysis Suite",
      category: "Nephrology",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
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
              HOSPITAL INFRASTRUCTURE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Hospital Facilities Photo Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Explore state-of-the-art operation theatres, ICUs, cath-labs, and diagnostic labs at Briskode Hospital, Patia.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden group">
                <div className="relative overflow-hidden h-60">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
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
