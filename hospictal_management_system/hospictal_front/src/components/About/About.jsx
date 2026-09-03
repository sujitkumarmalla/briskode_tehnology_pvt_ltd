import { hospitalConfig } from "../../data/hospitalConfig";

function About() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-emerald-200 relative group">
              <img
                src={hospitalConfig.aboutImage}
                alt={`${hospitalConfig.name} Modern Facility`}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

              <div className="absolute top-4 right-4 bg-emerald-700/90 text-white p-3 rounded-xl shadow-md text-center backdrop-blur-sm border border-emerald-400/30">
                <span className="block text-xl font-black">25+</span>
                <span className="text-[9px] font-extrabold uppercase tracking-wider block">Years Trust</span>
              </div>

              {/* Stylish Quote & Meaning Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 border border-emerald-500/30 backdrop-blur-md p-4 rounded-xl text-white space-y-1.5 shadow-xl">
                <span className="font-great-vibes text-xl text-amber-300 block">The Art of Medicine</span>
                <p className="font-playfair italic text-xs sm:text-sm text-emerald-50 leading-relaxed">
                  “Medicine is a science of uncertainty and an art of probability, but compassionate care is a universal truth.”
                </p>
                <p className="font-cormorant italic text-[11px] text-emerald-200/90 border-t border-emerald-500/20 pt-1.5 mt-1">
                  <span className="not-italic font-bold font-sans text-amber-400 text-[10px] uppercase mr-1">Meaning:</span>
                  Dedication to saving lives and serving humanity with heartfelt warmth.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
              About {hospitalConfig.name}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Leading Healthcare Excellence with Patient-Centered Innovation
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Established in 2001, {hospitalConfig.name} has evolved into one of the nation's premier multi-specialty tertiary care centers. We combine state-of-the-art medical technology with empathetic clinical care to treat over 50,000 patients annually.
            </p>

            {/* Mission & Vision Cards in Light Mint Green */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-xl bg-[#F0FDF4] text-emerald-950 border border-emerald-200/90 shadow-xs">
                <h4 className="text-xs font-extrabold text-emerald-950 mb-1 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Our Mission</span>
                </h4>
                <p className="text-[11px] text-emerald-900/80 leading-relaxed font-medium">
                  To deliver accessible, affordable, and high-quality clinical care with empathy and modern technology.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F0FDF4] text-emerald-950 border border-emerald-200/90 shadow-xs">
                <h4 className="text-xs font-extrabold text-emerald-950 mb-1 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  <span>Our Vision</span>
                </h4>
                <p className="text-[11px] text-emerald-900/80 leading-relaxed font-medium">
                  To set national benchmarks in patient safety, advanced surgical outcomes, and compassionate care.
                </p>
              </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-emerald-200/80">
              <div>
                <span className="block text-xl font-black text-emerald-700">25+</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Years Experience</span>
              </div>
              <div>
                <span className="block text-xl font-black text-emerald-700">100+</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Specialists</span>
              </div>
              <div>
                <span className="block text-xl font-black text-emerald-700">50K+</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Happy Patients</span>
              </div>
              <div>
                <span className="block text-xl font-black text-emerald-700">20+</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Departments</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
