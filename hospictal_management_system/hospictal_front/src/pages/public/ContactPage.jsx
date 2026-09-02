import React, { useState } from "react";
import PublicNavbar from "../../components/common/PublicNavbar";
import Footer from "../../components/common/Footer";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General Medicine",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      return toast.error("Please enter your name and phone number");
    }
    toast.success(`Thank you ${formData.name}! Your message has been received.`);
    setFormData({ name: "", email: "", phone: "", department: "General Medicine", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="bg-blue-900/80 text-blue-300 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-700 uppercase">
              REACH US IN BHUBANESWAR
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Contact & Location Details
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Located at OMFED Square, Patia, Bhubaneswar. Round-the-clock emergency casualty and ambulance response.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Info Box */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold">Briskode Public Hospital</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Hospital Address:</p>
                    <p className="text-slate-300 leading-relaxed">OMFED Square, Patia, Bhubaneswar, Odisha 751024</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">24/7 Casualty & Emergency:</p>
                    <p className="text-red-400 font-extrabold text-sm">+91 0674 2 740 000</p>
                    <p className="text-slate-400 text-[10px]">Toll Free: 1800 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">OPD Consultation Schedule:</p>
                    <p className="text-emerald-400 font-semibold">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Email Enquiries:</p>
                    <p className="text-slate-300">care@capitalpublicseva.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">Send an Enquiry or Book OPD Pass</h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Subrat Mohanty"
                      className="w-full p-3 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9823011223"
                      className="w-full p-3 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className="w-full p-3 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full p-3 border rounded-xl font-semibold"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Message / Clinical Requirements</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details..."
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Request
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
