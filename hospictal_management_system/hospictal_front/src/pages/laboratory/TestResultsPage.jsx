import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { FileText, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export default function TestResultsPage() {
  const [requests, setRequests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [remarks, setRemarks] = useState("Findings within expected clinical parameters.");
  const [findings, setFindings] = useState([
    { parameter: "Hemoglobin (Hb)", value: "13.5", referenceRange: "13.5 - 17.5", unit: "g/dL", isAbnormal: false }
  ]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/lab/requests");
      if (res.data.success) setRequests(res.data.requests);
    } catch (err) {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAddFindingRow = () => {
    setFindings([...findings, { parameter: "", value: "", referenceRange: "", unit: "", isAbnormal: false }]);
  };

  const handleRemoveFindingRow = (idx) => {
    setFindings(findings.filter((_, i) => i !== idx));
  };

  const handleSubmitResult = async (e) => {
    e.preventDefault();
    if (!selectedReq || findings.length === 0) return toast.error("Please add at least one test finding parameter");

    try {
      const res = await API.post("/lab/results", {
        labRequestId: selectedReq._id,
        findings,
        remarks
      });

      if (res.data.success) {
        toast.success(`Lab Report Finalized! Result ID: ${res.data.labResult.resultId}`);
        setSelectedReq(null);
        fetchRequests();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Result submission failed");
    }
  };

  const columns = [
    { header: "Request ID", accessor: "requestId", cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.requestId}</span> },
    { header: "Sample ID", cell: (row) => <span className="font-mono font-bold text-slate-800">{row.sampleId || "N/A"}</span> },
    { header: "Patient", cell: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: "Test Name", accessor: "testName" },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Action",
      cell: (row) => (
        row.status !== "Completed" ? (
          <button onClick={() => setSelectedReq(row)} className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm">
            <FileText className="w-3.5 h-3.5" /> Enter Test Results
          </button>
        ) : (
          <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Finalized
          </span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={requests} searchPlaceholder="Search tests for result entry..." />

      {selectedReq && (
        <Modal isOpen={!!selectedReq} onClose={() => setSelectedReq(null)} title={`Enter Test Results: ${selectedReq.testName}`} maxWidth="max-w-3xl">
          <form onSubmit={handleSubmitResult} className="space-y-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800">Patient: {selectedReq.patient?.name} ({selectedReq.patient?.patientId})</p>
              <p className="text-slate-600">Sample ID: <span className="font-mono font-bold text-indigo-600">{selectedReq.sampleId}</span></p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-800">Diagnostic Parameters & Findings</label>
                <button type="button" onClick={handleAddFindingRow} className="text-indigo-600 font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Parameter Row
                </button>
              </div>

              {findings.map((f, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-white p-2 border border-slate-200 rounded-xl">
                  <input
                    type="text"
                    placeholder="Parameter (e.g. Hemoglobin)"
                    value={f.parameter}
                    onChange={(e) => {
                      const copy = [...findings];
                      copy[idx].parameter = e.target.value;
                      setFindings(copy);
                    }}
                    className="col-span-3 p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 13.5)"
                    value={f.value}
                    onChange={(e) => {
                      const copy = [...findings];
                      copy[idx].value = e.target.value;
                      setFindings(copy);
                    }}
                    className="col-span-2 p-2 border rounded-lg font-mono font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Reference Range (13.5-17.5)"
                    value={f.referenceRange}
                    onChange={(e) => {
                      const copy = [...findings];
                      copy[idx].referenceRange = e.target.value;
                      setFindings(copy);
                    }}
                    className="col-span-3 p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Unit (g/dL)"
                    value={f.unit}
                    onChange={(e) => {
                      const copy = [...findings];
                      copy[idx].unit = e.target.value;
                      setFindings(copy);
                    }}
                    className="col-span-2 p-2 border rounded-lg"
                  />
                  <div className="col-span-2 flex items-center justify-between">
                    <label className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                      <input
                        type="checkbox"
                        checked={f.isAbnormal}
                        onChange={(e) => {
                          const copy = [...findings];
                          copy[idx].isAbnormal = e.target.checked;
                          setFindings(copy);
                        }}
                      /> Abnormal
                    </label>
                    <button type="button" onClick={() => handleRemoveFindingRow(idx)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pathologist Remarks</label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setSelectedReq(null)} className="px-4 py-2 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
              <button type="submit" className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl">Finalize Report & Notify Doctor</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
