import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { hospitalConfig } from "../../data/hospitalConfig";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/doctors", label: "Doctors" },
    { path: "/packages", label: "Packages" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact Us" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-3 sm:px-6 pt-3">
      {/* Waterplate Glass Container */}
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled
          ? "bg-white/50 backdrop-blur-md border border-emerald-300/60 shadow-lg shadow-emerald-950/5 py-2 px-4 sm:px-6"
          : "bg-white/40 backdrop-blur-sm border border-emerald-200/50 shadow-md shadow-emerald-950/5 py-2.5 px-4 sm:px-6"
      }`}>
        <div className="flex justify-between items-center h-14">
          
          {/* Logo & Brand Name with Water Drop Accent */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-300/70 flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-300">
              <img 
                src={hospitalConfig.logo} 
                alt={`${hospitalConfig.name} Logo`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200";
                }}
              />
              {/* Smooth Liquid Water Drop Accent */}
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xs">
                <svg className="w-2.5 h-2.5 fill-current animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-emerald-950 block leading-none">
                  {hospitalConfig.name}
                </span>
                {/* Subtle Liquid Ripple Icon */}
                <svg className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500/20" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="block text-[9px] text-emerald-700 font-extrabold uppercase tracking-widest mt-0.5">
                {hospitalConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Pill Style with Water Drop Indicators) */}
          <div className="hidden lg:flex items-center space-x-1 bg-emerald-100/40 backdrop-blur-xs p-1.5 rounded-xl border border-emerald-200/40">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center space-x-1 ${
                  isActive 
                    ? "bg-emerald-700 text-white shadow-xs" 
                    : "text-emerald-950 hover:bg-emerald-100/80 hover:text-emerald-800"
                }`}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <svg className="w-2.5 h-2.5 fill-current text-emerald-200" viewBox="0 0 24 24">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA Booking Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link 
              to="/appointment" 
              className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-3.5 h-3.5 fill-current text-emerald-200" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-emerald-950 hover:text-emerald-700 hover:bg-emerald-100/80 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 visible pt-2 pb-3" : "max-h-0 opacity-0 invisible overflow-hidden"
        }`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-xl border border-emerald-200/80 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                  isActive 
                    ? "bg-emerald-700 text-white" 
                    : "text-emerald-950 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 pb-1 px-1">
              <Link
                to="/appointment"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 shadow-md transition-all duration-200"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
