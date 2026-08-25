import { useState } from "react";

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How can I book an appointment with a specialist doctor?",
      answer: "You can book an appointment directly through our online 'Book Appointment' page, call our 24/7 helpline at +91 11-4567-8900, or chat directly with our reception desk on WhatsApp (+91 77878 14476)."
    },
    {
      question: "Do you provide 24/7 emergency and trauma care services?",
      answer: "Yes, Capital Public Seva Hospital has a fully operational 24/7 Level-1 Trauma & Emergency Unit backed by dedicated ICU ambulances, emergency surgeons, and cardiac cath lab facilities."
    },
    {
      question: "What documents should I bring for my first consultation?",
      answer: "Please bring a valid Government ID proof, previous medical history/prescriptions, recent diagnostic report copies, and health insurance card (if applying for cashless claims)."
    },
    {
      question: "Can I choose a specific doctor for my consultation?",
      answer: "Absolutely! You can choose your preferred doctor by selecting their profile from our Doctors list or selecting their name during the online appointment scheduling process."
    },
    {
      question: "What are the hospital visiting hours for admitted patients?",
      answer: "Visiting hours for general wards and private rooms are from 04:00 PM to 07:00 PM daily. Only one visitor pass is permitted per patient to ensure a quiet healing environment."
    },
    {
      question: "Do you accept health insurance and cashless claims?",
      answer: "Yes, we partner with all major TPA health insurance providers in India for cashless hospitalizations. Our insurance helpdesk assists with pre-authorizations 24/7."
    }
  ];

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left p-5 flex justify-between items-center space-x-4 cursor-pointer focus:outline-none"
          >
            <span className="text-sm font-bold text-slate-800">{faq.question}</span>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-emerald-600 bg-emerald-50 flex-shrink-0 transition-transform duration-300 ${
              openIndex === idx ? "rotate-180 bg-emerald-600 text-white" : ""
            }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          
          {openIndex === idx && (
            <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;
