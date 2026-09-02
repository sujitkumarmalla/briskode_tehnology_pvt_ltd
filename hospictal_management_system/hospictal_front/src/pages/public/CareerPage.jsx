import React, { useState } from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { Briefcase, Send, CheckCircle, Clock, MapPin, Building2 } from "lucide-react";
import { toast } from "react-toastify";

export default function CareerPage() {
  const [applicant, setApplicant] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "Staff Nurse (ICU)",
    experience: "2-3 Years",
    coverLetter: ""
  });

  const jobs = [
    {
      id: 1,
      title: "ICU Staff Nurse (GNM / B.Sc Nursing)",
      department: "Nursing Care",
      type: "Full Time",
      location: "OMFED Square, Patia, Bhubaneswar",
      experience: "2+ Years in Critical Care"
    },
    {
      id: 2,
      title: "Resident Medical Officer (RMO - MBBS)",
      department: "Emergency & Casualty",
      type: "Full Time / Shift",
      location: "OMFED Square, Patia, Bhubaneswar",
      experience: "1+ Year Hospital Experience"
    },
    {
      id: 3,
      title: "Senior Cath-Lab Technician",
      department: "Cardiac Sciences",
      type: "Full Time",
      location: "OMFED Square, Patia, Bhubaneswar",
      experience: "3+ Years Cath-Lab Experience"
    },
    {
      id: 4,
      title: "Hospital Pharmacist (D.Pharm / B.Pharm)",
      department: "Pharmacy & Dispensing",
      type: "Full Time",
      location: "OMFED Square, Patia, Bhubaneswar",
      experience: "Registered Pharmacist with License"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicant.fullName || !applicant.phone) {
      return toast.error("Please enter your name and phone number");
    }
    toast.success(`Application submitted for ${applicant.position}! HR team will contact you.`);
    setApplicant({ fullName: "", email: "", phone: "", position: "Staff Nurse (ICU)", experience: "2-3 Years", coverLetter: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-[#1b365d] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-extrabold px-3 py-1 rounded-full border border-teal-400/40 uppercase">
              JOIN OUR MEDICAL TEAM
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Careers at Briskode Hospital
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Build a rewarding medical career with Odisha's leading 500+ bedded super-speciality hospital at OMFED Square, Patia.
            </p>
          </div>
        </section>

        {/* Job Listings & Application Form */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Open Vacancies */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600" /> Current Job Openings ({jobs.length})
              </h2>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-lg transition-all space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">{job.title}</h3>
                        <p className="text-xs font-bold text-blue-600 mt-0.5">{job.department}</p>
                      </div>
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-200">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 font-medium border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> Req: {job.experience}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">Online Job Application</h3>
              <p className="text-xs text-slate-500">Apply directly to Briskode Hospital HR Department</p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Select Position *</label>
                  <select
                    value={applicant.position}
                    onChange={(e) => setApplicant({ ...applicant, position: e.target.value })}
                    className="w-full p-3 border rounded-xl font-semibold bg-slate-50"
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.title}>{j.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicant.fullName}
                    onChange={(e) => setApplicant({ ...applicant, fullName: e.target.value })}
                    placeholder="Subrat Mohanty"
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={applicant.phone}
                    onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    placeholder="9823011223"
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={applicant.email}
                    onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Brief Cover Note / Experience Summary</label>
                  <textarea
                    rows={3}
                    value={applicant.coverLetter}
                    onChange={(e) => setApplicant({ ...applicant, coverLetter: e.target.value })}
                    placeholder="Detail your clinical background..."
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
