import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import Modal from "../../components/common/Modal";
import { Stethoscope, Pill, FlaskConical, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function ConsultationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(location.state?.appointment || null);
  const [medicinesCatalog, setMedicinesCatalog] = useState([]);
  const [labCatalog, setLabCatalog] = useState([]);

  // Form State
  const [vitals, setVitals] = useState({
    bloodPressure: "120/80",
    heartRate: "75 bpm",
    temperature: "98.6 °F",
    weight: "70 kg",
    height: "170 cm"
  });

  const [chiefComplaint, setChiefComplaint] = useState(location.state?.appointment?.reason || "");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");

  // Prescribed items & Lab orders list
  const [prescribedMedicines, setPrescribedMedicines] = useState([]);
  const [labOrders, setLabOrders] = useState([]);

  // Modals
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  // Rx Modal Item Form
  const [rxForm, setRxForm] = useState({
    medicineId: "",
    medicineName: "",
    dosage: "500mg",
    frequency: "1-0-1",
    duration: "5 Days",
    quantity: 10,
    instructions: "After food"
  });

  // Lab Modal Form
  const [labForm, setLabForm] = useState({
    testName: "",
    priority: "Normal",
    clinicalNotes: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptRes, medRes, labRes] = await Promise.all([
          API.get("/appointments?status=Checked-In"),
          API.get("/pharmacy/medicines"),
          API.get("/lab/catalog")
        ]);
        if (apptRes.data.success) {
          setAppointments(apptRes.data.appointments);
          if (!selectedAppointment && apptRes.data.appointments.length > 0) {
            setSelectedAppointment(apptRes.data.appointments[0]);
          }
        }
        if (medRes.data.success) {
          setMedicinesCatalog(medRes.data.medicines);
          if (medRes.data.medicines.length > 0) {
            setRxForm(prev => ({
              ...prev,
              medicineId: medRes.data.medicines[0]._id,
              medicineName: medRes.data.medicines[0].name
            }));
          }
        }
        if (labRes.data.success) {
          setLabCatalog(labRes.data.catalog);
          if (labRes.data.catalog.length > 0) {
            setLabForm(prev => ({ ...prev, testName: labRes.data.catalog[0].name }));
          }
        }
      } catch (err) {
        toast.error("Failed to load consultation data");
      }
    };
    fetchData();
  }, []);

  const handleAddMedicine = () => {
    if (!rxForm.medicineName) return;
    setPrescribedMedicines([...prescribedMedicines, { ...rxForm }]);
    setIsRxModalOpen(false);
    toast.info(`Added ${rxForm.medicineName} to prescription`);
  };

  const handleRemoveMedicine = (idx) => {
    setPrescribedMedicines(prescribedMedicines.filter((_, i) => i !== idx));
  };

  const handleAddLabOrder = () => {
    if (!labForm.testName) return;
    setLabOrders([...labOrders, { ...labForm }]);
    setIsLabModalOpen(false);
    toast.info(`Added ${labForm.testName} to lab requests`);
  };

  const handleRemoveLabOrder = (idx) => {
    setLabOrders(labOrders.filter((_, i) => i !== idx));
  };

  const handleSaveConsultation = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return toast.error("Please select a patient appointment");
    if (!chiefComplaint || !diagnosis) return toast.error("Chief Complaint and Diagnosis are required");

    try {
      // 1. Save Consultation
      const consultRes = await API.post("/consultations", {
        appointmentId: selectedAppointment._id,
        patientId: selectedAppointment.patient._id,
        chiefComplaint,
        symptoms,
        vitals,
        diagnosis,
        clinicalNotes,
        treatmentPlan
      });

      const consultId = consultRes.data.consultation._id;

      // 2. Save Prescription if items added
      if (prescribedMedicines.length > 0) {
        await API.post("/prescriptions", {
          patientId: selectedAppointment.patient._id,
          consultationId: consultId,
          appointmentId: selectedAppointment._id,
          medicines: prescribedMedicines.map(m => ({
            medicine: m.medicineId || undefined,
            medicineName: m.medicineName,
            dosage: m.dosage,
            frequency: m.frequency,
            duration: m.duration,
            quantity: Number(m.quantity),
            instructions: m.instructions
          }))
        });
      }

      // 3. Save Lab Requests if ordered
      if (labOrders.length > 0) {
        for (const lab of labOrders) {
          await API.post("/lab/requests", {
            patientId: selectedAppointment.patient._id,
            consultationId: consultId,
            appointmentId: selectedAppointment._id,
            testName: lab.testName,
            priority: lab.priority,
            clinicalNotes: lab.clinicalNotes
          });
        }
      }

      toast.success("Consultation & medical records saved successfully!");
      navigate("/doctor/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save consultation");
    }
  };

  const patient = selectedAppointment?.patient;

  return (
    <div className="space-y-6">
      {/* Appointment Selector */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Clinical Consultation Encounter</h2>
          <p className="text-xs text-slate-500">Record patient diagnosis, vitals, prescriptions, and lab orders</p>
        </div>

        <div className="w-full sm:w-80">
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Checked-In Patient Queue</label>
          <select
            value={selectedAppointment?._id || ""}
            onChange={(e) => {
              const appt = appointments.find(a => a._id === e.target.value);
              setSelectedAppointment(appt);
              if (appt?.reason) setChiefComplaint(appt.reason);
            }}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
          >
            {appointments.length === 0 ? (
              <option value="">No patients currently checked in</option>
            ) : (
              appointments.map(a => (
                <option key={a._id} value={a._id}>
                  {a.tokenNumber || "A-00"} | {a.patient?.name} ({a.patient?.patientId})
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {patient && (
        <form onSubmit={handleSaveConsultation} className="space-y-6">
          {/* Patient Info Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Patient Name</p>
              <p className="font-bold text-sm text-white mt-0.5">{patient.name}</p>
              <p className="text-[10px] font-mono text-blue-300">{patient.patientId}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Demographics</p>
              <p className="font-semibold text-slate-200 mt-0.5">{patient.age} Yrs / {patient.gender}</p>
              <p className="text-[10px] text-slate-300">Phone: {patient.phone}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Blood Group</p>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-red-600 text-white font-bold text-xs rounded">
                {patient.bloodGroup || "Unknown"}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold">Allergies / Notes</p>
              <p className="text-[11px] text-rose-300 font-semibold mt-0.5">
                {patient.allergies?.length > 0 ? patient.allergies.join(", ") : "No known allergies"}
              </p>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Patient Vitals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={vitals.bloodPressure}
                  onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                  placeholder="120/80"
                  className="w-full p-2 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Heart Rate</label>
                <input
                  type="text"
                  value={vitals.heartRate}
                  onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                  placeholder="75 bpm"
                  className="w-full p-2 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Temperature</label>
                <input
                  type="text"
                  value={vitals.temperature}
                  onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                  placeholder="98.6 °F"
                  className="w-full p-2 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Weight</label>
                <input
                  type="text"
                  value={vitals.weight}
                  onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                  placeholder="70 kg"
                  className="w-full p-2 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Height</label>
                <input
                  type="text"
                  value={vitals.height}
                  onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                  placeholder="170 cm"
                  className="w-full p-2 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Clinical Findings & Diagnosis */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Chief Complaint *</label>
                <input
                  type="text"
                  required
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g. High fever, chest tightness, chronic headache"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Acute Viral Fever / Upper Respiratory Infection"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-blue-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Clinical Notes & Observations</label>
                <textarea
                  rows={3}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Detailed clinical evaluation, examination notes..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Treatment Plan & Dietary Advice</label>
                <textarea
                  rows={3}
                  value={treatmentPlan}
                  onChange={(e) => setTreatmentPlan(e.target.value)}
                  placeholder="Advised bed rest, hydration, follow-up instructions..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Prescription & Lab Requests Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prescription Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-800 text-sm">Prescribed Medicines</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRxModalOpen(true)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Medicine
                </button>
              </div>

              <div className="divide-y divide-slate-100 min-h-[100px]">
                {prescribedMedicines.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-6">No medicines added to prescription.</p>
                ) : (
                  prescribedMedicines.map((m, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{m.medicineName} <span className="text-slate-500 font-normal">({m.dosage})</span></p>
                        <p className="text-[10px] text-slate-500">Freq: {m.frequency} | Duration: {m.duration} | Qty: {m.quantity} ({m.instructions})</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(i)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Lab Requests Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-800 text-sm">Laboratory Test Requests</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLabModalOpen(true)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Order Test
                </button>
              </div>

              <div className="divide-y divide-slate-100 min-h-[100px]">
                {labOrders.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-6">No laboratory tests requested.</p>
                ) : (
                  labOrders.map((l, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{l.testName}</p>
                        <p className="text-[10px] text-slate-500">Priority: <span className="font-semibold text-amber-700">{l.priority}</span></p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLabOrder(i)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Action Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" /> Save Complete Consultation & Notify Staff
            </button>
          </div>
        </form>
      )}

      {/* Add Medicine Modal */}
      <Modal isOpen={isRxModalOpen} onClose={() => setIsRxModalOpen(false)} title="Prescribe Medicine">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Medicine *</label>
            <select
              value={rxForm.medicineId}
              onChange={(e) => {
                const med = medicinesCatalog.find(m => m._id === e.target.value);
                setRxForm({ ...rxForm, medicineId: e.target.value, medicineName: med?.name || "" });
              }}
              className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold"
            >
              {medicinesCatalog.map((m) => (
                <option key={m._id} value={m._id}>{m.name} ({m.category}) - Stock: {m.stockQuantity}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Dosage</label>
              <input
                type="text"
                value={rxForm.dosage}
                onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                placeholder="500mg"
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
              <input
                type="text"
                value={rxForm.frequency}
                onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })}
                placeholder="1-0-1 or 1-1-1"
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={rxForm.duration}
                onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })}
                placeholder="5 Days"
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Quantity</label>
              <input
                type="number"
                value={rxForm.quantity}
                onChange={(e) => setRxForm({ ...rxForm, quantity: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructions</label>
            <input
              type="text"
              value={rxForm.instructions}
              onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
              placeholder="After food / Before food"
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setIsRxModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMedicine}
              className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
            >
              Add to Prescription
            </button>
          </div>
        </div>
      </Modal>

      {/* Order Lab Test Modal */}
      <Modal isOpen={isLabModalOpen} onClose={() => setIsLabModalOpen(false)} title="Order Laboratory Test">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Lab Test *</label>
            <select
              value={labForm.testName}
              onChange={(e) => setLabForm({ ...labForm, testName: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold"
            >
              {labCatalog.map((t) => (
                <option key={t._id} value={t.name}>{t.name} ({t.category}) - ₹{t.price}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Priority</label>
            <select
              value={labForm.priority}
              onChange={(e) => setLabForm({ ...labForm, priority: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setIsLabModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLabOrder}
              className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              Add Lab Request
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
