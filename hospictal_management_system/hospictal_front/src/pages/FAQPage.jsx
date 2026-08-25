import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import FAQAccordion from "../components/FAQ/FAQAccordion";
import { Link } from "react-router-dom";

function FAQPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Frequently Asked Questions" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Patient Support & Information
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
