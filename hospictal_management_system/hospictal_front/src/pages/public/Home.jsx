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
  Sparkles,
  Ambulance
} from "lucide-react";
import { toast } from "react-toastify";
// Reusable Smooth Scroll Entrance Animation Component
function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const currentDom = domRef.current;
    if (currentDom) observer.observe(currentDom);

    return () => {
      if (currentDom) observer.unobserve(currentDom);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100 scale-100";
    if (direction === "up") return "translate-y-12 opacity-0 scale-[0.97]";
    if (direction === "left") return "-translate-x-12 opacity-0 scale-[0.97]";
    if (direction === "right") return "translate-x-12 opacity-0 scale-[0.97]";
    return "translate-y-12 opacity-0 scale-[0.97]";
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}

const DEFAULT_HOMEPAGE_DOCTORS = [
  {
    _id: "doc-default-1",
    name: "Dr. Arvind Kapoor",
    department: { name: "Cardiology" },
    specialization: "Chief Interventional Cardiologist",
    qualification: "MD (Med), DM (Cardiology), FACC",
    consultationFee: 800,
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "doc-default-2",
    name: "Dr. Meera Deshmukh",
    department: { name: "Neurology" },
    specialization: "Senior Neuro Surgeon & Stroke Specialist",
    qualification: "MBBS, MS (Sur), MCh (Neurosurgery)",
    consultationFee: 900,
    profileImage: "https://images.unsplash.com/photo-1594824813566-78a05c7553b4?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "doc-default-3",
    name: "Dr. Rajesh Verma",
    department: { name: "Gastroenterology" },
    specialization: "Senior Gastroenterology Consultant",
    qualification: "MD, DM (Gastroenterology)",
    consultationFee: 750,
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
  },
  {
    _id: "doc-default-4",
    name: "Dr. Sunita Patnaik",
    department: { name: "Pediatrics" },
    specialization: "Senior Pediatrician & Neonatologist",
    qualification: "MD (Pediatrics), DCH",
    consultationFee: 650,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
  }
];

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
        const list = res.data?.staff || res.data?.doctors || res.data?.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setBackendDoctors(list);
        } else {
          // Try /api/doctors endpoint
          const docRes = await API.get("/doctors");
          const docList = docRes.data?.data || docRes.data?.doctors || docRes.data?.staff || [];
          if (Array.isArray(docList) && docList.length > 0) {
            setBackendDoctors(docList);
          } else {
            setBackendDoctors(DEFAULT_HOMEPAGE_DOCTORS);
          }
        }
      } catch (err) {
        console.error("Error fetching doctors on home page:", err);
        try {
          const docRes = await API.get("/doctors");
          const docList = docRes.data?.data || docRes.data?.doctors || docRes.data?.staff || [];
          setBackendDoctors(Array.isArray(docList) && docList.length > 0 ? docList : DEFAULT_HOMEPAGE_DOCTORS);
        } catch (e) {
          setBackendDoctors(DEFAULT_HOMEPAGE_DOCTORS);
        }
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchBackendDoctors();
  }, []);

  const heroSlides = [
    {
      title: "Compassionate Care. Advanced Medicine.",
      subtitle: "The Language of Healing & Hope",
      description: "Capital Public Seva Hospital — Providing 24/7 world-class multi-specialty care, cutting-edge trauma response, and empathetic clinical excellence.",
      quote: "“Compassion is the quiet language spoken by gentle hands, heard by weary hearts, and understood beyond all words.”",
      meaning: "True medicine treats the whole person — restoring health, renewing lives, and serving humanity with heartfelt warmth.",
      ctaText: "Book Appointment",
      ctaLink: "/contact",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1600",
      badges: [
        { label: "NABH Accredited", icon: Award },
        { label: "24×7 Emergency", icon: Ambulance }
      ]
    },
    {
      title: "Where Science Meets Soul",
      subtitle: "The Essence of Restoring Lives",
      description: "Equipped with state-of-the-art cath labs, modular OTs, and 3D intraoperative neuro navigation for optimal patient recovery.",
      quote: "“The highest art of medicine is to restore not merely bodily strength, but the joy, dignity, and true meaning of living.”",
      meaning: "Every life saved is a testament to unyielding dedication, bringing peace of mind to families.",
      ctaText: "Explore Super Specialities",
      ctaLink: "/departments",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
      badges: [
        { label: "50+ Specialists", icon: Users },
        { label: "Ayushman PM-JAY Cashless", icon: ShieldCheck }
      ]
    },
    {
      title: "24×7 Emergency & Trauma Response",
      subtitle: "Grace & Comfort in Every Hour",
      description: "Immediate level-1 casualty response, advanced cardiac ambulances, and round-the-clock emergency ICU consultants.",
      quote: "“In every act of clinical service lies an eternal grace: lighting up another's darkest hour with comfort and strength.”",
      meaning: "Care beyond cure — honoring human dignity through every step of emergency response and healing.",
      ctaText: "Emergency Helpline",
      ctaLink: "/contact",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600",
      badges: [
        { label: "Level-1 Trauma Center", icon: ShieldCheck },
        { label: "24×7 Ambulance Service", icon: Ambulance }
      ]
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
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
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
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
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
      text: "We utilized our Ayushman Bharat PM-JAY card smoothly without any hassle. The billing reception counter and helpdesk guided us at every step. Truly world-class hospital!"
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
        {/* 2. HERO MOTION SLIDER CAROUSEL WITH STYLISH FONTS, ATTRACTIVE LANGUAGE & MEANING */}
        <section className="relative bg-slate-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center overflow-hidden">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image (Absolute z-0 so it stays behind text overlay) */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out z-0 opacity-75"
              />

              {/* Dark Overlays for High Contrast Readability (z-10) */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-10" />
              <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply z-10" />

              {/* Text & Stylish Quote Content Container (z-20) */}
              <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 h-full flex flex-col justify-center py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Heading, Subtitle, Description & Badges */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Top Tag badge with Cinzel/Great Vibes font */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="bg-emerald-950/90 text-emerald-300 font-cinzel text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-md uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Capital Public Seva
                      </span>
                      <span className="font-great-vibes text-amber-300 text-xl font-normal drop-shadow">
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-xl">
                      {slide.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap gap-3.5 items-center">
                      <Link
                        to={slide.ctaLink || "/contact"}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-xl transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2"
                      >
                        <span>{slide.ctaText || "Contact Us"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/contact"
                        className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full backdrop-blur-md border border-white/30 transition-all"
                      >
                        Book OPD Pass
                      </Link>
                    </div>

                    {/* Pill Badges */}
                    <div className="flex flex-wrap gap-2.5 pt-2 items-center">
                      {slide.badges.map((b, i) => {
                        const IconComponent = b.icon;
                        return (
                          <div
                            key={i}
                            className="bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-200 flex items-center gap-2 shadow-md"
                          >
                            <IconComponent className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>{b.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Glassmorphism Quote Card with Stylish Font & Deep Meaning */}
                  <div className="lg:col-span-5">
                    <div className="bg-slate-950/85 border border-emerald-500/40 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl space-y-3.5 relative overflow-hidden">
                      <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none"></div>

                      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                        <span className="font-great-vibes text-2xl text-amber-300">Language of Healing</span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-900/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          Deep Meaning
                        </span>
                      </div>

                      {/* Stylish Quote in Playfair Display Serif */}
                      <blockquote className="relative pt-1">
                        <span className="text-emerald-500/30 font-serif text-5xl leading-none absolute -top-3 -left-3 select-none">“</span>
                        <p className="font-playfair italic text-white text-base sm:text-lg leading-relaxed pl-3 drop-shadow-md">
                          {slide.quote}
                        </p>
                      </blockquote>

                      {/* Meaning in Cormorant Garamond */}
                      <div className="pt-2.5 border-t border-emerald-500/20 space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="shrink-0 text-amber-400 text-[10px] font-bold font-sans uppercase tracking-wider bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded mt-0.5">
                            Meaning
                          </span>
                          <p className="font-cormorant italic text-sm text-emerald-100 font-medium leading-tight">
                            {slide.meaning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Circular Navigation Arrow Buttons matching reference screenshot */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            className="absolute left-6 z-30 w-11 h-11 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl border border-white/80 transition-all transform hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-6 z-30 w-11 h-11 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl border border-white/80 transition-all transform hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? "w-8 bg-[#2e9e62]" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </section>

        {/* TRUST STATS HERO COUNTER BAR */}
        <section className="bg-slate-900 border-y border-slate-800 py-6 px-4 text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-blue-400">500+</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hospital Beds</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-teal-400">50+</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Senior Consultants</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-400">24/7</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Emergency & Trauma</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-purple-400">100%</h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ayushman Bharat PM-JAY Cashless</p>
            </div>
          </div>
        </section>

        {/* 3. OUR COMMITMENTS GRID */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-extrabold mb-2">
                <Sparkles className="w-4 h-4" /> BRISKODE PUBLIC HOSPITAL
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Commitments</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">Delivering world-class healthcare with transparency, competency, and empathy.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={100}>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Most Advanced Technology</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipped with modern cath-labs, 3D neuro navigation, and modular OTs at Patia, Bhubaneswar.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Commitment to Serve</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dedicated to serving every citizen with high-quality medical care and human compassion.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Transparency & Ethics</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fostering complete trust with ethical clinical pricing and patient-first medical decisions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Ultimate Clinical Outcome</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consistently delivering best-in-class recovery outcomes across all tertiary specialities.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 4. OUR SUPER SPECIALITIES SECTION (MATCHING REFERENCE DESIGN 1:1) */}
        <section className="py-16 bg-[#eef6fc] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Banner & Top-Right Pill */}
            <ScrollReveal direction="up">
              <div className="relative mb-12 flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1b365d] tracking-tight text-center">
                  Our Super Specialities
                </h2>
                <div className="sm:absolute right-0 top-1 mt-4 sm:mt-0 bg-white text-slate-700 font-bold px-4 py-1.5 rounded-full text-xs shadow-sm border border-slate-200/80">
                  Our care spans across
                </div>
              </div>
            </ScrollReveal>

            {/* Overlapping Layout Container */}
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 mt-8">
              
              {/* Left Menu / Sidebar Tabs */}
              <ScrollReveal direction="left" className="w-full lg:w-80 flex-shrink-0 z-10">
                <div className="bg-[#2b548b] rounded-2xl overflow-hidden shadow-xl border border-[#234778]">
                  {[
                    { id: "cardiac", label: "Cardiac Sciences" },
                    { id: "neuro", label: "Neuro Sciences" },
                    { id: "gastro", label: "Gastro Sciences" },
                    { id: "renal", label: "Renal Sciences" },
                    { id: "onco", label: "Onco Sciences" }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left py-4 px-6 font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2.5 border-b border-[#3764a0] last:border-b-0 cursor-pointer ${
                          isActive
                            ? "bg-[#2e9e62] text-white font-extrabold shadow-inner"
                            : "bg-[#2b548b] text-white hover:bg-[#234878]"
                        }`}
                      >
                        <span className="font-black text-lg leading-none">+</span>
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Center Overlapping Circular Image with Green Border & Green Badge */}
              <div className="relative lg:-mx-16 z-20 flex-shrink-0 my-4 lg:my-0">
                {/* Floating Icon Badge with + */}
                <div className="absolute -top-3 right-6 sm:right-10 z-30 flex items-center gap-1.5">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 bg-[#2e9e62] text-white rounded-full shadow-2xl border-4 border-white flex items-center justify-center">
                    <Activity className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <span className="text-[#2e9e62] font-black text-2xl leading-none">+</span>
                </div>

                {/* Circular Image Ring */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[7px] border-[#2e9e62] p-1 bg-white shadow-2xl overflow-hidden">
                  <img
                    src={specialitiesData[activeTab].image}
                    alt={specialitiesData[activeTab].title}
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>
              </div>

              {/* Right White Content Card */}
              <ScrollReveal direction="right" className="w-full lg:flex-1">
                <div className="bg-white rounded-3xl p-8 sm:p-12 lg:pl-20 shadow-xl border border-slate-100 min-h-[360px] flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1b365d] mb-3">
                    {specialitiesData[activeTab].title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                    {specialitiesData[activeTab].description}
                  </p>

                  <div className="space-y-3">
                    {specialitiesData[activeTab].bullets.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#2e9e62] flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* DYNAMIC SENIOR CONSULTANTS & DOCTORS FROM BACKEND MONGODB */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 block mb-1">OUR MEDICAL TEAM</span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Senior Consultants & Clinical Specialists
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Expert doctors across all super-speciality departments at Patia, Bhubaneswar</p>
                </div>

                <Link
                  to="/doctors"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                >
                  View All Doctors Directory <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            {loadingDocs ? (
              <div className="text-center py-8 text-xs font-semibold text-slate-500">Loading doctors from server...</div>
            ) : backendDoctors.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No doctors found in database</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {backendDoctors.slice(0, 4).map((doc, idx) => {
                  const deptName = doc.department?.name || "General Medicine";
                  return (
                    <ScrollReveal key={doc._id} delay={idx * 120} direction="up">
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-full group">
                        <div className="space-y-3">
                          <div className="relative overflow-hidden rounded-2xl">
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
                          <div>
                            <h3 className="font-extrabold text-sm text-slate-900">{doc.name}</h3>
                            <p className="text-xs font-bold text-blue-600">{deptName}</p>
                            <p className="text-[11px] text-slate-600 font-medium mt-1">{doc.specialization}</p>
                            <p className="text-[10px] text-slate-400">{doc.qualification || "MD, MBBS"}</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-900">OPD Pass Available</span>
                          <Link to="/contact" className="text-[11px] font-extrabold text-teal-600 hover:underline">
                            Book Pass
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 5. PARTNERS & AYUSHMAN BHARAT SCHEME */}
        <section className="py-16 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-emerald-700">
                    CASHLESS SCHEMES & EMPANELMENTS
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
                    Ayushman Bharat & Insurance Partners
                  </h2>
                </div>
                <Link
                  to="/pmjay-scheme"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
                >
                  Learn About PM-JAY Scheme <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ScrollReveal delay={100} direction="up">
                <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 border-emerald-500 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center font-black text-emerald-700 text-xs border border-emerald-200">
                    PM-JAY
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Ayushman Bharat Yojana (PM-JAY)</h4>
                    <p className="text-[10px] text-slate-500">Government Cashless Health Card</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} direction="up">
                <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 border-blue-500 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-black text-blue-600 text-xs border border-blue-200">
                    LIC
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Life Insurance Corporation (LIC)</h4>
                    <p className="text-[10px] text-slate-500">Empanelled Health Partner</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} direction="up">
                <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 border-purple-500 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center font-black text-purple-600 text-xs border border-purple-200">
                    PNB
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Punjab National Bank (PNB)</h4>
                    <p className="text-[10px] text-slate-500">Corporate Empanelled Partner</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 6. ULTIMATE REVIEWS (AUTHENTIC ODISHA PATIENT FEEDBACK SLIDER) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollReveal direction="up">
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
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setReviewIndex((prev) => (prev + 1) % odishaReviews.length)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odishaReviews.slice(reviewIndex, reviewIndex + 3).concat(
              reviewIndex + 3 > odishaReviews.length
                ? odishaReviews.slice(0, (reviewIndex + 3) % odishaReviews.length)
                : []
            ).slice(0, 3).map((rev, idx) => (
              <ScrollReveal key={idx} delay={idx * 150} direction="up">
                <div
                  className="bg-white p-6 rounded-3xl border-2 border-emerald-500/60 shadow-lg relative flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full"
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
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 7. ENQUIRE NOW FORM */}
        <section className="py-16 bg-slate-100/70 border-t border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <ScrollReveal direction="left">
                  <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
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
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7">
                <ScrollReveal direction="right">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
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
                          <option value="Ayushman Bharat PM-JAY Query">Ayushman Bharat PM-JAY Government Scheme Query</option>
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
            </ScrollReveal>
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
