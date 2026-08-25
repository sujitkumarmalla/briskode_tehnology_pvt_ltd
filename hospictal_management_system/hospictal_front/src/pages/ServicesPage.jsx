import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ServiceCard from "../components/Services/ServiceCard";
import { services } from "../data/services";

function ServicesPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Medical Services" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Advanced Clinical Specialties
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Our Medical Services</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
