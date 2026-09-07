import React, { useState, useEffect } from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Heart, Brain, Activity, Stethoscope, ShieldCheck, CheckCircle, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

const DEFAULT_DEPT_IMAGES = {
  cardiology: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
  neurology: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
  gastroenterology: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
  nephrology: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  oncology: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
  orthopedics: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  pediatrics: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
  emergency: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
  "general medicine": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800"
};

const getDeptImage = (dept) => {
  if (dept.image && dept.image.trim().length > 0) return dept.image;
  const nameLower = (dept.name || "").toLowerCase();
  for (const key in DEFAULT_DEPT_IMAGES) {
    if (nameLower.includes(key)) return DEFAULT_DEPT_IMAGES[key];
  }
  return "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800";
};

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
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Super Speciality Departments ({departments.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Equipped with cutting-edge medical technology and senior consultants at Briskode Hospital, OMFED Square, Patia.
            </p>
          </div>
        </section>

        {/* Catalog Grid with Department Images */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-xs font-semibold text-slate-500">Loading departments...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept) => {
                const deptDocs = doctors.filter((d) => d.department?._id === dept._id || d.department === dept._id || d.department?.name === dept.name);
                const deptCover = getDeptImage(dept);
                return (
                  <div key={dept._id} className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group">
                    <div>
                      {/* Department Cover Photo */}
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={deptCover}
                          alt={dept.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <span className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{deptDocs.length} Specialists</span>
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-extrabold text-slate-900">{dept.name}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {dept.description || "Comprehensive diagnostic, clinical, and surgical super-speciality care with 24/7 emergency response."}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-3">
                      <div className="text-[11px] font-semibold text-slate-600">
                        <strong className="font-extrabold text-slate-800">Specialists: </strong>
                        {deptDocs.length > 0 ? deptDocs.map((d) => d.name).join(", ") : "Assigned Senior Consultants"}
                      </div>

                      <Link
                        to="/contact"
                        className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Book OPD Pass</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
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
