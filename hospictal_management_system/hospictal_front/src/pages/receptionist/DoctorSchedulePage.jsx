import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import { Stethoscope, Clock } from "lucide-react";
import { toast } from "react-toastify";

export default function DoctorSchedulePage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get("/users?role=DOCTOR");
        if (res.data.success) setDoctors(res.data.staff);
      } catch (err) {
        toast.error("Failed to load doctor schedules");
      }
    };
    fetchDoctors();
  }, []);

  const columns = [
    { header: "Employee ID", accessor: "empId", cell: (row) => <span className="font-mono font-bold text-blue-600">{row.empId}</span> },
    { header: "Doctor Name", cell: (row) => <span className="font-bold text-slate-800">{row.name}</span> },
    { header: "Department", cell: (row) => row.department?.name || "General" },
    { header: "Specialization", accessor: "specialization" },
    { header: "Consultation Fee", cell: (row) => <span className="font-mono font-semibold">₹{row.consultationFee}</span> },
    { header: "Available Working Hours", cell: (row) => <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{row.workingHours}</span> }
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={doctors} searchPlaceholder="Search doctor schedules..." />
    </div>
  );
}
