import { Link } from "react-router-dom";
import { hospitalConfig } from "../../data/hospitalConfig";

function Footer() {
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Medical Services" },
    { path: "/doctors", label: "Our Specialists" },
    { path: "/packages", label: "Health Packages" },
    { path: "/gallery", label: "Clinical Gallery" },
    { path: "/appointment", label: "Book Appointment" }
  ];

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(`Hello ${hospitalConfig.name}! I have an inquiry about your medical services.`);
    window.open(`https://wa.me/${hospitalConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${text}`, "_blank");
  };

  return (
    <footer className="bg-[#064E3B] text-emerald-100 border-t border-emerald-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Brand Info */}
          <div className="space-y-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-white flex items-center justify-center overflow-hidden p-0.5">
                <img 
                  src={hospitalConfig.logo} 
                  alt={`${hospitalConfig.name} Logo`} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=200";
                  }}
                />
              </div>
              <div>
                <span className="font-bold text-xs text-white block">
                  {hospitalConfig.name}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-emerald-200">
                  {hospitalConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-[11px] text-emerald-200/90 leading-snug">
              Providing compassionate, cutting-edge healthcare 24/7.
            </p>
            {/* Button without WhatsApp SVG icon */}
            <button 
              onClick={handleWhatsAppChat}
              className="inline-flex items-center px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold transition-all cursor-pointer shadow-xs"
            >
              <span>Instant WhatsApp Desk</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="space-y-1.5">
            <h3 className="text-white text-[11px] font-bold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-1 text-xs">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-emerald-200/90 hover:text-white transition-colors text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-1.5">
            <h3 className="text-white text-[11px] font-bold tracking-wider uppercase">
              Working Hours
            </h3>
            <ul className="space-y-1 text-[11px] text-emerald-200/90">
              <li className="flex justify-between">
                <span>Emergency Unit:</span>
                <span className="text-emerald-300 font-bold">24/7 Service</span>
              </li>
              <li className="flex justify-between">
                <span>OPD Consults:</span>
                <span>09:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Diagnostic Labs:</span>
                <span>08:00 AM - 09:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1.5">
            <h3 className="text-white text-[11px] font-bold tracking-wider uppercase">
              Emergency Contact
            </h3>
            <div className="space-y-1 text-[11px]">
              <div>
                <span className="text-emerald-200/90 block">Emergency Helpline:</span>
                <a href={`tel:${hospitalConfig.phone}`} className="font-extrabold text-rose-300 hover:underline">
                  {hospitalConfig.phone}
                </a>
              </div>

              <div>
                <span className="text-emerald-200/90 block">Support Number:</span>
                <button onClick={handleWhatsAppChat} className="font-semibold text-emerald-300 hover:underline text-left">
                  {hospitalConfig.whatsapp}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="mt-4 pt-3 border-t border-emerald-900/80 flex flex-col sm:flex-row justify-between items-center text-[10px] text-emerald-300/70 space-y-1 sm:space-y-0">
          <p>© {new Date().getFullYear()} {hospitalConfig.name}.</p>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
