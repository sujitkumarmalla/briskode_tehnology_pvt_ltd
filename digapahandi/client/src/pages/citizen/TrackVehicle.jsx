import { useState } from 'react';
import { Map, Truck, Activity, Navigation, CheckCircle2 } from 'lucide-react';

const vehicles = [
  { id: 1, name: 'Garbage Truck (OD-07-M-1234)', location: 'Main Road, Bhubaneswar, Odisha', status: 'Active', speed: '25 km/h', lastUpdate: 'Just now', driver: 'Ramesh Naik' },
  { id: 2, name: 'Sweeper Machine (OD-07-K-5678)', location: 'Medical Road, Bhubaneswar, Odisha', status: 'Idle', speed: '0 km/h', lastUpdate: '5 mins ago', driver: 'Suresh Das' },
  { id: 3, name: 'Waste Collector (OD-07-X-9012)', location: 'Bank Street, Bhubaneswar, Odisha', status: 'Active', speed: '15 km/h', lastUpdate: '1 min ago', driver: 'Kamal Patra' },
];

const TrackVehicle = () => {
  const [mapType, setMapType] = useState('m');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#E47715] mb-1">Live Vehicle Tracking</h1>
          <p className="text-slate-500">
            Real-time monitoring of municipal vehicles
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-[#FFF8F2] text-emerald-700 px-4 py-2 rounded-xl font-medium shadow-sm shrink-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F2A65A] animate-pulse"></span>
            Live Updates
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Map className="text-blue-500" size={24} />
              <div>
                <h2 className="text-lg font-bold text-[#27313B]">Live Map</h2>
                <p className="text-xs text-slate-500">Tracking: {selectedVehicle.name}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <button onClick={() => setMapType('k')} className={`px-3 py-1.5 rounded-md ${mapType === 'k' ? 'bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)]' : 'bg-gray-50 text-slate-600 border border-gray-200'}`}>Satellite</button>
              <button onClick={() => setMapType('m')} className={`px-3 py-1.5 rounded-md ${mapType === 'm' ? 'bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)]' : 'bg-gray-50 text-slate-600 border border-gray-200'}`}>Street</button>
              <button onClick={() => setMapType('h')} className={`px-3 py-1.5 rounded-md ${mapType === 'h' ? 'bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)]' : 'bg-gray-50 text-slate-600 border border-gray-200'}`}>Hybrid</button>
              <button onClick={() => setMapType('p')} className={`px-3 py-1.5 rounded-md ${mapType === 'p' ? 'bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)]' : 'bg-gray-50 text-slate-600 border border-gray-200'}`}>Terrain</button>
            </div>
          </div>

          {/* Map Frame */}
          <div className="w-full h-[500px] bg-slate-200 rounded-xl overflow-hidden relative shadow-inner">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedVehicle.location)}&t=${mapType}&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        {/* Vehicles Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#27313B] px-1">Active Vehicles</h2>
          {vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedVehicle.id === vehicle.id
                ? 'border-[#F2A65A] bg-[#FFF8F2]/50 shadow-md transform scale-[1.02]'
                : 'border-gray-200 hover:border-[#F28C28]/15 bg-white'
                }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedVehicle.id === vehicle.id ? 'bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white shadow-[0_5px_15px_rgba(228,119,21,0.18)]' : 'bg-gray-100 text-gray-500'}`}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#27313B] text-sm">{vehicle.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Navigation size={10} /> {vehicle.driver}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${vehicle.status === 'Active' ? 'bg-[#FFF3E0] text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-t border-gray-100 pt-3 mt-1">
                <div className="flex items-center gap-1 text-slate-600">
                  <Activity size={12} className="text-blue-500" />
                  <span className="font-semibold">Speed:</span> {vehicle.speed}
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <CheckCircle2 size={12} className="text-[#E47715]" />
                  <span>{vehicle.lastUpdate}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 mt-2 truncate bg-white rounded p-1.5 border border-gray-50">
                📍 {vehicle.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackVehicle;







