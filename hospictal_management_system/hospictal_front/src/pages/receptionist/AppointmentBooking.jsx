import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import Modal from "../../components/common/Modal";
import PrintableOPDSlip from "../../components/common/PrintableOPDSlip";
import { Calendar, Clock, CheckCircle, Search, User, Stethoscope, Building2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AppointmentBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form selections - default to empty string so user/receptionist must explicitly select!
  const [selectedPatientId, setSelectedPatientId] = useState(location.state?.patient?._id || "");
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState("09:30 AM");
  const [reason, setReason] = useState("OPD Consultation");
  const [doctorSearch, setDoctorSearch] = useState("");

  // Booked Appointment for Printing Slip Modal
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patRes, deptRes, docRes] = await Promise.all([
          API.get("/patients"),
          API.get("/departments"),
          API.get("/users?role=DOCTOR")
        ]);
        if (patRes.data.success) {
          setPatients(patRes.data.patients);
          if (!selectedPatientId && patRes.data.patients.length > 0) {
            setSelectedPatientId(patRes.data.patients[0]._id);
          }
        }
        if (deptRes.data.success) {
          setDepartments(deptRes.data.departments);
        }
        if (docRes.data.success) {
          setDoctors(docRes.data.staff);
        }
      } catch (err) {
        toast.error("Failed to load booking parameters");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter doctors based on selected department and doctor search text
  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = !selectedDeptId || (doc.department?._id === selectedDeptId || doc.department === selectedDeptId);
    const matchesSearch = !doctorSearch || (
      doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(doctorSearch.toLowerCase())
    );
    return matchesDept && matchesSearch;
  });

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) return toast.error("Please select a patient record");
    if (!selectedDoctorId) return toast.error("Please select a consulting doctor");
    if (!selectedDate || !selectedTime) return toast.error("Please select appointment date and time");

    try {
      const res = await API.post("/appointments", {
        patientId: selectedPatientId,
        doctorId: selectedDoctorId,
        departmentId: selectedDeptId || undefined,
        date: selectedDate,
        time: selectedTime,
        reason
      });

      if (res.data.success) {
        toast.success(`OPD Appointment Booked! Token: ${res.data.appointment.tokenNumber || 'OPD-A-001'}`);
        setBookedAppointment(res.data.appointment);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Book OPD Doctor Consultation</h2>
          <p className="text-xs text-slate-500 font-medium">Select patient, department, and doctor to generate OPD token pass</p>
        </div>
      </div>

      <form onSubmit={handleBook} className="space-y-5 text-xs">
        {/* Step 1: Select Patient */}
        <div>
          <label className="block font-extrabold text-slate-800 mb-1">Step 1: Select Patient Record *</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl font-bold bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Patient Entity --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.patientId}) - Phone: {p.phone}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2 & 3: Department & Doctor Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-extrabold text-slate-800 mb-1">Step 2: OPD Department Filter</label>
            <select
              value={selectedDeptId}
              onChange={(e) => {
                setSelectedDeptId(e.target.value);
                setSelectedDoctorId(""); // Reset doctor choice when department changes so receptionist chooses explicitly!
              }}
              className="w-full p-3 border border-slate-200 rounded-xl font-semibold bg-white text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- All Departments / Select Department --</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-extrabold text-slate-800 mb-1">Step 3: Consulting OPD Doctor *</label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl font-extrabold text-blue-700 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Doctor of Choice --</option>
              {filteredDoctors.length === 0 ? (
                <option value="" disabled>No doctors found in selected department</option>
              ) : (
                filteredDoctors.map((doc) => {
                  const deptName = doc.department?.name || "General";
                  return (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} ({deptName}) — {doc.specialization} — Fee: ₹{doc.consultationFee}
                    </option>
                  );
                })
              )}
            </select>
          </div>
        </div>

        {/* Doctor Search Filter (Optional helper for Receptionist) */}
        <div>
          <label className="block font-semibold text-slate-600 mb-1">Search Doctor by Name (Optional)</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              placeholder="Search doctor name (e.g. Swarna Sarthak, Arvind, Subrat...)"
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800"
            />
          </div>
        </div>

        {/* Step 4: Date & Reason */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-extrabold text-slate-800 mb-1">Step 4: OPD Appointment Date *</label>
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl font-semibold bg-white"
            />
          </div>
          <div>
            <label className="block font-extrabold text-slate-800 mb-1">Reason for Visit / Complaints</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Chest Pain, Routine Consultation"
              className="w-full p-3 border border-slate-200 rounded-xl bg-white"
            />
          </div>
        </div>

        {/* Step 5: Time Slots */}
        <div>
          <label className="block font-extrabold text-slate-800 mb-2">Step 5: Available OPD Time Slots</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs transition-all ${
                  selectedTime === slot
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30 scale-105"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
          >
            <CheckCircle className="w-5 h-5" /> Book OPD & Print Token Slip
          </button>
        </div>
      </form>

      {/* OPD Slip Print Modal */}
      {bookedAppointment && (
        <Modal
          isOpen={!!bookedAppointment}
          onClose={() => {
            setBookedAppointment(null);
            navigate("/receptionist/check-in");
          }}
          title="OPD Token Slip Generated"
          maxWidth="max-w-2xl"
        >
          <PrintableOPDSlip
            appointment={bookedAppointment}
            onClose={() => {
              setBookedAppointment(null);
              navigate("/receptionist/check-in");
            }}
          />
        </Modal>
      )}
    </div>
  );
}
