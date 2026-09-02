import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ServiceCard from "../components/Services/ServiceCard";
import { services } from "../data/services";

function ServicesPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Medical Services" }]} />

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
            Our Medical Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Explore our wide spectrum of diagnostic, therapeutic, emergency, and surgical medical services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
