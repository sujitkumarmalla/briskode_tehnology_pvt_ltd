import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import PrintablePharmacyBill from "../../components/common/PrintablePharmacyBill";
import { Pill, CheckCircle, Printer } from "lucide-react";
import { toast } from "react-toastify";

export default function PrescriptionsList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loading, setLoading] = useState(true);

  // Printed Pharmacy Bill Modal State
  const [printedSale, setPrintedSale] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      const res = await API.get("/prescriptions");
      if (res.data.success) setPrescriptions(res.data.prescriptions);
    } catch (err) {
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleDispense = async (e) => {
    e.preventDefault();
    if (!selectedRx) return;
    try {
      const res = await API.put(`/prescriptions/${selectedRx._id}/dispense`, {
        discount: Number(discount),
        paymentMethod
      });
      if (res.data.success) {
        toast.success(`Prescription Dispensed! Sales Invoice: ${res.data.sale.saleId}`);
        setSelectedRx(null);
        setPrintedSale(res.data.sale); // Pop up printable bill modal!
        fetchPrescriptions();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Dispensing failed");
    }
  };

  const columns = [
    { header: "Rx ID", accessor: "prescriptionId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.prescriptionId}</span> },
    { header: "Patient", cell: (row) => <span className="font-bold text-slate-800">{row.patient?.name} ({row.patient?.patientId})</span> },
    { header: "Prescribing Doctor", cell: (row) => `${row.doctor?.name || 'Dr. Swarna Sarthak Mohanty'} (${row.doctor?.specialization || 'Cardiology'})` },
    { header: "Date Issued", cell: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Action",
      cell: (row) => (
        row.status !== "Dispensed" ? (
          <button
            onClick={() => setSelectedRx(row)}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm"
          >
            <Pill className="w-4 h-4" /> Verify & Dispense
          </button>
        ) : (
          <button
            onClick={() => {
              setPrintedSale({
                saleId: `PHARM-${row._id.slice(-6).toUpperCase()}`,
                patient: row.patient,
                doctor: row.doctor,
                medicines: row.medicines?.map(m => ({
                  medicineName: m.medicineName,
                  dosage: m.dosage,
                  quantity: m.quantity,
                  price: 150,
                  total: m.quantity * 150
                })),
                subtotal: row.medicines?.reduce((sum, m) => sum + (m.quantity * 150), 0) || 450,
                discount: 0,
                netAmount: row.medicines?.reduce((sum, m) => sum + (m.quantity * 150), 0) || 450,
                paymentMethod: "Cash",
                createdAt: row.updatedAt
              });
            }}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print Pharmacy Bill
          </button>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={prescriptions} searchPlaceholder="Search prescriptions by Rx ID, Patient name..." />

      {/* Dispense Modal */}
      {selectedRx && (
        <Modal isOpen={!!selectedRx} onClose={() => setSelectedRx(null)} title={`Dispense Prescription (${selectedRx.prescriptionId})`}>
          <form onSubmit={handleDispense} className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">Patient: {selectedRx.patient?.name} ({selectedRx.patient?.patientId})</p>
              <p className="text-slate-600">Prescribed By: {selectedRx.doctor?.name || "Dr. Swarna Sarthak Mohanty"}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-2">Prescribed Medicines Items:</h4>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {selectedRx.medicines?.map((m, idx) => (
                  <div key={idx} className="p-3 bg-white flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{m.medicineName} ({m.dosage})</p>
                      <p className="text-[10px] text-slate-500">Freq: {m.frequency} | Duration: {m.duration} | Instructions: {m.instructions}</p>
                    </div>
                    <span className="font-bold font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">Qty: {m.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-3">
              <div>
                <label className="block font-semibold mb-1">Discount (₹)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full p-2.5 border rounded-xl"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2.5 border rounded-xl font-semibold bg-white"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Credit/Debit Card</option>
                  <option value="UPI">UPI / Online</option>
                  <option value="Ayushman PM-JAY">Ayushman PM-JAY Cashless</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setSelectedRx(null)} className="px-4 py-2 text-slate-600 bg-slate-100 rounded-xl font-semibold">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-extrabold flex items-center gap-2 shadow-md">
                <CheckCircle className="w-4 h-4" /> Complete Payment & Print Bill
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Printable Pharmacy Bill Modal */}
      {printedSale && (
        <Modal
          isOpen={!!printedSale}
          onClose={() => setPrintedSale(null)}
          title="Official Pharmacy Dispensing Bill"
          maxWidth="max-w-3xl"
        >
          <PrintablePharmacyBill
            sale={printedSale}
            onClose={() => setPrintedSale(null)}
          />
        </Modal>
      )}
    </div>
  );
}
