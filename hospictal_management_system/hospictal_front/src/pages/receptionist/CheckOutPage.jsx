import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import PrintableInvoice from "../../components/common/PrintableInvoice";
import { Receipt, CheckCircle, Printer } from "lucide-react";
import { toast } from "react-toastify";

export default function CheckOutPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [generatedBill, setGeneratedBill] = useState(null);

  const [services, setServices] = useState([
    { name: "Consultation Fee", category: "Consultation", price: 500, quantity: 1, amount: 500 }
  ]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const fetchCompleted = async () => {
    try {
      const res = await API.get("/appointments?status=Completed");
      if (res.data.success) setAppointments(res.data.appointments);
    } catch (err) {
      toast.error("Failed to load completed consultations");
    }
  };

  useEffect(() => {
    fetchCompleted();
  }, []);

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    if (!selectedAppt) return;
    try {
      const res = await API.post("/billing", {
        patientId: selectedAppt.patient._id,
        appointmentId: selectedAppt._id,
        services,
        discount: Number(discount),
        paymentMethod
      });

      if (res.data.success) {
        toast.success("Invoice generated!");
        setGeneratedBill(res.data.bill);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invoice generation failed");
    }
  };

  const columns = [
    { header: "Token", cell: (row) => <span className="font-mono font-bold">{row.tokenNumber}</span> },
    { header: "Patient", cell: (row) => <span className="font-bold text-slate-800">{row.patient?.name} ({row.patient?.patientId})</span> },
    { header: "Doctor", cell: (row) => `${row.doctor?.name} (${row.department?.name})` },
    { header: "Consult Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Action",
      cell: (row) => (
        <button
          onClick={() => {
            setSelectedAppt(row);
            setServices([{ name: `Consultation (${row.doctor?.name})`, category: "Consultation", price: row.doctor?.consultationFee || 500, quantity: 1, amount: row.doctor?.consultationFee || 500 }]);
          }}
          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
        >
          <Receipt className="w-4 h-4" /> Check-Out & Bill
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={appointments} searchPlaceholder="Search completed patient consultations for checkout..." />

      {selectedAppt && !generatedBill && (
        <Modal isOpen={!!selectedAppt} onClose={() => setSelectedAppt(null)} title={`Patient Check-Out & Invoice: ${selectedAppt.patient?.name}`}>
          <form onSubmit={handleGenerateInvoice} className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">Patient: {selectedAppt.patient?.name} ({selectedAppt.patient?.patientId})</p>
              <p className="text-slate-600">Attending Doctor: {selectedAppt.doctor?.name}</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Services & Line Items</label>
              {services.map((s, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input type="text" value={s.name} readOnly className="flex-1 p-2 bg-slate-100 border border-slate-200 rounded-lg" />
                  <input type="number" value={s.price} readOnly className="w-24 p-2 bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Discount Amount (₹)</label>
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl font-mono" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl font-semibold">
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setSelectedAppt(null)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl">Generate Invoice & Complete Checkout</button>
            </div>
          </form>
        </Modal>
      )}

      {generatedBill && (
        <Modal isOpen={!!generatedBill} onClose={() => setGeneratedBill(null)} title="Check-Out Complete Statement" maxWidth="max-w-4xl">
          <PrintableInvoice bill={generatedBill} onClose={() => setGeneratedBill(null)} />
        </Modal>
      )}
    </div>
  );
}
