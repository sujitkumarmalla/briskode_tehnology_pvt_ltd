import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { hospitalConfig } from "../../data/hospitalConfig";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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
          ? "bg-white/90 backdrop-blur-md border border-emerald-300/60 shadow-lg shadow-emerald-950/5 py-2 px-4 sm:px-6"
          : "bg-white/80 backdrop-blur-md border border-emerald-200/50 shadow-md shadow-emerald-950/5 py-2.5 px-4 sm:px-6"
      }`}>
        <div className="flex justify-between items-center h-14">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="hidden lg:flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-300/70 flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-300">
              <img 
                src={hospitalConfig.logo} 
                alt={`${hospitalConfig.name} Logo`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200";
                }}
              />
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
                <svg className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500/20" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="block text-[9px] text-emerald-700 font-extrabold uppercase tracking-widest mt-0.5">
                {hospitalConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 bg-emerald-50/80 p-1 rounded-full border border-emerald-200/60 shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `text-xs font-black px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive 
                    ? "bg-emerald-700 text-white shadow-sm" 
                    : "text-emerald-950 hover:bg-emerald-100 hover:text-emerald-900"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right CTA Buttons: Book Appointment & Admin Login / Dashboard */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <Link 
              to="/appointment" 
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-3.5 h-3.5 fill-current text-emerald-200" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <span>Book Appointment</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Logout Admin"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-3.5 h-3.5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Login / Dashboard Button */}
          <div className="flex lg:hidden items-center w-full justify-center">
            {isAuthenticated ? (
              <Link
                to="/admin"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all"
              >
                <svg className="w-3.5 h-3.5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
