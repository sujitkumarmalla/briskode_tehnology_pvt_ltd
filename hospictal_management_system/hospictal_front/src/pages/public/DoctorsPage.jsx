import React, { useState, useEffect } from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Stethoscope, Calendar, Clock, Search, Award } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import { toast } from "react-toastify";

const DEFAULT_DOCTORS = [
  {
    _id: "doc-default-1",
    name: "Dr. Arvind Kapoor",
    department: { name: "Cardiology" },
    specialization: "Chief Interventional Cardiologist",
    qualification: "MD (Med), DM (Cardiology), FACC",
    consultationFee: 800,
    workingHours: "09:00 AM - 05:00 PM",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "doc-default-2",
    name: "Dr. Meera Deshmukh",
    department: { name: "Neurology" },
    specialization: "Senior Neuro Surgeon & Stroke Specialist",
    qualification: "MBBS, MS (Sur), MCh (Neurosurgery)",
    consultationFee: 900,
    workingHours: "10:00 AM - 06:00 PM",
    profileImage: "https://images.unsplash.com/photo-1594824813566-78a05c7553b4?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "doc-default-3",
    name: "Dr. Rajesh Verma",
    department: { name: "Gastroenterology" },
    specialization: "Senior Gastroenterology Consultant",
    qualification: "MD, DM (Gastroenterology)",
    consultationFee: 750,
    workingHours: "09:00 AM - 04:00 PM",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "doc-default-4",
    name: "Dr. Sunita Patnaik",
    department: { name: "Pediatrics" },
    specialization: "Senior Pediatrician & Neonatologist",
    qualification: "MD (Pediatrics), DCH",
    consultationFee: 650,
    workingHours: "08:30 AM - 03:30 PM",
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
  }
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docRes, deptRes] = await Promise.all([
          API.get("/users?role=DOCTOR").catch(() => null),
          API.get("/departments").catch(() => null)
        ]);

        let docList = docRes?.data?.staff || docRes?.data?.doctors || docRes?.data?.data || [];

        if (!Array.isArray(docList) || docList.length === 0) {
          const altRes = await API.get("/doctors").catch(() => null);
          docList = altRes?.data?.data || altRes?.data?.doctors || altRes?.data?.staff || [];
        }

        setDoctors(Array.isArray(docList) && docList.length > 0 ? docList : DEFAULT_DOCTORS);
        if (deptRes?.data?.success) setDepartments(deptRes.data.departments || []);
      } catch (err) {
        console.error("Failed to fetch doctors list:", err);
        setDoctors(DEFAULT_DOCTORS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const deptName = doc.department?.name || "";
    const matchesDept = !selectedDept || doc.department?._id === selectedDept || doc.department === selectedDept;
    const matchesSearch = !searchTerm || (
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deptName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#1b365d] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-extrabold px-3 py-1 rounded-full border border-teal-400/40 uppercase">
              BRISKODE HOSPITAL DOCTOR DIRECTORY
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Senior Consultants & Specialists
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Meet our renowned senior specialists across all clinical departments at Briskode Hospital, Patia, Bhubaneswar.
            </p>
          </div>
        </section>

        {/* Search & Department Filters */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by doctor name or speciality..."
                className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Department Select Filter */}
            <div className="w-full sm:w-64">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-bold text-slate-800 shadow-sm"
              >
                <option value="">All Departments ({departments.length})</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Doctor Grid */}
          {loading ? (
            <div className="py-12 text-center text-xs font-semibold text-slate-500">
              Loading doctors from server...
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
              No doctors found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doc) => {
                const deptName = doc.department?.name || "General Medicine";
                return (
                  <div key={doc._id} className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="relative overflow-hidden">
                        <img
                          src={doc.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300"}
                          alt={doc.name}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Visible Text Overlay Badge on Picture */}
                        <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20 shadow-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{deptName} • OPD Available</span>
                        </div>
                        {/* Fee Badge Overlay on Picture Bottom */}
                        <div className="absolute bottom-2.5 right-2.5 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-blue-400/30 shadow-md">
                          ₹{doc.consultationFee || 500}
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-extrabold text-base text-slate-900">{doc.name}</h3>
                        <p className="text-xs font-bold text-blue-600">{deptName}</p>
                        <p className="text-[11px] text-slate-600 font-medium">{doc.specialization}</p>
                        <p className="text-[10px] text-slate-400">{doc.qualification || "MD, MBBS"}</p>
                        <div className="pt-2 text-[11px] text-slate-600 space-y-1">
                          <p className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {doc.workingHours || "09:00 AM - 04:00 PM"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                      <Link
                        to="/contact"
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Calendar className="w-4 h-4 text-slate-950" /> Book OPD Pass
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
