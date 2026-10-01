import { useState } from 'react';
import { Download, CheckCircle, XCircle, Wrench, Truck } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

import { useNavigate } from 'react-router-dom';

const initialVehicles = [
  { id: 1, vehicleNo: 'OD33AR9619', ward: 'MDR 72, Digapahandi, Southern Division, Odisha, 761118, India', speed: '0', signal: 'STRONG_SIGNAL', ignition: 'OFF', status: 'stopped', lastUpdate: '9/30/2026, 11:41:03 AM' },
  { id: 2, vehicleNo: 'OD33AR9647', ward: 'MDR 72, Digapahandi, Southern Division, Odisha, 761118, India', speed: '0', signal: 'STRONG_SIGNAL', ignition: 'ON', status: 'idle', lastUpdate: '9/30/2026, 11:41:04 AM' },
  { id: 3, vehicleNo: 'OD07AV6580', ward: 'State Highway 33, Karachuli, Southern Division, Odisha, 761143, India', speed: '63', signal: 'WEAK_SIGNAL', ignition: 'ON', status: 'running', lastUpdate: '9/30/2026, 11:40:44 AM' },
  { id: 4, vehicleNo: 'OD07AB8906', ward: 'MDR 72, Digapahandi, Southern Division, Odisha, 761118, India', speed: '0', signal: 'STRONG_SIGNAL', ignition: 'OFF', status: 'stopped', lastUpdate: '9/30/2026, 11:40:58 AM' },
  { id: 5, vehicleNo: 'OD07AB8905', ward: 'MDR 72, Digapahandi, Southern Division, Odisha, 761118, India', speed: '0', signal: 'STRONG_SIGNAL', ignition: 'OFF', status: 'stopped', lastUpdate: '9/30/2026, 11:41:06 AM' }
];

const Vehicles = () => {
  const navigate = useNavigate();
  const [vehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(v => 
    v.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.ward.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Title styling
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Vehicle Report", 14, 15);
    
    const tableColumn = ["Vehicle No", "Ward", "Speed", "Status", "Signal", "Ignition", "Last Update"];
    const tableRows = [];
    
    filteredVehicles.forEach(vehicle => {
      const vehicleData = [
        vehicle.vehicleNo,
        vehicle.ward,
        vehicle.speed,
        vehicle.status,
        vehicle.signal,
        vehicle.ignition,
        vehicle.lastUpdate
      ];
      tableRows.push(vehicleData);
    });
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }, // Blue header like screenshot
      styles: { fontSize: 9, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 1: { cellWidth: 60 } } // Give ward column more space
    });
    
    doc.save(`Vehicle_Report.pdf`);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredVehicles.map(v => ({
      'Vehicle No': v.vehicleNo,
      'Ward': v.ward,
      'Speed': v.speed,
      'Status': v.status,
      'Signal': v.signal,
      'Ignition': v.ignition,
      'Last Update': v.lastUpdate
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicles");
    XLSX.writeFile(workbook, `vehicle_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white shadow-md">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">Vehicle Management 🚛</h1>
          <p className="text-emerald-100 text-sm mt-1">Fleet monitoring • Live tracking • Operational status</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadPDF} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm">
            <Download size={16} /> PDF
          </button>
          <button onClick={downloadExcel} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm">
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <p className="text-sm font-medium opacity-90 mb-2">Total Vehicles</p>
          <h2 className="text-4xl font-bold">{vehicles.length}</h2>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-2xl">
            <Truck size={24} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <p className="text-sm font-medium opacity-90 mb-2">Active</p>
          <h2 className="text-4xl font-bold">{vehicles.filter(v => v.status === 'running' || v.status === 'idle').length}</h2>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-2xl">
            <CheckCircle size={24} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <p className="text-sm font-medium opacity-90 mb-2">Inactive</p>
          <h2 className="text-4xl font-bold">{vehicles.filter(v => v.status === 'stopped').length}</h2>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-2xl">
            <XCircle size={24} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <p className="text-sm font-medium opacity-90 mb-2">Maintenance</p>
          <h2 className="text-4xl font-bold">0</h2>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-2xl">
            <Wrench size={24} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <input 
          type="text" 
          placeholder="Search by vehicle number, ward or route..." 
          className="w-full px-4 py-2 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e293b] text-white">
                <th className="p-4 text-sm font-semibold whitespace-nowrap">Vehicle No</th>
                <th className="p-4 text-sm font-semibold">Ward</th>
                <th className="p-4 text-sm font-semibold">Speed</th>
                <th className="p-4 text-sm font-semibold">Signal</th>
                <th className="p-4 text-sm font-semibold">Ignition</th>
                <th className="p-4 text-sm font-semibold">Status</th>
                <th className="p-4 text-sm font-semibold whitespace-nowrap">Last Update</th>
                <th className="p-4 text-sm font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle, index) => (
                <tr key={vehicle.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="p-4 font-bold text-slate-800">{vehicle.vehicleNo}</td>
                  <td className="p-4 text-sm text-slate-500 max-w-xs truncate" title={vehicle.ward}>{vehicle.ward}</td>
                  <td className="p-4 text-sm text-slate-600 whitespace-nowrap">{vehicle.speed} km/h</td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {vehicle.signal}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold ${vehicle.ignition === 'ON' ? 'text-green-600' : 'text-red-500'}`}>
                      {vehicle.ignition}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${
                      vehicle.status === 'running' ? 'bg-emerald-100 text-emerald-700' : 
                      vehicle.status === 'idle' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        vehicle.status === 'running' ? 'bg-emerald-500' : 
                        vehicle.status === 'idle' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></span>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{vehicle.lastUpdate}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate('/supervisor/tracking')}
                      className="bg-[#0a8459] hover:bg-[#086a47] text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVehicles.length === 0 && (
            <div className="p-8 text-center text-gray-500">No vehicles found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Vehicles;
