import { Link } from "react-router-dom";
import { hospitalConfig } from "../../data/hospitalConfig";

function Hero() {
  return (
    <section className="relative bg-emerald-50/40 overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            <span className="text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              Welcome to Capital Public Seva
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-tight tracking-tight">
              Compassionate Care. <br />
              <span className="text-emerald-700">
                Advanced Medicine.
              </span> <br />
              Better Lives.
            </h1>

            <p className="text-sm sm:text-base text-emerald-900/80 max-w-2xl leading-relaxed font-medium">
              Capital Public Seva Hospital features a modern multi-story medical facility, dedicated emergency ambulance parking bays, round-the-clock trauma response, and cutting-edge diagnostic technology.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/appointment"
                className="px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all text-center"
              >
                Book an Appointment
              </Link>
              <Link
                to="/services"
                className="px-8 py-3.5 rounded-xl bg-white border border-emerald-300 hover:border-emerald-700 text-emerald-950 hover:text-emerald-700 font-extrabold text-sm shadow-xs transition-all text-center"
              >
                Explore Our Services
              </Link>
            </div>

            {/* Quick Highlights / Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-emerald-200/80 max-w-xl">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-950">25+</span>
                <span className="text-[11px] font-bold text-emerald-800/80 uppercase">Years Experience</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-950">100+</span>
                <span className="text-[11px] font-bold text-emerald-800/80 uppercase">Specialist Doctors</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-950">50K+</span>
                <span className="text-[11px] font-bold text-emerald-800/80 uppercase">Happy Patients</span>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Hospital Facility Visual Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/20 bg-slate-950 group">
              {/* Keeping current image intact */}
              <img
                src={hospitalConfig.heroImage}
                alt="Capital Public Seva Hospital Facility"
                className="w-full h-[360px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

              {/* Top Tag Overlay: Capital Public Seva */}
              <div className="absolute top-4 left-4 bg-emerald-950/90 text-emerald-200 border border-emerald-500/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-extrabold shadow-md flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Capital Public Seva</span>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
