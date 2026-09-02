import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import NotFoundPage from "./NotFoundPage";
import { doctors as defaultDoctors } from "../data/doctors";
import { fetchDoctors } from "../services/api";

function DoctorDetailsPage() {
  const { id } = useParams();
  const [doctorsList, setDoctorsList] = useState(defaultDoctors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetchDoctors();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDoctorsList(res.data);
        }
      } catch (err) {
        console.error("Error fetching doctor details from MongoDB database:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  const doctor = doctorsList.find((d) => String(d.id) === String(id) || String(d._id) === String(id));

  if (!doctor) {
    return <NotFoundPage message="The requested doctor profile could not be found." />;
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Doctors", path: "/doctors" },
          { label: doctor.name }
        ]}
      />

      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-10">
            
            <div className="md:col-span-4 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg h-80 bg-slate-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  {doctor.department}
                </span>
                <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200 flex items-center space-x-1">
                  <svg className="w-3.5 h-3.5 fill-current text-amber-500" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{doctor.rating} Rating</span>
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900">{doctor.name}</h1>
              <p className="text-sm font-semibold text-emerald-600">{doctor.specialization} — {doctor.qualification}</p>

              <p className="text-xs text-slate-600 leading-relaxed pt-2">{doctor.bio}</p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block">Experience</span>
                  <span className="font-bold text-slate-900 text-sm">{doctor.experience} Years</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Consultation Fee</span>
                  <span className="font-bold text-emerald-600 text-sm">₹{doctor.consultationFee}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Schedule Days</span>
                  <span className="font-bold text-slate-900 text-sm">{doctor.availability}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to={`/appointment?doctorId=${doctor.id}`}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-emerald-200"
                >
                  Book Appointment with {doctor.name.split(" ")[1]}
                </Link>
                <a
                  href={`https://wa.me/917787814476?text=${encodeURIComponent(`Hello, I would like to inquire about booking a slot with ${doctor.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-2"
                >
                  <span>Inquire via WhatsApp (+91 77878 14476)</span>
                </a>
              </div>
            </div>

          </div>

          {/* Details Tabs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Certifications */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Certifications & Fellowships</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {doctor.certifications?.map((cert, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Patient Reviews */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <span>Verified Patient Reviews</span>
              </h3>
              <div className="space-y-3">
                {doctor.reviews?.map((rev, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">{rev.name}</span>
                      <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                    </div>
                    <p className="text-slate-500 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default DoctorDetailsPage;
