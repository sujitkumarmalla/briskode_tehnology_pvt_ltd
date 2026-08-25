import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav className="bg-slate-100/70 border-b border-slate-200/60 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center space-x-2">
            <span>/</span>
            {item.path ? (
              <Link to={item.path} className="hover:text-emerald-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-emerald-700 font-bold">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

export default Breadcrumb;
