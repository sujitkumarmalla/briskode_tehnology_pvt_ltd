import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import DoctorList from "../components/Doctors/DoctorList";
import { doctors as initialDoctors } from "../data/doctors";
import { departments } from "../data/departments";
import { fetchDoctors } from "../services/api";

function DoctorsPage() {
  const [searchParams] = useSearchParams();
  const selectedDeptParam = searchParams.get("department") || "All";

  const [doctorsList, setDoctorsList] = useState(initialDoctors);
  const [selectedDept, setSelectedDept] = useState(selectedDeptParam);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorsData = async () => {
      try {
        const res = await fetchDoctors();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDoctorsList(res.data);
        }
      } catch (err) {
        console.error("Error fetching doctors from MongoDB database:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDoctorsData();
  }, []);

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesDept = selectedDept === "All" || doc.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div>
      <Breadcrumb items={[{ label: "Doctors & Specialists" }]} />

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
            Our Doctors & Specialists
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Consult with our highly qualified, board-certified senior doctors across all medical departments.
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
              All Departments ({doctorsList.length})
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
