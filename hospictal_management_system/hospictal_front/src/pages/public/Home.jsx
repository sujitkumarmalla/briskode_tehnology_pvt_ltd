import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import {
  Phone,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Award,
  Users,
  Send,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { toast } from "react-toastify";
import API from "../../utils/api";

export default function Home() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic Backend Doctors State
  const [backendDoctors, setBackendDoctors] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    const fetchBackendDoctors = async () => {
      try {
        const res = await API.get("/users?role=DOCTOR");
        if (res.data.success) {
          setBackendDoctors(res.data.staff);
        }
      } catch (err) {
        console.error("Error fetching doctors on home page:", err);
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchBackendDoctors();
  }, []);

  const heroSlides = [
    {
      title: "Briskode Public Hospital",
      subtitle: "Compassionate care, advanced medicine for all",
      description: "Your trusted 500+ bedded super-speciality destination at OMFED Square, Patia, Bhubaneswar.",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1600",
      badges: ["NABH Accredited", "Ayushman PM-JAY Cashless", "24x7 Emergency"]
    },
    {
      title: "24/7 Emergency & Trauma Center",
      subtitle: "Rapid response, life-saving critical care in Patia",
      description: "State-of-the-art ICU, Cath-Lab & level 1 casualty response in Bhubaneswar.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
      badges: ["Level 1 Trauma Care", "Advanced ICU Ambulances"]
    },
    {
      title: "Centers of Excellence",
      subtitle: "Cardiac, Neuro, Gastro & Surgical Super Specialities",
      description: "Renowned senior specialists & cutting-edge diagnostic technology under one roof.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600",
      badges: ["NABL Diagnostic Lab", "12 Modular OTs"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Super Specialities Tab State
  const [activeTab, setActiveTab] = useState("cardiac");

  const specialitiesData = {
    cardiac: {
      title: "Cardiac Sciences & Cath-Lab",
      description: "From preventive heart health to emergency primary angioplasty — our cardiac team at Patia delivers round-the-clock diagnosis, intervention, and recovery.",
      bullets: [
        "24/7 Primary angioplasty and cath-lab emergency activation",
        "3D Echo, ECG, Holter monitoring, and stress testing",
        "Interventional cardiology and valve replacement procedures",
        "Specialized clinics for heart failure, hypertension & arrhythmia"
      ],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    },
    neuro: {
      title: "Neuro Sciences & Stroke Unit",
      description: "Comprehensive care for stroke management, neuro-trauma, brain tumours, and spine disorders with 3D intraoperative navigation.",
      bullets: [
        "Hyperacute stroke thrombolysis & thrombectomy care",
        "Minimally invasive spine surgery & brain tumor resection",
        "Pediatric neurology and epilepsy care",
        "Advanced video EEG & sleep telemetry lab"
      ],
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
    },
    gastro: {
      title: "Gastroenterology & HPB Surgery",
      description: "Advanced medical gastroenterology, HPB surgery, and liver transplant care with high-definition endoscopic suites.",
      bullets: [
        "Diagnostic & therapeutic ERCP and capsule endoscopy",
        "Liver clinic for hepatitis, cirrhosis & fatty liver disease",
        "Laparoscopic GI oncology surgical procedures",
        "Inflammatory bowel disease (IBD) comprehensive care"
      ],
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800"
    },
    renal: {
      title: "Renal Sciences & Dialysis",
      description: "Dedicated kidney care center providing 24/7 maintenance hemodialysis, kidney transplantation, and laser lithotripsy stone care.",
      bullets: [
        "24/7 Hemodialysis, CRRT & peritoneal dialysis",
        "Living donor kidney transplant program",
        "Laser lithotripsy for kidney & prostate stones",
        "Hypertension & diabetic nephropathy management"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    },
    onco: {
      title: "Onco Sciences & Chemotherapy",
      description: "Integrated cancer center featuring medical oncology, surgical oncology, and precision targeted chemotherapy treatments.",
      bullets: [
        "Multidisciplinary tumor board for personalized treatment plans",
        "Day-care chemotherapy & immunotherapy suites",
        "Organ-preserving cancer surgical procedures",
        "Palliative care & psycho-oncology support"
      ],
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1cdb?auto=format&fit=crop&q=80&w=800"
    }
  };

  // Odisha Reviews State (Horizontal Comment Slider)
  const [reviewIndex, setReviewIndex] = useState(0);

  const odishaReviews = [
    {
      name: "Subrat Kumar Mohanty",
      location: "OMFED Square, Patia, Bhubaneswar",
      rating: 5,
      text: "Capital Public Seva Hospital has set a new benchmark in Odisha healthcare. The emergency ICU team and cardiologists treated my father during a midnight heart episode with prompt care."
    },
    {
      name: "Ananya Pattnaik",
      location: "CDA Sector 9, Cuttack",
      rating: 5,
      text: "Extremely clean hospital environment, polite nursing staff, and seamless OPD token system. Dr. Arvind Kapoor explained the treatment plan with great empathy."
    },
    {
      name: "Bikash Chandra Sahoo",
      location: "VIP Road, Puri",
      rating: 5,
      text: "We utilized our Odisha BSKY card smoothly without any hassle. The billing reception counter and helpdesk guided us at every step. Truly world-class hospital!"
    },
    {
      name: "Rashmi Rekha Rout",
      location: "Civil Township, Rourkela",
      rating: 5,
      text: "Top-notch pathology laboratory services. Received accurate CBC and blood culture reports on the same day directly through the portal."
    },
    {
      name: "Manas Ranjan Behera",
      location: "Bareipali, Sambalpur",
      rating: 5,
      text: "The round-the-clock emergency response team is phenomenal. Prompt ambulance arrival and immediate doctor attention upon reaching the casualty unit."
    },
    {
      name: "Priyamvada Das",
      location: "Giri Road, Berhampur",
      rating: 5,
      text: "Highly professional doctors and modern diagnostic equipment right here in Bhubaneswar. The staff behavior is very warm and supportive."
    }
  ];

  // Enquiry Form State
  const [enquiry, setEnquiry] = useState({
    serviceType: "OPD Consultation",
    fullName: "",
    email: "",
    phone: ""
  });

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiry.fullName || !enquiry.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    toast.success(`Thank you ${enquiry.fullName}! Our medical team will call you shortly.`);
    setEnquiry({ serviceType: "OPD Consultation", fullName: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      {/* 1. PUBLIC TOP BAR & NAVBAR */}
      <PublicNavbar />

      <main className="flex-1">
        {/* 2. HERO MOTION SLIDER CAROUSEL */}
        <section className="relative bg-slate-950 text-white min-h-[500px] sm:min-h-[580px] flex items-center overflow-hidden">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Content */}
              <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-center py-20">
                <div className="max-w-2xl space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {slide.badges.map((b, i) => (
                      <span key={i} className="bg-blue-600/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-blue-400/40 shadow-sm">
                        {b}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-xl font-semibold text-blue-300">
                    {slide.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {slide.description}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-xl shadow-blue-600/40 transition-all transform hover:-translate-y-0.5"
                    >
                      <Calendar className="w-4 h-4" /> Book OPD Pass Now
                    </Link>
                    <Link
                      to="/departments"
                      className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs px-6 py-3.5 rounded-xl border border-slate-700 backdrop-blur-md transition-all"
                    >
                      Explore Specialities <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            className="absolute left-4 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? "w-8 bg-blue-500" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* 3. OUR COMMITMENTS GRID */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-extrabold mb-2">
              <Sparkles className="w-4 h-4" /> BRISKODE PUBLIC HOSPITAL
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Commitments</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Delivering world-class healthcare with transparency, competency, and empathy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Most Advanced Technology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with modern cath-labs, 3D neuro navigation, and modular OTs at Patia, Bhubaneswar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Commitment to Serve</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated to serving every citizen with high-quality medical care and human compassion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Transparency & Ethics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fostering complete trust with ethical clinical pricing and patient-first medical decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Ultimate Clinical Outcome</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistently delivering best-in-class recovery outcomes across all tertiary specialities.
              </p>
            </div>
          </div>
        </section>

        {/* 4. OUR SUPER SPECIALITIES INTERACTIVE TABS */}
        <section className="py-16 bg-blue-50/50 border-y border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-1">SUPER SPECIALITIES</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Clinical Centers of Excellence</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">Tertiary medical expertise under one roof at OMFED Square, Patia</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Tabs */}
              <div className="lg:col-span-4 space-y-2">
                {[
                  { id: "cardiac", label: "Cardiac Sciences", icon: Heart },
                  { id: "neuro", label: "Neuro Sciences", icon: Brain },
                  { id: "gastro", label: "Gastro Sciences", icon: Activity },
                  { id: "renal", label: "Renal Sciences", icon: Stethoscope },
                  { id: "onco", label: "Onco Sciences", icon: ShieldCheck }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Display Card */}
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="relative flex justify-center">
                    <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-emerald-500 p-1.5 shadow-2xl relative overflow-hidden">
                      <img
                        src={specialitiesData[activeTab].image}
                        alt={specialitiesData[activeTab].title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-slate-900">{specialitiesData[activeTab].title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {specialitiesData[activeTab].description}
                    </p>

                    <div className="space-y-2">
                      {specialitiesData[activeTab].bullets.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors"
                      >
                        Book Speciality Doctor <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DYNAMIC SENIOR CONSULTANTS & DOCTORS FROM BACKEND MONGODB */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-1">OUR MEDICAL TEAM</span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Senior Consultants & Doctors ({backendDoctors.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">Direct live feed from Briskode Hospital clinical database</p>
              </div>

              <Link
                to="/doctors"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                View All Doctors Directory <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loadingDocs ? (
              <div className="text-center py-8 text-xs font-semibold text-slate-500">Loading doctors from server...</div>
            ) : backendDoctors.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No doctors found in database</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {backendDoctors.slice(0, 4).map((doc) => {
                  const deptName = doc.department?.name || "General Medicine";
                  return (
                    <div key={doc._id} className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <img
                          src={doc.profileImage || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300"}
                          alt={doc.name}
                          className="w-full h-44 object-cover rounded-2xl"
                        />
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900">{doc.name}</h3>
                          <p className="text-xs font-bold text-blue-600">{deptName}</p>
                          <p className="text-[11px] text-slate-600 font-medium mt-1">{doc.specialization}</p>
                          <p className="text-[10px] text-slate-400">{doc.qualification || "MD, MBBS"}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-900">OPD Fee: ₹{doc.consultationFee || 500}</span>
                        <Link to="/contact" className="text-[11px] font-extrabold text-teal-600 hover:underline">
                          Book Pass
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 5. PARTNERS & BSKY ODISHA SCHEME */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-emerald-700">
                  CASHLESS SCHEMES & EMPANELMENTS
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
                  BSKY Odisha & Insurance Partners
                </h2>
              </div>
              <Link
                to="/bsky-scheme"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
              >
                Learn About BSKY Scheme <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 border-emerald-500">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center font-black text-emerald-700 text-base border border-emerald-200">
                  BSKY
                </div>
                <div>
                  <h4 className="font-bold text-xs">Biju Swasthya Kalyan Yojana (BSKY)</h4>
                  <p className="text-[10px] text-slate-500">Odisha Government Cashless Health Card</p>
                </div>
              </div>

              <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 border-blue-500">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-black text-blue-600 text-xs border border-blue-200">
                  LIC
                </div>
                <div>
                  <h4 className="font-bold text-xs">Life Insurance Corporation (LIC)</h4>
                  <p className="text-[10px] text-slate-500">Empanelled Health Partner</p>
                </div>
              </div>

              <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 border-purple-500">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center font-black text-purple-600 text-xs border border-purple-200">
                  PNB
                </div>
                <div>
                  <h4 className="font-bold text-xs">Punjab National Bank (PNB)</h4>
                  <p className="text-[10px] text-slate-500">Corporate Empanelled Partner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ULTIMATE REVIEWS (AUTHENTIC ODISHA PATIENT FEEDBACK SLIDER) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-1">PATIENT FEEDBACK</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                PATIENT REVIEWS & RECOVERY STORIES
              </h2>
              <p className="text-xs text-slate-500 mt-1">Real experiences shared by patients across Odisha</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setReviewIndex((prev) => (prev === 0 ? odishaReviews.length - 1 : prev - 1))}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setReviewIndex((prev) => (prev + 1) % odishaReviews.length)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odishaReviews.slice(reviewIndex, reviewIndex + 3).concat(
              reviewIndex + 3 > odishaReviews.length
                ? odishaReviews.slice(0, (reviewIndex + 3) % odishaReviews.length)
                : []
            ).slice(0, 3).map((rev, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border-2 border-emerald-500/60 shadow-lg relative flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <p className="text-xs text-slate-700 leading-relaxed font-medium mb-6 italic">
                  "{rev.text}"
                </p>
                <div>
                  <div className="flex text-amber-400 text-xs mb-1">
                    {"★".repeat(rev.rating)}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{rev.name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{rev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ENQUIRE NOW FORM */}
        <section className="py-16 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-6">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white">ENQUIRE NOW!</h3>
                <p className="text-xs text-slate-300 mt-2">
                  Please fill in your details — our clinical team at Patia will contact you shortly.
                </p>

                <div className="mt-8 pt-6 border-t border-slate-800 text-xs space-y-2">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">OPD Consultation Schedule</p>
                  <p className="font-bold text-sm text-emerald-400">Mon–Sat 9:00 am - 6:00 pm</p>
                  <p className="text-slate-400 text-[11px]">OMFED Square, Patia, Bhubaneswar, Odisha 751024</p>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Type of Service *</label>
                    <select
                      value={enquiry.serviceType}
                      onChange={(e) => setEnquiry({ ...enquiry, serviceType: e.target.value })}
                      className="w-full p-3 border border-slate-200 rounded-xl font-semibold bg-slate-50 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="OPD Consultation">OPD Doctor Consultation</option>
                      <option value="Health Checkup Package">Executive Health Checkup Package</option>
                      <option value="BSKY Odisha Query">BSKY Odisha Government Scheme Query</option>
                      <option value="Diagnostic & Lab Test">Diagnostic & Lab Test</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={enquiry.fullName}
                        onChange={(e) => setEnquiry({ ...enquiry, fullName: e.target.value })}
                        placeholder="e.g. Subrat Mohanty"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={enquiry.email}
                        onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                        placeholder="name@gmail.com"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={enquiry.phone}
                      onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                      placeholder="+91 98230 00000"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <Send className="w-4 h-4" /> Send Enquiry Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. REUSABLE FOOTER */}
      <Footer />

      {/* 9. FLOATING 24/7 RED EMERGENCY CALL BUTTON */}
      <a
        href="tel:+9106742740000"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-5 py-3.5 rounded-full shadow-2xl border-2 border-white transition-all scale-105 hover:scale-110"
      >
        <Phone className="w-5 h-5 animate-bounce" />
        <span>Emergency Helpline</span>
      </a>
    </div>
  );
}
