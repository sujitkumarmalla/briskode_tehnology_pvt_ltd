import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { UserPlus, Calendar, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    dob: "",
    phone: "",
    address: "",
    bloodGroup: "O+",
    emergencyContact: { name: "", phone: "", relation: "Relative" },
    medicalHistory: "",
    allergies: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post("/patients", {
        ...formData,
        age: Number(formData.age),
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(",").map(s => s.trim()) : [],
        allergies: formData.allergies ? formData.allergies.split(",").map(s => s.trim()) : []
      });

      if (res.data.success) {
        toast.success(`Patient Registered! ID: ${res.data.patient.patientId}`);
        setRegisteredPatient(res.data.patient);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {registeredPatient ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Patient Registered Successfully!</h2>
          <div className="bg-slate-50 p-4 rounded-xl max-w-md mx-auto border border-slate-200 text-xs text-left space-y-1">
            <p><strong>Patient ID:</strong> <span className="font-mono font-bold text-blue-600">{registeredPatient.patientId}</span></p>
            <p><strong>Name:</strong> {registeredPatient.name}</p>
            <p><strong>Phone:</strong> {registeredPatient.phone}</p>
            <p><strong>Age / Gender:</strong> {registeredPatient.age} Yrs / {registeredPatient.gender}</p>
            <p><strong>Blood Group:</strong> {registeredPatient.bloodGroup}</p>
          </div>
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => setRegisteredPatient(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Register Another Patient
            </button>
            <button
              onClick={() => navigate("/receptionist/appointments", { state: { patient: registeredPatient } })}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4" /> Immediately Book Appointment
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">New Patient Registration</h2>
              <p className="text-xs text-slate-500">Auto-generates permanent hospital record ID (PAT-2026-XXXXX)</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ramesh Agarwal"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9823011223"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Age (Years) *</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="45"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl font-bold text-red-600"
                >
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="102 MG Road, Sector 14, Delhi..."
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-800 text-xs">Emergency Contact Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Contact Person Name"
                  value={formData.emergencyContact.name}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, name: e.target.value } })}
                  className="p-2 border border-slate-200 rounded-lg bg-white"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, phone: e.target.value } })}
                  className="p-2 border border-slate-200 rounded-lg bg-white"
                />
                <input
                  type="text"
                  placeholder="Relation (e.g. Spouse/Parent)"
                  value={formData.emergencyContact.relation}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, relation: e.target.value } })}
                  className="p-2 border border-slate-200 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medical History (comma separated)</label>
                <input
                  type="text"
                  placeholder="Hypertension, Diabetes, Asthma"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Known Allergies (comma separated)</label>
                <input
                  type="text"
                  placeholder="Penicillin, Sulfa drugs, Dust"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all disabled:opacity-50"
              >
                {submitting ? "Registering..." : "Complete Registration"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
