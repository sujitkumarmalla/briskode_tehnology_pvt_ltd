import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatCard from "../../components/common/StatCard";
import { FlaskConical, TestTube, Microscope, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function LabOverview() {
  const [catalog, setCatalog] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, statRes] = await Promise.all([
          API.get("/lab/catalog"),
          API.get("/reports/lab")
        ]);
        if (catRes.data.success) setCatalog(catRes.data.catalog);
        if (statRes.data.success) setStats(statRes.data.stats);
      } catch (err) {
        toast.error("Failed to load lab overview");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      header: "Test Code",
      accessor: "testCode",
      cell: (row) => <span className="font-mono font-bold text-indigo-600">{row.testCode}</span>
    },
    {
      header: "Test Name",
      accessor: "name",
      cell: (row) => <span className="font-bold text-slate-800">{row.name}</span>
    },
    {
      header: "Category",
      accessor: "category"
    },
    {
      header: "Sample Type",
      accessor: "sampleType"
    },
    {
      header: "Reference Range",
      accessor: "referenceRange"
    },
    {
      header: "Test Price",
      cell: (row) => <span className="font-mono font-bold text-slate-900">₹{row.price}</span>
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pending Test Orders" value={stats.pendingTests || 0} icon={FlaskConical} color="amber" />
        <StatCard title="Samples Pending" value={stats.samplesPending || 0} icon={TestTube} color="indigo" />
        <StatCard title="Tests Processing" value={stats.testsProcessing || 0} icon={Microscope} color="purple" />
        <StatCard title="Completed Reports" value={stats.completedReports || 0} icon={CheckCircle} color="emerald" />
      </div>

      <DataTable
        columns={columns}
        data={catalog}
        searchPlaceholder="Search lab test catalog by code, test name, category..."
      />
    </div>
  );
}
