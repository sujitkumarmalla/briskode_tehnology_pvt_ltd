import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Truck, FileText, Users, BarChart, Settings, Activity, LogOut } from 'lucide-react';

const SupervisorLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <aside className="w-[240px] bg-[#0a8459] text-white flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-white/10 h-[60px] shrink-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 overflow-hidden shrink-0">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-[13px] leading-tight">Supervisor Panel</h2>
            <p className="text-[10px] opacity-80">Waste Management</p>
          </div>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto">
          <ul className="space-y-1">
            {[{ name: 'Dashboard', path: '/supervisor/dashboard', icon: <Home size={18} /> },
              { name: 'Vehicles', path: '/supervisor/vehicles', icon: <Truck size={18} /> },
              { name: 'Complaints', path: '/supervisor/complaints', icon: <FileText size={18} /> },
              { name: 'Attendance', path: '/supervisor/attendance', icon: <Users size={18} /> },
              { name: 'Analytics', path: '/supervisor/analytics', icon: <BarChart size={18} /> },
              { name: 'Wealth Center', path: '/supervisor/wealth', icon: <Home size={18} /> },
              { name: 'Machinery Defect', path: '/supervisor/machinery', icon: <Settings size={18} /> },
              { name: 'Live Tracking', path: '/supervisor/tracking', icon: <Activity size={18} /> }
            ].map(item => (
              <li key={item.name}>
                <NavLink to={item.path} className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-white text-[#0a8459] rounded-r-full mr-4 shadow-sm' : 'hover:bg-white/10'}`}>
                  {item.icon} {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[60px] bg-[#0a8459] flex items-center justify-end px-6 shadow-md z-10 shrink-0">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-700 shadow-sm">
            <LogOut size={16} /> Logout
          </button>
        </header>
        <main className="flex-1 overflow-y-auto bg-[#eef2f6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default SupervisorLayout;
