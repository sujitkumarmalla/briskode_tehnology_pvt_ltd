import React, { useState, useEffect } from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Heart, Brain, Activity, Stethoscope, ShieldCheck, CheckCircle, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, docRes] = await Promise.all([
          API.get("/departments"),
          API.get("/users?role=DOCTOR")
        ]);
        if (deptRes.data.success) setDepartments(deptRes.data.departments);
        if (docRes.data.success) setDoctors(docRes.data.staff);
      } catch (err) {
        console.error("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#1b365d] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-extrabold px-3 py-1 rounded-full border border-teal-400/40 uppercase">
              BRISKODE HOSPITAL DEPARTMENTS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Super Speciality Departments ({departments.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Equipped with cutting-edge medical technology and senior consultants at Briskode Hospital, OMFED Square, Patia.
            </p>
          </div>
        </section>

        {/* Catalog */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-xs font-semibold text-slate-500">Loading departments...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.map((dept) => {
                const deptDocs = doctors.filter((d) => d.department?._id === dept._id || d.department === dept._id || d.department?.name === dept.name);
                return (
                  <div key={dept._id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">{dept.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {dept.description || "Comprehensive diagnostic, clinical, and surgical super-speciality care with 24/7 emergency response."}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">
                        Specialists: {deptDocs.length > 0 ? deptDocs.map((d) => d.name).join(", ") : "Assigned Senior Consultants"}
                      </span>
                      <Link to="/contact" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        Book OPD Pass <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
