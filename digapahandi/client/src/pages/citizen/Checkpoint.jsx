import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers for categories
const createCustomIcon = (color, emoji) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      ">
        <div style="transform: rotate(45deg); font-size: 16px;">${emoji}</div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

const categories = [
  { id: 'toilet', label: 'Toilet', icon: '🚾', color: '#3b82f6', defaultChecked: true },
  { id: 'park', label: 'Park', icon: '🌳', color: '#10b981', defaultChecked: true },
  { id: 'hospital', label: 'Hospital', icon: '🏥', color: '#ef4444', defaultChecked: true },
  { id: 'temple', label: 'Temple', icon: '🛕', color: '#f59e0b', defaultChecked: true },
  { id: 'school', label: 'School', icon: '🏫', color: '#8b5cf6', defaultChecked: true },
  { id: 'police', label: 'Police', icon: '👮', color: '#0ea5e9', defaultChecked: true },
  { id: 'streetlight', label: 'Streetlight', icon: '💡', color: '#eab308', defaultChecked: true },
  { id: 'tourist', label: 'Tourist', icon: '📸', color: '#6366f1', defaultChecked: true },
];

const mockLocations = [
  { id: 1, name: "Children's Park", lat: 19.3620, lng: 84.7770, category: 'park' },
  { id: 2, name: "Faecal Sludge Treatment Plant", lat: 19.3640, lng: 84.7800, category: 'hospital' },
  { id: 3, name: "Digapahandi Police Station", lat: 19.3660, lng: 84.7780, category: 'police' },
];

const Checkpoint = () => {
  const [activeCategories, setActiveCategories] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.defaultChecked }), {})
  );
  
  const toggleCategory = (id) => {
    setActiveCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0a8459] mb-1">Digapahandi Checkpoints Map</h1>
        <p className="text-gray-500">Track public facilities and infrastructure in Digapahandi</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <input 
            type="text" 
            placeholder="Search checkpoint..." 
            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a8459] focus:border-transparent"
          />
        </div>
        <button className="w-full md:w-auto bg-[#0a8459] hover:bg-[#086a47] text-white px-6 py-2.5 rounded-xl font-medium transition-colors whitespace-nowrap">
          Locate Me
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(cat => (
          <label 
            key={cat.id}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input 
              type="checkbox" 
              checked={activeCategories[cat.id]}
              onChange={() => toggleCategory(cat.id)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-lg">{cat.icon}</span>
            <span className="text-sm font-medium text-slate-700">{cat.label}</span>
          </label>
        ))}
      </div>

      <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative z-0">
        <MapContainer center={[19.3620, 84.7770]} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mockLocations.filter(loc => activeCategories[loc.category]).map(loc => {
            const catInfo = categories.find(c => c.id === loc.category);
            return (
              <Marker 
                key={loc.id} 
                position={[loc.lat, loc.lng]} 
                icon={createCustomIcon(catInfo.color, catInfo.icon)}
              >
                <Popup>
                  <div className="font-bold text-slate-800">{loc.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{loc.category}</div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Checkpoint;
