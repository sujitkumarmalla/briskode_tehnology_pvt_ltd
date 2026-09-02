import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import About from "../components/About/About";

function AboutPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "About Us" }]} />
      
      {/* Top Banner Header */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-900 text-white shadow-2xl">
        {/* Bright High-Visibility Blurred Hospital Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-[2px] scale-105 opacity-90 transition-all"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600')` }}
        ></div>
        {/* Minimal Light Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/30 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-slate-950/40"></div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            About Capital Public Seva
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Delivering advanced clinical care with uncompromising ethics, modern infrastructure, and compassionate patient outcomes since 2001.
          </p>
        </div>
      </section>

      {/* Core About Component */}
      <About />

      {/* Detailed Infrastructure & Values Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              State-of-the-Art Infrastructure
            </h2>
            <p className="text-xs text-slate-500">
              Built to comply with NABH international health standards for safety, infection control, and patient comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Modular Operation Theaters</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Equipped with HEPA air filtration laminar flow systems, advanced endoscopic towers, and robotic surgical suites.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Advanced ICU & NICU Units</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                24/7 continuous central monitoring, invasive ventilators, and dedicated pediatric/neonatal intensive care isolation beds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Full-Spectrum Diagnostics</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                On-site 128-slice CT scanners, 3T MRI systems, automated pathology labs, and round-the-clock blood bank support.
              </p>
            </div>
          </div>

          {/* Accreditations Banner */}
          <div className="bg-emerald-900 text-white rounded-3xl p-8 text-center space-y-4">
            <h3 className="text-xl font-extrabold">Accredited by National Medical Bodies</h3>
            <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs font-bold tracking-wider uppercase text-emerald-300">
              <span className="bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-700">✓ NABH Accredited Hospital</span>
              <span className="bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-700">✓ NABL Accredited Laboratory</span>
              <span className="bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-700">✓ ISO 9001:2015 Certified</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default AboutPage;
