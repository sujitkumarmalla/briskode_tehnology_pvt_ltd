import { Link } from "react-router-dom";

function PackageCard({ pkg }) {
  if (!pkg) return null;

  const title = pkg.title || pkg.name || "Health Checkup Package";
  const priceDisplay = typeof pkg.price === "number" ? `₹${pkg.price.toLocaleString()}` : (pkg.price || "₹1,499");
  const inclusions = pkg.tests || pkg.features || ["Complete Diagnostic Screening", "Doctor Consultation"];

  return (
    <div className={`bg-[#F0FDF4] rounded-2xl p-5 border ${
      pkg.popular ? "border-emerald-600 shadow-md relative ring-2 ring-emerald-500/20" : "border-emerald-200/90 shadow-sm"
    } flex flex-col justify-between transition-all duration-200`}>
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
          {pkg.badge || "Popular"}
        </span>
      )}

      <div>
        <h3 className="text-base font-extrabold text-emerald-950 mb-1">{title}</h3>
        <p className="text-[11px] text-emerald-900/80 mb-3 leading-normal line-clamp-2 font-medium">{pkg.description}</p>
        
        <div className="mb-3 flex items-baseline space-x-2 border-b border-emerald-200/60 pb-3">
          <span className="text-2xl font-black text-emerald-950">{priceDisplay}</span>
          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
            <span className="text-xs font-bold text-slate-400 line-through">₹{pkg.originalPrice}</span>
          )}
          {pkg.discount && (
            <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              {pkg.discount}
            </span>
          )}
        </div>

        <div className="space-y-1.5 mb-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800/70 block mb-1">
            {pkg.testsCount ? `${pkg.testsCount} Tests Included` : "Inclusions"}
          </span>
          {inclusions.slice(0, 4).map((feat, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-xs text-emerald-950 font-medium">
              <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to={`/appointment?package=${encodeURIComponent(title)}`}
        className={`w-full text-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-xs block cursor-pointer ${
          pkg.popular
            ? "bg-emerald-700 hover:bg-emerald-600 text-white"
            : "bg-emerald-950 hover:bg-emerald-900 text-white"
        }`}
      >
        Book Package
      </Link>
    </div>
  );
}

export default PackageCard;
