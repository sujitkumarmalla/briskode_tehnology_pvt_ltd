import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ContactForm from "../components/Contact/ContactForm";

function ContactPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <section className="bg-gradient-to-r from-slate-900 to-teal-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-teal-400 font-extrabold text-xs uppercase tracking-widest bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
            Reach Out to Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">Contact Capital Public Seva</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions regarding treatments, admissions, insurance claims, or visiting hours? We are here to help.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Main Contact Us iframe Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl overflow-hidden">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Interactive Location & Contact Portal</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Navigate directly to Capital Public Seva Hospital or find directions using our interactive map.
                </p>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                Live Google Maps
              </span>
            </div>
            <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title="Capital Public Seva Hospital Contact Us Map"
                src="https://maps.google.com/maps?q=Janpath%20Road,%20New%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                  Hospital Location & Contacts
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Hospital Address</span>
                      <p className="text-slate-500 leading-relaxed mt-0.5">
                        Capital Public Seva Hospital, 12, Janpath Road, New Delhi, India - 110001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">Emergency Hotline (24/7)</span>
                      <a href="tel:+911145678900" className="text-rose-600 font-extrabold hover:underline">
                        +91 11-4567-8900
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.101-2.885-6.968C16.588 1.951 14.12 1.93 11.5 1.93 6.064 1.93 1.64 6.35 1.637 11.794c-.001 1.716.463 3.393 1.342 4.915l-.982 3.582 3.658-.96c1.479.807 3.09 1.233 4.609 1.222zM18.06 14.85c-.328-.164-1.942-.958-2.242-1.069-.3-.109-.519-.164-.738.164-.219.328-.847 1.069-1.039 1.288-.192.219-.384.246-.712.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.825-2.274-.192-.329-.02-.507.144-.671.147-.148.328-.383.493-.574.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.574-.082-.164-.738-1.778-1.012-2.434-.267-.641-.561-.553-.768-.564-.199-.01-.428-.012-.657-.012-.229 0-.602.086-.917.429-.315.343-1.202 1.176-1.202 2.871 0 1.696 1.233 3.332 1.403 3.56.17.228 2.427 3.705 5.877 5.197.82.355 1.46.567 1.96.726.824.262 1.575.225 2.167.137.66-.099 1.942-.794 2.216-1.56.274-.767.274-1.423.192-1.56-.082-.137-.3-.219-.628-.383z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">WhatsApp Helpdesk</span>
                      <a href="https://wa.me/917787814476" target="_blank" rel="noreferrer" className="text-emerald-600 font-extrabold hover:underline">
                        +91 77878 14476
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
