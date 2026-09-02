import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        if (res.data.success) setPatients(res.data.patients);
      } catch (err) {
        toast.error("Failed to load patient records");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const columns = [
    { header: "Patient ID", accessor: "patientId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.patientId}</span> },
    { header: "Full Name", accessor: "name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Age / Gender", cell: (row) => `${row.age} Yrs / ${row.gender}` },
    { header: "Blood Group", cell: (row) => <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">{row.bloodGroup}</span> },
    { header: "Phone Number", accessor: "phone" },
    { header: "Address", accessor: "address" }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={patients} searchPlaceholder="Search patient directory by name, ID, phone..." />
    </div>
  );
}
