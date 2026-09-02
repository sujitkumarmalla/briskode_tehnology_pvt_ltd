import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import FAQAccordion from "../components/FAQ/FAQAccordion";
import { Link } from "react-router-dom";

function FAQPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Frequently Asked Questions" }]} />

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
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Find answers to common questions about appointments, insurance claims, hospital policies, and emergency care.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion />

          <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-100 shadow-lg text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Still Have Questions?</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Our patient helpdesk is available 24/7. You can reach out directly via phone or WhatsApp.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/917787814476"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500 transition-colors"
              >
                WhatsApp Us (+91 77878 14476)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;
