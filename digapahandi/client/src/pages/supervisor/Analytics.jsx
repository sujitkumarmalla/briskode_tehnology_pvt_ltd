import { useTranslation } from 'react-i18next';
import { Truck, CheckCircle, AlertCircle, Percent, Activity } from 'lucide-react';

const Analytics = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-4 p-6 pb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
          <Activity size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{t('supervisor.analytics')}</h1>
          <p className="text-blue-50 text-sm">{t('supervisor.analyticsDesc')}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Vehicles */}
        <div className="bg-[#2563eb] rounded-xl p-4 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Truck size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">KPI</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.totalVehicles')}</p>
          <h2 className="text-3xl font-bold">5</h2>
        </div>

        {/* Running Vehicles */}
        <div className="bg-[#10b981] rounded-xl p-4 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckCircle size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">KPI</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.runningVehicles')}</p>
          <h2 className="text-3xl font-bold">1</h2>
        </div>

        {/* Complaints */}
        <div className="bg-[#f97316] rounded-xl p-4 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">KPI</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.complaints')}</p>
          <h2 className="text-3xl font-bold">65</h2>
        </div>

        {/* Resolution % */}
        <div className="bg-[#8b5cf6] rounded-xl p-4 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Percent size={20} />
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-semibold">KPI</span>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">{t('supervisor.resolution')}</p>
          <h2 className="text-3xl font-bold">85%</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Vehicle Status Distribution */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-slate-800 mb-4">{t('supervisor.vehicleStatusDistribution')}</h3>
          <div className="flex justify-center items-center h-48 relative">
            <svg viewBox="0 0 36 36" className="w-36 h-36">
              {/* background ring (yellow) */}
              <path
                className="text-[#fbbf24]"
                strokeWidth="8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* running ring (green) - 20% */}
              <path
                className="text-[#22c55e]"
                strokeWidth="8"
                strokeDasharray="20, 100"
                strokeDashoffset="0"
                strokeLinecap="butt"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* stopped ring (red) - 80% */}
              <path
                className="text-[#ef4444]"
                strokeWidth="8"
                strokeDasharray="80, 100"
                strokeDashoffset="-20"
                strokeLinecap="butt"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute top-10 right-[35%] text-[#22c55e] text-xs font-medium">
              _running 20%
            </div>
            <div className="absolute bottom-10 left-[25%] text-[#ef4444] text-xs font-medium">
              stopped 80%_
            </div>
            <div className="absolute top-8 left-[45%] text-[#fbbf24] text-xs font-medium">
              standing 0%
            </div>
          </div>
        </div>

        {/* Complaint Status Overview */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-slate-800 mb-4">{t('supervisor.complaintStatusOverview')}</h3>
          <div className="h-48 flex flex-col justify-end relative pl-6 pb-6">
            {/* Y Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-500 pb-2">
              <span>60 -</span>
              <span>45 -</span>
              <span>30 -</span>
              <span>15 -</span>
              <span>0 -</span>
            </div>
            
            {/* X Axis Line */}
            <div className="border-b border-l border-gray-400 absolute left-8 bottom-6 top-0 right-0"></div>

            {/* Bars */}
            <div className="flex justify-around items-end h-full w-full relative z-10 px-4">
              <div className="w-24 bg-[#ef4444] rounded-t-md relative group flex flex-col items-center" style={{ height: '15%' }}>
                <span className="absolute -bottom-6 text-xs text-gray-600">{t('supervisor.pending')}</span>
              </div>
              <div className="w-24 bg-[#fbbf24] rounded-t-md relative group flex flex-col items-center" style={{ height: '0%' }}>
                <span className="absolute -bottom-6 text-xs text-gray-600">{t('supervisor.inProgress')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
