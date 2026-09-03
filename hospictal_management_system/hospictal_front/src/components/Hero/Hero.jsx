import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hospitalConfig } from "../../data/hospitalConfig";

const attractiveQuotes = [
  {
    tag: "Language of Care",
    title: "Universal Touch of Healing",
    quote: "Compassion is the quiet language spoken by gentle hands, heard by weary hearts, and understood beyond all words.",
    meaning: "True healing begins when empathetic care connects human souls with medical excellence.",
    highlight: "Empathy & Dignity"
  },
  {
    tag: "Essence & Purpose",
    title: "Where Science Meets Soul",
    quote: "The noble meaning of healthcare is not merely to treat sickness, but to restore hope, warmth, and the joy of life.",
    meaning: "Every life saved is a testament to dedicated service, restoring peace of mind to families.",
    highlight: "Restoring Hope"
  },
  {
    tag: "Words of Grace",
    title: "The Art of Human Care",
    quote: "In every act of clinical service lies an eternal grace: lighting up another's darkest hour with comfort and strength.",
    meaning: "Care beyond cure — honoring human dignity through every step of recovery.",
    highlight: "Timeless Grace"
  }
];

function Hero() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % attractiveQuotes.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = attractiveQuotes[activeQuoteIndex];

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

          {/* Right Column: Prominent Hospital Facility Visual Card with Stylish Overlay Text */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/30 bg-slate-950 group min-h-[480px] sm:min-h-[520px] flex flex-col justify-between">
              
              {/* Home Hospital Image */}
              <img
                src={hospitalConfig.heroImage}
                alt="Capital Public Seva Hospital Facility"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1200";
                }}
              />
              
              {/* Gradient Dark Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30"></div>
              <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply"></div>

              {/* Top Header Overlay Tags */}
              <div className="relative p-5 z-10 flex items-center justify-between">
                <div className="bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-md flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-cinzel tracking-wider uppercase">Capital Public Seva</span>
                </div>

                <div className="bg-slate-900/80 border border-amber-400/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-amber-300 flex items-center space-x-1.5 shadow-lg">
                  <span className="font-great-vibes text-lg text-amber-300 leading-none">Language of Care</span>
                </div>
              </div>

              {/* Bottom Stylish Quote Card with Attractive Language and Deep Meaning */}
              <div className="relative p-5 sm:p-7 z-10 mt-auto">
                <div className="bg-slate-950/85 border border-emerald-500/40 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-2xl space-y-3 relative overflow-hidden">
                  
                  {/* Glowing background accent */}
                  <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-500/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-great-vibes text-2xl sm:text-3xl text-amber-300 leading-none">
                        Language & Meaning
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-900/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      {currentQuote.tag}
                    </span>
                  </div>

                  {/* Quote in Stylish Playfair Display Serif Font */}
                  <blockquote className="relative pt-1">
                    <span className="text-emerald-500/30 font-serif text-5xl leading-none absolute -top-3 -left-3 select-none">“</span>
                    <p className="font-playfair italic text-white text-base sm:text-lg leading-relaxed pl-3 drop-shadow-md">
                      {currentQuote.quote}
                    </p>
                  </blockquote>

                  {/* Meaning in Cormorant Garamond Serif Font */}
                  <div className="pt-2 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-2">
                      <span className="shrink-0 mt-0.5 text-amber-400 text-xs font-bold font-sans uppercase tracking-wider bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded">
                        Meaning
                      </span>
                      <p className="font-cormorant italic text-sm sm:text-base text-emerald-100 font-medium leading-tight">
                        {currentQuote.meaning}
                      </p>
                    </div>

                    {/* Pagination Dot Controls */}
                    <div className="flex items-center space-x-1.5 self-end sm:self-center shrink-0">
                      {attractiveQuotes.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveQuoteIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            activeQuoteIndex === idx
                              ? "w-6 bg-amber-400"
                              : "w-2 bg-emerald-800 hover:bg-emerald-600"
                          }`}
                          title={`View quote ${idx + 1}`}
                          aria-label={`View quote ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;

