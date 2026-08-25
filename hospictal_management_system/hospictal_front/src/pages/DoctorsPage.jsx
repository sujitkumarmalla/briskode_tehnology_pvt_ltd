import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import DoctorList from "../components/Doctors/DoctorList";
import { doctors } from "../data/doctors";
import { departments } from "../data/departments";

function DoctorsPage() {
  const [searchParams] = useSearchParams();
  const selectedDeptParam = searchParams.get("department") || "All";

  const [selectedDept, setSelectedDept] = useState(selectedDeptParam);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDept === "All" || doc.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div>
      <Breadcrumb items={[{ label: "Doctors & Specialists" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Medical Faculty & Consultants
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Our Specialist Doctors</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find highly qualified medical specialists, review their clinical experience, and book direct consultations.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor by name or specialty..."
              className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-slate-400 text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </section>

      {/* Department Filter Pills */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedDept("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDept === "All"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Departments ({doctors.length})
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDept.toLowerCase() === dept.name.toLowerCase()
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Grid List */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DoctorList doctorsList={filteredDoctors} />
        </div>
      </section>
    </div>
  );
}

export default DoctorsPage;
