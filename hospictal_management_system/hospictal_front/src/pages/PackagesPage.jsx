import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import PackageCard from "../components/Packages/PackageCard";
import { packages } from "../data/packages";

function PackagesPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Health Checkup Packages" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Preventive Diagnostics
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Health Packages</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Early detection saves lives. Choose from our specialized screening packages designed for all age groups.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PackagesPage;
