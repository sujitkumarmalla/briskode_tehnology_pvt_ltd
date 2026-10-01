import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import Modal from "../../components/common/Modal";
import PrintableLabReport from "../../components/common/PrintableLabReport";
import { Stethoscope, Pill, FlaskConical, Plus, Trash2, CheckCircle2, AlertCircle, Eye, FileText } from "lucide-react";
import { toast } from "react-toastify";

export default function ConsultationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(location.state?.appointment || null);
  const [medicinesCatalog, setMedicinesCatalog] = useState([]);
  const [labCatalog, setLabCatalog] = useState([]);
  const [patientLabResults, setPatientLabResults] = useState([]);
  const [selectedLabReport, setSelectedLabReport] = useState(null);

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

  const [isPharmacySaved, setIsPharmacySaved] = useState(false);
  const [isLabSaved, setIsLabSaved] = useState(false);
  const [isSavingPharmacy, setIsSavingPharmacy] = useState(false);
  const [isSavingLab, setIsSavingLab] = useState(false);

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

  useEffect(() => {
    if (selectedAppointment?.patient?._id) {
      API.get(`/lab/results?patient=${selectedAppointment.patient._id}`)
        .then(res => {
          if (res.data.success) setPatientLabResults(res.data.results);
        })
        .catch(err => console.error("Lab results fetch error:", err));
    } else {
      setPatientLabResults([]);
    }
  }, [selectedAppointment]);

  const handleAddMedicine = () => {
    if (!rxForm.medicineName) return;
    setPrescribedMedicines([...prescribedMedicines, { ...rxForm }]);
    setIsRxModalOpen(false);
    setIsPharmacySaved(false);
    toast.info(`Added ${rxForm.medicineName} to prescription`);
  };

  const handleRemoveMedicine = (idx) => {
    setPrescribedMedicines(prescribedMedicines.filter((_, i) => i !== idx));
    setIsPharmacySaved(false);
  };

  const handleAddLabOrder = () => {
    if (!labForm.testName) return;
    setLabOrders([...labOrders, { ...labForm }]);
    setIsLabModalOpen(false);
    setIsLabSaved(false);
    toast.info(`Added ${labForm.testName} to lab requests`);
  };

  const handleRemoveLabOrder = (idx) => {
    setLabOrders(labOrders.filter((_, i) => i !== idx));
    setIsLabSaved(false);
  };

  const handleSavePharmacy = async () => {
    if (prescribedMedicines.length === 0 || !selectedAppointment) return;
    
    setIsSavingPharmacy(true);
    try {
      await API.post("/prescriptions", {
        patientId: selectedAppointment.patient._id,
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
      setIsPharmacySaved(true);
      toast.success("Medicines saved to Pharmacy successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save pharmacy details");
    } finally {
      setIsSavingPharmacy(false);
    }
  };

  const handleSaveLab = async () => {
    if (labOrders.length === 0 || !selectedAppointment) return;

    setIsSavingLab(true);
    try {
      for (const lab of labOrders) {
        await API.post("/lab/requests", {
          patientId: selectedAppointment.patient._id,
          appointmentId: selectedAppointment._id,
          testName: lab.testName,
          priority: lab.priority,
          clinicalNotes: lab.clinicalNotes
        });
      }
      setIsLabSaved(true);
      toast.success("Tests saved to Laboratory successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save lab requests");
    } finally {
      setIsSavingLab(false);
    }
  };

  const handleSaveConsultation = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return toast.error("Please select a patient appointment");
    if (!chiefComplaint || !diagnosis) return toast.error("Chief Complaint and Diagnosis are required");

    if (prescribedMedicines.length > 0 && !isPharmacySaved) {
      return toast.error("Please save the prescribed medicines for Pharmacy first.");
    }
    if (labOrders.length > 0 && !isLabSaved) {
      return toast.error("Please save the lab requests for Laboratory first.");
    }

    try {
      await API.post("/consultations", {
        appointmentId: selectedAppointment._id,
        patientId: selectedAppointment.patient._id,
        chiefComplaint,
        symptoms,
        vitals,
        diagnosis,
        clinicalNotes,
        treatmentPlan
      });
      
      toast.success("Consultation & medical records saved successfully!");
      navigate("/doctor/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save consultation");
    }
  };

  const handlePendingConsultation = async () => {
    if (!selectedAppointment) return toast.error("Please select a patient appointment");
    
    try {
      await API.put(`/appointments/${selectedAppointment._id}/status`, {
        status: "In Consultation"
      });
      toast.success("Consultation marked as Pending.");
      
      setSelectedAppointment(null);
      setPrescribedMedicines([]);
      setLabOrders([]);
      setChiefComplaint("");
      setDiagnosis("");
      setClinicalNotes("");
      setTreatmentPlan("");
      setVitals({
        bloodPressure: "120/80",
        heartRate: "75 bpm",
        temperature: "98.6 °F",
        weight: "70 kg",
        height: "170 cm"
      });
      setIsPharmacySaved(false);
      setIsLabSaved(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark as pending");
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
              setChiefComplaint(appt?.reason || "");
              setPrescribedMedicines([]);
              setLabOrders([]);
              setIsPharmacySaved(false);
              setIsLabSaved(false);
              setDiagnosis("");
              setClinicalNotes("");
              setTreatmentPlan("");
              setVitals({
                bloodPressure: "120/80",
                heartRate: "75 bpm",
                temperature: "98.6 °F",
                weight: "70 kg",
                height: "170 cm"
              });
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

          {/* Analyzed Lab Reports Available Banner */}
          {patientLabResults.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                  <FlaskConical className="w-4 h-4 text-indigo-600" />
                  <span>Completed Diagnostic Lab Reports Available ({patientLabResults.length})</span>
                </div>
                <span className="text-[10px] text-indigo-700 font-semibold">Review findings & assign medicine below</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {patientLabResults.map((r) => (
                  <div key={r._id} className="bg-white p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{r.testName}</p>
                      <p className="text-[10px] text-slate-500">Date: {new Date(r.createdAt).toLocaleDateString()} | ID: {r.resultId}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedLabReport(r)}
                        className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg border border-indigo-200"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Report
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRxModalOpen(true)}
                        className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200"
                      >
                        <Pill className="w-3.5 h-3.5" /> Assign Medicine
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                <div className="flex items-center gap-2">
                  {prescribedMedicines.length > 0 && !isPharmacySaved && (
                    <button
                      type="button"
                      onClick={handleSavePharmacy}
                      disabled={isSavingPharmacy}
                      className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                    >
                      {isSavingPharmacy ? "Saving..." : "Save for Pharmacy"}
                    </button>
                  )}
                  {isPharmacySaved && prescribedMedicines.length > 0 && (
                    <span className="flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                      <CheckCircle2 className="w-4 h-4" /> Saved
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsRxModalOpen(true)}
                    disabled={isPharmacySaved}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Medicine
                  </button>
                </div>
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
                      {!isPharmacySaved && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(i)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
                <div className="flex items-center gap-2">
                  {labOrders.length > 0 && !isLabSaved && (
                    <button
                      type="button"
                      onClick={handleSaveLab}
                      disabled={isSavingLab}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors disabled:opacity-50"
                    >
                      {isSavingLab ? "Saving..." : "Save for Laboratory"}
                    </button>
                  )}
                  {isLabSaved && labOrders.length > 0 && (
                    <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                      <CheckCircle2 className="w-4 h-4" /> Saved
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsLabModalOpen(true)}
                    disabled={isLabSaved}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Order Test
                  </button>
                </div>
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
                      {!isLabSaved && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLabOrder(i)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Action Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handlePendingConsultation}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all"
            >
              Save as Pending (Consult Next)
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" /> Final Submit Consultation
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

      {/* View Lab Report Modal */}
      {selectedLabReport && (
        <Modal isOpen={!!selectedLabReport} onClose={() => setSelectedLabReport(null)} title="Diagnostic Report Details" maxWidth="max-w-4xl">
          <PrintableLabReport result={selectedLabReport} onClose={() => setSelectedLabReport(null)} />
        </Modal>
      )}
    </div>
  );
}
