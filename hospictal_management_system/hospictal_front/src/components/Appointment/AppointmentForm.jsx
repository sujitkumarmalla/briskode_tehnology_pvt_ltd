import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { doctors as defaultDoctors } from "../../data/doctors";
import { departments } from "../../data/departments";
import { createAppointment, fetchDoctors } from "../../services/api";
import { toast } from "react-toastify";

function AppointmentForm() {
  const [searchParams] = useSearchParams();
  const preSelectedDoctorId = searchParams.get("doctorId");
  const preSelectedPackage = searchParams.get("package");

  const [doctorsList, setDoctorsList] = useState(defaultDoctors);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetchDoctors();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDoctorsList(res.data);
        }
      } catch (err) {
        console.error("Error fetching doctors for appointment form from MongoDB:", err);
      }
    };
    loadDoctors();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    department: "",
    doctorId: preSelectedDoctorId || "",
    appointmentDate: "",
    appointmentTime: "10:00 AM",
    reason: preSelectedPackage ? `Health Package: ${preSelectedPackage}` : "General Consultation",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // Filtered doctors based on selected department
  const filteredDoctors = formData.department
    ? doctorsList.filter(
        (d) =>
          d.department.toLowerCase().includes(formData.department.toLowerCase()) ||
          formData.department.toLowerCase().includes(d.department.toLowerCase())
      )
    : doctorsList;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.appointmentDate) newErrors.appointmentDate = "Select an appointment date";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Form Validation Error: Please correct invalid or missing fields before proceeding.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setBookingSuccess(null);

    try {
      const response = await createAppointment(formData);
      setBookingSuccess(response);
      toast.success(`🎉 Appointment Booked! Ref: ${response.bookingId}`);
    } catch (err) {
      console.error("Booking submission error:", err);
      toast.error("Failed to schedule appointment. Please check connection.");
      setErrors({ server: "Failed to book appointment. Please try again or call support." });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!bookingSuccess) return;
    const msg = `Hello Capital Public Seva Hospital! My Booking Ref is ${bookingSuccess.bookingId}.
Name: ${formData.fullName}
Doctor: ${doctors.find((d) => String(d.id) === String(formData.doctorId))?.name || "General Specialist"}
Date: ${formData.appointmentDate} at ${formData.appointmentTime}
Phone: ${formData.phone}`;
    window.open(`https://wa.me/917787814476?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (bookingSuccess) {
    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-lg animate-fade-in">
        <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-200">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Appointment Confirmed!</h3>
        <p className="text-xs text-slate-600 mb-4">
          Thank you <span className="font-bold text-slate-900">{formData.fullName}</span>. Your appointment has been registered under booking ref:
        </p>
        <div className="bg-white py-3 px-6 rounded-2xl border border-emerald-200 inline-block mb-6 shadow-sm">
          <span className="text-sm font-extrabold text-emerald-700 tracking-wider">
            {bookingSuccess.bookingId}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 text-left text-xs space-y-2 mb-6 border border-slate-100 text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-400">Date & Time:</span>
            <span className="font-bold">{formData.appointmentDate} ({formData.appointmentTime})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Department:</span>
            <span className="font-bold">{formData.department || "General Consultation"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Contact Phone:</span>
            <span className="font-bold">{formData.phone}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Send Confirmation to Hospital WhatsApp (+91 77878 14476)</span>
          </button>

          <button
            onClick={() => setBookingSuccess(null)}
            className="w-full py-2.5 px-6 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-extrabold text-slate-900">Book Patient Appointment</h3>
        <p className="text-xs text-slate-500 mt-1">Fill in the details below to schedule your hospital consultation.</p>
      </div>

      {errors.server && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-semibold">
          {errors.server}
        </div>
      )}

      {/* Patient Information Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            className={`w-full px-4 py-2.5 text-xs rounded-xl border ${
              errors.fullName ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
            } focus:outline-none focus:ring-2`}
          />
          {errors.fullName && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.fullName}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ramesh@example.com"
            className={`w-full px-4 py-2.5 text-xs rounded-xl border ${
              errors.email ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
            } focus:outline-none focus:ring-2`}
          />
          {errors.email && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={`w-full px-4 py-2.5 text-xs rounded-xl border ${
              errors.phone ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
            } focus:outline-none focus:ring-2`}
          />
          {errors.phone && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.phone}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-xs rounded-xl border ${
              errors.dob ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
            } focus:outline-none focus:ring-2`}
          />
          {errors.dob && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.dob}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Medical Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Doctor</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">Any Available Specialist</option>
            {filteredDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} - {doc.specialization} (Fee: ₹{doc.consultationFee})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Appointment Date *</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full px-4 py-2.5 text-xs rounded-xl border ${
              errors.appointmentDate ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:ring-emerald-200"
            } focus:outline-none focus:ring-2`}
          />
          {errors.appointmentDate && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.appointmentDate}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
          <select
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="09:00 AM">09:00 AM - 10:00 AM</option>
            <option value="10:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:30 AM">11:30 AM - 12:30 PM</option>
            <option value="02:00 PM">02:00 PM - 03:00 PM</option>
            <option value="04:00 PM">04:00 PM - 05:00 PM</option>
            <option value="06:00 PM">06:00 PM - 07:00 PM</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit / Symptoms</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="e.g. Routine checkup, Heart pain, Fever, Knee pain"
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Additional Message (Optional)</label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Specify any existing medical conditions or previous treatment notes..."
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Processing Booking..." : "Confirm & Schedule Appointment"}
      </button>
    </form>
  );
}

export default AppointmentForm;
