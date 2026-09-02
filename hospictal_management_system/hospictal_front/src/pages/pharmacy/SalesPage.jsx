import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import PrintablePharmacyBill from "../../components/common/PrintablePharmacyBill";
import SearchableMedicineSelect from "../../components/common/SearchableMedicineSelect";
import { ShoppingCart, Plus, Trash2, Printer } from "lucide-react";
import { toast } from "react-toastify";

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [medicinesCatalog, setMedicinesCatalog] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [patientName, setPatientName] = useState("Walk-in Customer");
  const [saleItems, setSaleItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [selectedMedId, setSelectedMedId] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);

  // Printed Pharmacy Bill Modal State
  const [printedSale, setPrintedSale] = useState(null);

  const fetchSales = async () => {
    try {
      const [saleRes, medRes] = await Promise.all([
        API.get("/pharmacy/sales"),
        API.get("/pharmacy/medicines")
      ]);
      if (saleRes.data.success) setSales(saleRes.data.sales);
      if (medRes.data.success) {
        setMedicinesCatalog(medRes.data.medicines);
        if (medRes.data.medicines.length > 0) setSelectedMedId(medRes.data.medicines[0]._id);
      }
    } catch (err) {
      toast.error("Failed to load sales data");
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleAddItem = () => {
    const med = medicinesCatalog.find(m => m._id === selectedMedId);
    if (!med) return;

    if (med.stockQuantity < selectedQty) {
      return toast.error(`Insufficient stock! Available: ${med.stockQuantity}`);
    }

    setSaleItems([...saleItems, { medicineId: med._id, medicineName: med.name, quantity: Number(selectedQty), unitPrice: med.sellingPrice, totalAmount: med.sellingPrice * Number(selectedQty) }]);
  };

  const handleRemoveItem = (idx) => {
    setSaleItems(saleItems.filter((_, i) => i !== idx));
  };

  const handleCreateSale = async (e) => {
    e.preventDefault();
    if (saleItems.length === 0) return toast.error("Please add at least one medicine item");
    try {
      const res = await API.post("/pharmacy/sales", {
        patientName,
        medicines: saleItems,
        discount: Number(discount),
        paymentMethod
      });

      if (res.data.success) {
        toast.success(`Retail Sale Completed! Invoice: ${res.data.sale.saleId}`);
        setIsModalOpen(false);
        setSaleItems([]);
        setPrintedSale(res.data.sale); // Pop up printable bill modal!
        fetchSales();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Sale failed");
    }
  };

  const columns = [
    { header: "Sale Invoice", accessor: "saleId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.saleId}</span> },
    { header: "Customer Name", accessor: "patientName", cell: (row) => <span className="font-bold text-slate-800">{row.patientName || "Walk-in"}</span> },
    { header: "Date", cell: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: "Total (₹)", cell: (row) => <span className="font-mono font-bold text-slate-900">₹{row.netAmount || row.total}</span> },
    { header: "Payment Method", accessor: "paymentMethod" },
    {
      header: "Action",
      cell: (row) => (
        <button
          onClick={() => setPrintedSale(row)}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" /> Print Bill
        </button>
      )
    }
  ];

  const grandSubtotal = saleItems.reduce((sum, item) => sum + item.totalAmount, 0);
  const grandNet = Math.max(0, grandSubtotal - Number(discount));

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={sales}
        searchPlaceholder="Search sales by invoice number, customer name..."
        actionButton={
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md">
            <Plus className="w-4 h-4" /> New OTC Retail Sale
          </button>
        }
      />

      {/* Sale Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Pharmacy OTC Retail Sale">
        <form onSubmit={handleCreateSale} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Customer / Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2.5 border rounded-xl"
              placeholder="e.g. Ramesh Mohanty"
            />
          </div>

          {/* Add Medicine Row with Searchable Selector */}
          <div className="p-3 bg-slate-50 border rounded-xl space-y-2">
            <label className="block font-bold text-slate-800">Search & Select Medicine (1,000 Items)</label>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <SearchableMedicineSelect
                  medicines={medicinesCatalog}
                  selectedMedicineId={selectedMedId}
                  onChange={(id) => setSelectedMedId(id)}
                  placeholder="Type to search 1,000 medicines (e.g. Paracetamol, Amoxicillin, Metformin...)"
                />
              </div>
              <input
                type="number"
                min="1"
                value={selectedQty}
                onChange={(e) => setSelectedQty(e.target.value)}
                className="w-20 p-3 border border-slate-300 rounded-xl font-bold bg-white text-center"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 shadow-sm"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Selected Items List */}
          {saleItems.length > 0 && (
            <div className="border rounded-xl divide-y overflow-hidden">
              {saleItems.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{item.medicineName}</p>
                    <p className="text-[10px] text-slate-500">Qty: {item.quantity} x ₹{item.unitPrice}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold font-mono">₹{item.totalAmount}</span>
                    <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 border-t pt-3">
            <div>
              <label className="block font-semibold mb-1">Discount (₹)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full p-2 border rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-xl font-semibold bg-white"
              >
                <option value="Cash">Cash</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="UPI">UPI / GPay / PhonePe</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex justify-between items-center font-bold text-sm">
            <span>Net Payable:</span>
            <span className="text-blue-700 font-mono text-base">₹{grandNet}</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 bg-slate-100 rounded-xl font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold shadow-md">
              Complete Payment & Print Bill
            </button>
          </div>
        </form>
      </Modal>

      {/* Printable Pharmacy Bill Modal */}
      {printedSale && (
        <Modal
          isOpen={!!printedSale}
          onClose={() => setPrintedSale(null)}
          title="Official Pharmacy Retail Sales Bill"
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
