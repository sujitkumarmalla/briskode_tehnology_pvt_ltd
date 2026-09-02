import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { FileText, Download, Printer, Filter } from "lucide-react";
import { toast } from "react-toastify";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("appointments");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      let endpoint = "/appointments";
      if (reportType === "billing") endpoint = "/billing";
      if (reportType === "pharmacy") endpoint = "/pharmacy/sales";
      if (reportType === "lab") endpoint = "/lab/results";

      const res = await API.get(endpoint);
      if (res.data.success) {
        setData(res.data.appointments || res.data.bills || res.data.sales || res.data.results || []);
      }
    } catch (err) {
      toast.error("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const handleExportCSV = () => {
    if (data.length === 0) return toast.info("No data to export");
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).map(v => typeof v === "object" ? JSON.stringify(v) : String(v)).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hospital_${reportType}_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV report exported!");
  };

  const columns = [
    { header: "ID / Ref", accessor: "_id", cell: (row) => <span className="font-mono text-xs text-blue-600">{row.appointmentId || row.invoiceNumber || row.saleId || row.resultId || row._id}</span> },
    { header: "Date", cell: (row) => new Date(row.createdAt || row.date).toLocaleDateString() },
    { header: "Details", cell: (row) => row.reason || row.testName || row.patientName || (row.patient?.name ? `Patient: ${row.patient.name}` : "General Record") },
    { header: "Status / Amount", cell: (row) => row.total ? `₹${row.total}` : row.status || "Completed" }
  ];

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-base font-bold text-slate-800">Hospital Operational Reports</h2>
            <p className="text-xs text-slate-500">Export CSV dataset or print administrative summaries</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
          >
            <option value="appointments">Appointments Report</option>
            <option value="billing">Revenue & Billing Report</option>
            <option value="pharmacy">Pharmacy Sales Report</option>
            <option value="lab">Laboratory Test Results Report</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search report entries..."
      />
    </div>
  );
}
