import { useState } from 'react';
import { X, MapPin } from 'lucide-react';

const mockComplaints = [
  { id: '#830d95', photo: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=100', ward: 'N/A', issue: 'No Electricity in Public Toilet', priority: 'Medium', vehicle: 'Not Assigned', status: 'Pending', sla: 'On Time', lat: 19.3620, lng: 84.7770 },
  { id: '#a3dc72', photo: 'https://images.unsplash.com/photo-1620645607316-43bbaee51913?auto=format&fit=crop&q=80&w=100', ward: 'N/A', issue: 'No Water Supply in Public Toilet', priority: 'Medium', vehicle: 'Not Assigned', status: 'Resolved', sla: 'On Time', lat: 19.3640, lng: 84.7800 },
  { id: '#97133b', photo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=100', ward: 'N/A', issue: 'Sweeping Not Done', priority: 'Medium', vehicle: 'Not Assigned', status: 'Pending', sla: 'On Time', lat: 19.3660, lng: 84.7780 },
  { id: '#970d1f', photo: 'https://images.unsplash.com/photo-1605600659873-d808a1d14b14?auto=format&fit=crop&q=80&w=100', ward: 'N/A', issue: 'Sweeping Not Done', priority: 'Medium', vehicle: 'Not Assigned', status: 'Pending', sla: 'On Time', lat: 19.3680, lng: 84.7750 },
];

const Complaints = () => {
  const [filter, setFilter] = useState('All');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const filteredComplaints = filter === 'All' 
    ? mockComplaints 
    : mockComplaints.filter(c => c.status === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#27313B] mb-1">Citizen Complaint Management</h1>
          <p className="text-slate-500">Supervisor resolution & monitoring (ICT Compliant)</p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-1.5 rounded-full text-[#E47715] bg-[#FFF8F2] border border-emerald-100 text-sm font-medium">
            Live Monitoring
          </span>
          <span className="px-4 py-1.5 rounded-full text-blue-600 bg-blue-50 border border-blue-100 text-sm font-medium">
            Audit Ready
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-2 overflow-x-auto">
        {['All', 'Pending', 'In-Progress', 'Resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)] shadow-md shadow-emerald-900/10' 
                : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgba(80,50,20,0.06)] border border-white/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FFF7EF] text-[#8A4D18]">
                <th className="p-4 text-xs font-bold tracking-wider">ID</th>
                <th className="p-4 text-xs font-bold tracking-wider">PHOTO</th>
                <th className="p-4 text-xs font-bold tracking-wider">WARD</th>
                <th className="p-4 text-xs font-bold tracking-wider">ISSUE</th>
                <th className="p-4 text-xs font-bold tracking-wider">PRIORITY</th>
                <th className="p-4 text-xs font-bold tracking-wider">VEHICLE</th>
                <th className="p-4 text-xs font-bold tracking-wider">STATUS</th>
                <th className="p-4 text-xs font-bold tracking-wider">SLA</th>
                <th className="p-4 text-xs font-bold tracking-wider text-center">ROUTE</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c, i) => (
                <tr key={c.id} className={`border-b border-[#F28C28]/15 hover:bg-[#FFF4E9] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FFFBF7]'}`}>
                  <td className="p-4 text-sm font-medium text-slate-700">{c.id}</td>
                  <td className="p-4">
                    <img src={c.photo} alt="Issue" className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-200" />
                  </td>
                  <td className="p-4 text-sm text-slate-600">{c.ward}</td>
                  <td className="p-4 text-sm font-medium text-[#27313B]">{c.issue}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-600 font-semibold text-xs border border-amber-100">
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{c.vehicle}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded font-semibold text-xs border ${
                      c.status === 'Resolved' ? 'bg-[#FFF8F2] text-[#E47715] border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-xs font-bold text-[#E47715] bg-[#FFF8F2] px-2 py-1 rounded w-fit border border-emerald-100">
                      <span className="w-3 h-3 bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)] rounded-sm flex items-center justify-center text-[8px]">✓</span> {c.sla}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => setSelectedRoute(c)}
                      className="bg-[#FFF8F2] hover:bg-[#FFF4E9] text-[#E47715] px-4 py-1.5 rounded-lg text-xs font-bold transition-colors border border-emerald-100"
                    >
                      View<br/>Route
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredComplaints.length === 0 && (
            <div className="p-8 text-center text-gray-500">No complaints found.</div>
          )}
        </div>
      </div>

      {/* Modal for View Route */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-[#27313B] flex items-center gap-2">
                  <MapPin className="text-[#E47715]" /> Route & Location Tracking
                </h2>
                <p className="text-sm text-slate-500 mt-1">Complaint {selectedRoute.id} - {selectedRoute.issue}</p>
              </div>
              <button 
                onClick={() => setSelectedRoute(null)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-6">
              {/* Left Column: Complaint Details & Image */}
              <div className="w-full md:w-1/3 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Complaint Evidence</h3>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 relative aspect-square">
                    <img src={selectedRoute.photo} alt="Evidence" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">Webcam Capture</div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Details</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-slate-500">Status:</span>
                      <span className={`font-bold ${selectedRoute.status === 'Resolved' ? 'text-[#E47715]' : 'text-red-600'}`}>{selectedRoute.status}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-slate-500">Priority:</span>
                      <span className="font-bold text-amber-600">{selectedRoute.priority}</span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span className="text-slate-500">Assigned Vehicle:</span>
                      <span className="font-bold text-[#27313B]">{selectedRoute.vehicle}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Right Column: Live Map */}
              <div className="w-full md:w-2/3 flex flex-col">
                <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Live Map Location</h3>
                <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
                  <iframe 
                    src={`https://maps.google.com/maps?q=Digapahandi,Odisha&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  {/* Fake vehicle marker overlay to simulate tracking */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-full shadow-lg border-2 border-[#F2A65A] flex items-center gap-2 animate-bounce">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-[#27313B]">Issue Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;







