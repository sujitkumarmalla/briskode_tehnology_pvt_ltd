import { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import ServiceCard from "../components/Services/ServiceCard";
import DepartmentCard from "../components/Departments/DepartmentCard";
import DoctorCard from "../components/Doctors/DoctorCard";
import PackageCard from "../components/Packages/PackageCard";
import TestimonialCard from "../components/Testimonials/TestimonialCard";
import FAQAccordion from "../components/FAQ/FAQAccordion";
import ContactForm from "../components/Contact/ContactForm";

import { services } from "../data/services";
import { departments } from "../data/departments";
import { doctors as defaultDoctors } from "../data/doctors";
import { packages as defaultPackages } from "../data/packages";
import { testimonials } from "../data/testimonials";
import { fetchDoctors, fetchPackages } from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [doctorsList, setDoctorsList] = useState(defaultDoctors);
  const [packagesList, setPackagesList] = useState(defaultPackages);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [docRes, pkgRes] = await Promise.all([
          fetchDoctors(),
          fetchPackages()
        ]);
        if (docRes && docRes.success && Array.isArray(docRes.data) && docRes.data.length > 0) {
          setDoctorsList(docRes.data);
        }
        if (pkgRes && pkgRes.success && Array.isArray(pkgRes.data) && pkgRes.data.length > 0) {
          setPackagesList(pkgRes.data);
        }
      } catch (err) {
        console.error("Error fetching homepage data from MongoDB database:", err);
      }
    };
    loadHomeData();
  }, []);

  // Duplicate array for seamless infinite marquee loop
  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Medical Services Section - Light Mint Green Theme */}
      <section className="py-12 bg-emerald-50/60 border-y border-emerald-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <span className="text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Our Clinical Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">Comprehensive Clinical Care</h2>
            <p className="text-xs text-emerald-900/80 font-medium">
              High-quality multi-specialty healthcare services designed around patient wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <span>View All Services</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Specialized Centers / Departments Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <span className="text-teal-700 font-extrabold text-[11px] uppercase tracking-widest bg-teal-100/70 px-2.5 py-0.5 rounded-full border border-teal-200">
              Medical Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Specialized Centers of Excellence</h2>
            <p className="text-xs text-slate-600 font-medium">
              Dedicated clinical departments staffed by leading consultants and modern infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-12 bg-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">Meet Our Expert Doctors</h2>
              <p className="text-xs text-emerald-900/80 mt-1 font-medium">
                Top-rated specialists dedicated to providing advanced therapeutic solutions.
              </p>
            </div>
            <Link
              to="/doctors"
              className="mt-3 sm:mt-0 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
            >
              <span>View All Doctors</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorsList.slice(0, 3).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Health Checkup Packages Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <span className="text-emerald-700 font-extrabold text-[11px] uppercase tracking-widest bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Preventive Healthcare
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Health Checkup Packages</h2>
            <p className="text-xs text-slate-600 font-medium">
              Affordable diagnostic packages tailored for individuals, executives, and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packagesList.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg._id || pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* News-Channel Style Auto-Moving Testimonials Ticker - Mint Green Theme */}
      <section className="py-12 bg-emerald-950 text-white overflow-hidden border-y border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-300 font-extrabold text-[10px] uppercase tracking-widest bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-800">
                  Live Patient News & Reviews
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What Our Patients Say</h2>
            </div>
            <span className="text-[11px] text-emerald-200 font-bold bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
              Hover to pause ticker
            </span>
          </div>
        </div>

        {/* Continuous Marquee Ticker Track */}
        <div className="relative w-full overflow-hidden py-2 bg-emerald-900/40">
          <div className="animate-marquee">
            {marqueeTestimonials.map((item, idx) => (
              <TestimonialCard key={`${item.id}-${idx}`} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <span className="text-teal-700 font-extrabold text-[11px] uppercase tracking-widest bg-teal-100/70 px-2.5 py-0.5 rounded-full border border-teal-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Need Help or Clarity?</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 2-Column Section: Direct Message (Left) & Hospital Location Map (Right) */}
      <section className="py-12 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default Home;
