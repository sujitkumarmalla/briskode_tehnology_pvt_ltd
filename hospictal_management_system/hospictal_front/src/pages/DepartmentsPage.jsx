import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import DepartmentCard from "../components/Departments/DepartmentCard";
import { departments } from "../data/departments";

function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb items={[{ label: "Departments" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-teal-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-teal-400 font-extrabold text-xs uppercase tracking-widest bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
            Specialized Care Centers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Clinical Departments</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our hospital houses dedicated departments managed by senior medical consultants and surgical experts.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search department by name or condition..."
              className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-slate-400 text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDepts.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DepartmentsPage;
