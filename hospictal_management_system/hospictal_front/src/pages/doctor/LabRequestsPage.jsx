import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import PrintableLabReport from "../../components/common/PrintableLabReport";
import { Eye, Pill, Plus, Trash2, CheckCircle2, FlaskConical } from "lucide-react";
import { toast } from "react-toastify";

export default function LabRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [results, setResults] = useState([]);
  const [medicinesCatalog, setMedicinesCatalog] = useState([]);
  
  const [selectedResult, setSelectedResult] = useState(null);
  const [assignMedicineModal, setAssignMedicineModal] = useState(null); // holds { request, result }

  const [prescribedMedicines, setPrescribedMedicines] = useState([]);
  const [rxForm, setRxForm] = useState({
    medicineId: "",
    medicineName: "",
    dosage: "500mg",
    frequency: "1-0-1",
    duration: "5 Days",
    quantity: 10,
    instructions: "After food"
  });

  const [isSubmittingRx, setIsSubmittingRx] = useState(false);

  const fetchData = async () => {
    try {
      const [reqRes, resRes, medRes] = await Promise.all([
        API.get("/lab/requests"),
        API.get("/lab/results"),
        API.get("/pharmacy/medicines")
      ]);
      if (reqRes.data.success) setRequests(reqRes.data.requests);
      if (resRes.data.success) setResults(resRes.data.results);
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
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load lab requests");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAssignMedicineModal = (request, result) => {
    setAssignMedicineModal({ request, result });
    setPrescribedMedicines([]);
  };

  const handleAddMedicine = () => {
    if (!rxForm.medicineName) return toast.error("Please select a medicine");
    setPrescribedMedicines([...prescribedMedicines, { ...rxForm }]);
    toast.info(`Added ${rxForm.medicineName} to prescription list`);
  };

  const handleRemoveMedicine = (idx) => {
    setPrescribedMedicines(prescribedMedicines.filter((_, i) => i !== idx));
  };

  const handleSavePrescription = async (e) => {
    e.preventDefault();
    if (!assignMedicineModal) return;
    if (prescribedMedicines.length === 0) {
      return toast.error("Please add at least one medicine to prescribe");
    }

    setIsSubmittingRx(true);
    try {
      const { request } = assignMedicineModal;
      await API.post("/prescriptions", {
        patientId: request.patient._id || request.patient,
        consultationId: request.consultation?._id || request.consultation,
        appointmentId: request.appointment?._id || request.appointment,
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

      toast.success("Medicine prescription created based on lab analysis!");
      setAssignMedicineModal(null);
      setPrescribedMedicines([]);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit prescription");
    } finally {
      setIsSubmittingRx(false);
    }
  };

  const columns = [
    { 
      header: "Request ID", 
      accessor: "requestId", 
      cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.requestId}</span> 
    },
    { 
      header: "Patient", 
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-800">{row.patient?.name}</span>
          <p className="text-[10px] font-mono text-slate-500">{row.patient?.patientId}</p>
        </div>
      )
    },
    { 
      header: "Test Name", 
      accessor: "testName", 
      cell: (row) => <span className="font-bold text-slate-900">{row.testName}</span> 
    },
    { 
      header: "Priority", 
      cell: (row) => <StatusBadge status={row.priority} /> 
    },
    { 
      header: "Status", 
      cell: (row) => <StatusBadge status={row.status} /> 
    },
    {
      header: "Actions",
      cell: (row) => {
        const matchedResult = results.find(r => r.labRequest?._id === row._id || r.labRequest === row._id);
        return (
          <div className="flex items-center gap-2">
            {matchedResult ? (
              <>
                <button
                  onClick={() => setSelectedResult(matchedResult)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> View Report
                </button>
                <button
                  onClick={() => openAssignMedicineModal(row, matchedResult)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                >
                  <Pill className="w-3.5 h-3.5" /> Assign Medicine
                </button>
              </>
            ) : (
              <span className="text-slate-400 text-xs italic">Awaiting lab results</span>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-800">Laboratory Orders & Post-Analysis Prescriptions</h2>
          <p className="text-xs text-slate-500">Track lab diagnostic statuses, view report findings, and prescribe medicines after report analysis</p>
        </div>
      </div>

      <DataTable columns={columns} data={requests} searchPlaceholder="Search ordered lab requests by ID, patient, test..." />

      {/* Official Diagnostic Report Modal */}
      {selectedResult && (
        <Modal isOpen={!!selectedResult} onClose={() => setSelectedResult(null)} title="Official Diagnostic Report" maxWidth="max-w-4xl">
          <PrintableLabReport result={selectedResult} onClose={() => setSelectedResult(null)} />
        </Modal>
      )}

      {/* Assign Medicine Post-Lab Analysis Modal */}
      {assignMedicineModal && (
        <Modal
          isOpen={!!assignMedicineModal}
          onClose={() => setAssignMedicineModal(null)}
          title={`Assign Medicine Post-Lab Analysis — ${assignMedicineModal.request.patient?.name || 'Patient'}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs">
            {/* Lab Test Analysis Summary */}
            <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-indigo-900 text-xs">
                    Test: {assignMedicineModal.result?.testName} ({assignMedicineModal.request?.requestId})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded font-bold">
                  Analyzed & Finalized
                </span>
              </div>

              {/* Findings Table Preview */}
              {assignMedicineModal.result?.findings?.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-indigo-900 text-white font-semibold">
                        <th className="p-1.5 rounded-l">Parameter</th>
                        <th className="p-1.5 text-center">Observed Value</th>
                        <th className="p-1.5 text-center">Reference</th>
                        <th className="p-1.5 text-right rounded-r">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-200/50">
                      {assignMedicineModal.result.findings.map((item, idx) => (
                        <tr key={idx} className={item.isAbnormal ? "bg-red-100/60 text-red-900 font-bold" : "text-slate-800"}>
                          <td className="p-1.5">{item.parameter}</td>
                          <td className="p-1.5 text-center font-mono font-bold">{item.value} {item.unit}</td>
                          <td className="p-1.5 text-center text-slate-500">{item.referenceRange || "N/A"}</td>
                          <td className="p-1.5 text-right">
                            {item.isAbnormal ? (
                              <span className="text-red-600 font-bold">⚠️ High / Abnormal</span>
                            ) : (
                              <span className="text-emerald-700 font-medium">✓ Normal</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {assignMedicineModal.result?.remarks && (
                <div className="bg-white/80 p-2.5 rounded-lg border border-indigo-200 text-slate-700">
                  <span className="font-bold text-indigo-950">Pathologist Remarks:</span> {assignMedicineModal.result.remarks}
                </div>
              )}
            </div>

            {/* Prescribe Medicine Form */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-600" /> Prescribe Required Medicines
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Medicine from Pharmacy *</label>
                  <select
                    value={rxForm.medicineId}
                    onChange={(e) => {
                      const med = medicinesCatalog.find(m => m._id === e.target.value);
                      setRxForm({ ...rxForm, medicineId: e.target.value, medicineName: med?.name || "" });
                    }}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
                  >
                    {medicinesCatalog.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.name} ({m.category}) — In Stock: {m.stockQuantity} | Price: ₹{m.sellingPrice}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={rxForm.dosage}
                    onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                    placeholder="500mg"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={rxForm.frequency}
                    onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })}
                    placeholder="1-0-1"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={rxForm.duration}
                    onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })}
                    placeholder="5 Days"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={rxForm.quantity}
                    onChange={(e) => setRxForm({ ...rxForm, quantity: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Special Instructions</label>
                  <input
                    type="text"
                    value={rxForm.instructions}
                    onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
                    placeholder="After food / Before bedtime"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Prescription List
                </button>
              </div>
            </div>

            {/* Prescribed List Table */}
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 text-xs mb-2">Prescribed Items ({prescribedMedicines.length})</p>
              {prescribedMedicines.length === 0 ? (
                <p className="text-slate-400 text-xs text-center py-4 italic">No medicines added yet. Select medicine above and click 'Add'.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {prescribedMedicines.map((m, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{m.medicineName}</span> ({m.dosage}) — <span className="text-slate-600">{m.frequency} for {m.duration}</span>
                        <p className="text-[10px] text-slate-400">Qty: {m.quantity} | {m.instructions}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Submit Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAssignMedicineModal(null)}
                className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmittingRx || prescribedMedicines.length === 0}
                onClick={handleSavePrescription}
                className="flex items-center gap-2 px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Prescription & Send to Pharmacy
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
