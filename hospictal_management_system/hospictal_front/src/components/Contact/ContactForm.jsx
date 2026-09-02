import { useState } from "react";
import { sendContactMessage } from "../../services/api";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      const errMsg = "Validation Error: Please fill in all required fields (Name, Email, Message).";
      setStatus({ loading: false, success: false, error: errMsg });
      toast.error(errMsg);
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      await sendContactMessage(formData);
      setStatus({ loading: false, success: true, error: "" });
      toast.success("Message sent successfully! Our desk will get back to you.");
    } catch (err) {
      console.error("Contact submission error:", err);
      const errMsg = "Failed to send message. Please try again.";
      setStatus({ loading: false, success: false, error: errMsg });
      toast.error(errMsg);
    }
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello Capital Public Seva Hospital!
Name: ${formData.name || "Inquirer"}
Email: ${formData.email || "N/A"}
Phone: ${formData.phone || "N/A"}
Subject: ${formData.subject || "General Inquiry"}
Message: ${formData.message || "I would like to inquire about hospital services."}`;

    window.open(`https://wa.me/917787814476?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Div: Direct Message Form */}
      <div className="lg:col-span-7 bg-[#F0FDF4] rounded-2xl p-6 border border-emerald-200/90 shadow-xs">
        <h3 className="text-lg font-extrabold text-emerald-950 mb-1">Send Us a Direct Message</h3>
        <p className="text-xs text-emerald-900/80 mb-4 font-medium">Have questions? Fill in your details and our desk will respond promptly.</p>

        {status.error && (
          <div className="p-2.5 mb-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200">
            {status.error}
          </div>
        )}

        {status.success ? (
          <div className="p-6 bg-emerald-100/70 text-emerald-950 text-center rounded-xl border border-emerald-300 space-y-3">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-sm font-bold">Message Sent Successfully!</h4>
            <p className="text-xs text-emerald-900/80">Our representative will get back to you within 2-4 hours.</p>
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="mt-2 inline-flex items-center space-x-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all"
            >
              <span>Chat via WhatsApp (+91 77878 14476)</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Anish Gupta"
                className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-emerald-950 font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="anish@example.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-emerald-950 font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 00000"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-emerald-950 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Inquiry regarding MRI Scan cost"
                className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-emerald-950 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">Your Message *</label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message or clinical question here..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-emerald-950 font-medium"
                required
              ></textarea>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <button
                type="submit"
                disabled={status.loading}
                className="flex-1 py-2.5 px-4 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg transition-all cursor-pointer shadow-xs"
              >
                {status.loading ? "Sending..." : "Submit Inquiry"}
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>WhatsApp Desk</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Div: Hospital Location Map */}
      <div className="lg:col-span-5 bg-[#F0FDF4] rounded-2xl p-6 border border-emerald-200/90 shadow-xs flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-extrabold text-emerald-950 mb-1">Hospital Location</h3>
          <p className="text-xs text-emerald-900/80 mb-4 font-medium">Capital Public Seva Hospital, 12, Janpath Road, New Delhi</p>

          {/* Interactive Google Map Embed */}
          <div className="rounded-xl overflow-hidden border border-emerald-300 h-56 mb-4 relative bg-emerald-50">
            <iframe
              title="Hospital Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.164627192809!2d77.2177!3d28.6244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d1d1d1d%3A0x1d1d1d1d1d1d1d1d!2sJanpath%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="space-y-2 text-xs text-emerald-950 font-medium">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-emerald-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Janpath Road, Connaught Place, New Delhi - 110001</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-emerald-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Emergency Helpline: +91 11-4567-8900</span>
            </div>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Janpath+Road+New+Delhi"
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full text-center py-2 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold rounded-lg transition-colors border border-emerald-300"
        >
          Get Directions on Google Maps
        </a>
      </div>

    </div>
  );
}

export default ContactForm;
