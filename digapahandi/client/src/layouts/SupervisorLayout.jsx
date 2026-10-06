import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Truck, FileText, Users, BarChart, Settings, Activity, LogOut, Menu, Bell } from 'lucide-react';

const SupervisorLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] overflow-hidden font-['Outfit']">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-white/75 backdrop-blur-xl border-r border-[#F28C28]/15 text-[#53606C] flex flex-col relative z-20 shadow-lg transition-all duration-300">
        <div className="p-5 flex items-center h-[72px] gap-3 border-b border-[#F28C28]/15 shrink-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0 shadow-sm overflow-hidden border border-[#F28C28]/20">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-[#27313B] text-[15px] leading-tight tracking-wide">Supervisor Panel</h2>
            <p className="text-[11px] text-[#D96B0B] font-medium tracking-wider uppercase mt-0.5">Waste Management</p>
          </div>
        </div>
        
        <nav className="flex-1 mt-6 overflow-y-auto px-0 scrollbar-hide">
          <ul className="space-y-1">
            {[
              { name: 'Dashboard', path: '/supervisor/dashboard', icon: <Home size={20} /> },
              { name: 'Vehicles', path: '/supervisor/vehicles', icon: <Truck size={20} /> },
              { name: 'Complaints', path: '/supervisor/complaints', icon: <FileText size={20} /> },
              { name: 'Attendance', path: '/supervisor/attendance', icon: <Users size={20} /> },
              { name: 'Analytics', path: '/supervisor/analytics', icon: <BarChart size={20} /> },
              { name: 'Wealth Center', path: '/supervisor/wealth', icon: <Home size={20} /> },
              { name: 'Machinery Defect', path: '/supervisor/machinery', icon: <Settings size={20} /> },
              { name: 'Live Tracking', path: '/supervisor/tracking', icon: <Activity size={20} /> }
            ].map(item => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `flex items-center gap-3.5 px-6 py-3.5 text-[14px] font-medium transition-all duration-200 group ${
                      isActive 
                        ? 'bg-[#F28C28]/10 text-[#D96B0B] border-l-[3px] border-[#F28C28] rounded-r-full mr-4 shadow-sm' 
                        : 'text-[#68727D] hover:bg-[#F28C28]/5 hover:text-[#D96B0B] border-l-[3px] border-transparent'
                    }`
                  }
                >
                  <span className="shrink-0">
                    {item.icon}
                  </span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[#F28C28]/15 bg-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#27313B]">John Doe</p>
              <p className="text-[11px] text-[#68727D]">Supervisor</p>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 bg-white border border-[#F28C28]/20 text-[#D96B0B] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F28C28]/10 transition-all duration-300 shadow-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-[72px] bg-white/75 backdrop-blur-xl border-b border-[#F28C28]/12 text-[#27313B] flex items-center justify-between px-8 z-20 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-[#53606C] hover:text-[#D96B0B] transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-[#27313B] tracking-tight">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-[#D96B0B] hover:bg-[#F28C28]/10 rounded-full transition-all duration-200">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default SupervisorLayout;






