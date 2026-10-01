import { Truck, AlertCircle, Activity, ClipboardCheck, AlertTriangle, FileText, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Alert */}
      <div className="bg-[#e8f5e9] text-[#2e7d32] px-4 py-3 rounded-xl flex items-center gap-2 font-medium border border-[#c8e6c9] shadow-sm">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        5 vehicles currently registered.
      </div>

      {/* Header Banner */}
      <div className="bg-[#0a8459] rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-1">Supervisor Dashboard</h1>
        <p className="text-emerald-100 mb-4">Smart Solid Waste Monitoring System</p>
        <p className="text-xs text-emerald-200">Updated: {new Date().toLocaleString()}</p>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzAgMjBMMTcgNDBoMjZMMzAgODBsMTMtNDBINXoiLz48L3N2Zz4=')] bg-no-repeat bg-right-top bg-contain"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Blue Card */}
        <div className="bg-[#0ea5e9] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Truck size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Live</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Total Vehicles</p>
          <h2 className="text-4xl font-bold">5</h2>
        </div>

        {/* Orange Card */}
        <div className="bg-[#ff5722] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Live</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Active Complaints</p>
          <h2 className="text-4xl font-bold">12</h2>
        </div>

        {/* Yellow/Orange Card */}
        <div className="bg-[#ff9800] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Activity size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Live</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">In Progress</p>
          <h2 className="text-4xl font-bold">2</h2>
        </div>

        {/* Green Card */}
        <div className="bg-[#10b981] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <ClipboardCheck size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">Live</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Resolved</p>
          <h2 className="text-4xl font-bold">55</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts area (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trend Chart Mock */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Weekly Collection Trend</h3>
            <div className="w-full h-40 border-l border-b border-gray-200 relative">
              {/* Fake line chart */}
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,90 L20,85 L40,88 L60,82 L80,90 L100,85" fill="none" stroke="#10b981" strokeWidth="2" />
                <circle cx="0" cy="90" r="1.5" fill="#10b981" />
                <circle cx="20" cy="85" r="1.5" fill="#10b981" />
                <circle cx="40" cy="88" r="1.5" fill="#10b981" />
                <circle cx="60" cy="82" r="1.5" fill="#10b981" />
                <circle cx="80" cy="90" r="1.5" fill="#10b981" />
                <circle cx="100" cy="85" r="1.5" fill="#10b981" />
              </svg>
              <div className="absolute bottom-[-20px] w-full flex justify-between text-xs text-gray-400">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
              </div>
            </div>
          </div>

          {/* Performance Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Ward-wise Collection Performance</h3>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">Unknown</span>
                <span className="font-bold text-slate-800">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#10b981] h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/supervisor/machinery')}
              className="bg-[#0a8459] hover:bg-[#086a47] text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <AlertTriangle size={18} /> Report Defect
            </button>
            <button 
              onClick={() => navigate('/supervisor/complaints')}
              className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FileText size={18} /> View Complaints
            </button>
            <button 
              onClick={() => navigate('/supervisor/tracking')}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Activity size={18} /> Live Tracking
            </button>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Truck size={18} className="text-[#0a8459]" /> Vehicle Status
              </h3>
              <p className="text-xs text-gray-500">Live fleet operational overview</p>
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">5 Vehicles</span>
          </div>

          <div className="space-y-4 relative">
            {/* Timeline Line */}
            <div className="absolute left-[38px] top-6 bottom-6 w-[2px] bg-indigo-100"></div>

            {/* Vehicle 1 */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative z-10 flex gap-4">
              <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                <Truck size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">OD33AR9619</h4>
                  <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Stopped
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-tight mb-2 truncate">MDR 72, Digapahandi, Southern Division...</p>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><Activity size={12} /> Speed: <strong className="text-slate-700">0 km/h</strong></span>
                  <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            </div>

            {/* Vehicle 2 */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative z-10 flex gap-4">
              <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                <Truck size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">OD33AR9647</h4>
                  <span className="bg-yellow-50 text-yellow-600 border border-yellow-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Idle
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-tight mb-2 truncate">MDR 72, Digapahandi, Southern Division...</p>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><Activity size={12} /> Speed: <strong className="text-slate-700">0 km/h</strong></span>
                  <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
