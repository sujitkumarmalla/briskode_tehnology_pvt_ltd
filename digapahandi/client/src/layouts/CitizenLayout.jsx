import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, FileText, Truck, CreditCard, MapPin, LogOut, Menu, X } from 'lucide-react';

const CitizenLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/citizen/dashboard', icon: <span className="text-xl">🏠</span> },
    { name: 'Post Complaint', path: '/citizen/complaint', icon: <span className="text-xl">📝</span> },
    { name: 'Track Vehicle', path: '/citizen/track', icon: <span className="text-xl">🚚</span> },
    { name: 'Service & Payments', path: '/citizen/payments', icon: <span className="text-xl">💳</span> },
    { name: 'Checkpoint', path: '/citizen/checkpoint', icon: <span className="text-xl">📍</span> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 ${isSidebarCollapsed ? 'w-[80px]' : 'w-[240px]'} bg-white/75 backdrop-blur-xl border-r border-[#F28C28]/15 text-[#53606C] flex flex-col z-50 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className={`p-5 flex ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} items-center h-[72px] overflow-hidden gap-3 border-b border-white/10`}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0 shadow-sm overflow-hidden">
             <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-wide whitespace-nowrap">Citizen</h2>
            </div>
          )}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 mt-6 overflow-hidden flex flex-col justify-between">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  title={item.name}
                  className={({ isActive }) =>
                    `flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-6'} py-3.5 text-[15px] font-medium transition-colors ${
                      isActive 
                        ? (isSidebarCollapsed ? 'bg-[#F28C28]/10 text-[#D96B0B] border-l-[3px] border-[#F28C28] rounded-xl mx-2 shadow-sm' : 'bg-[#F28C28]/10 text-[#D96B0B] border-l-[3px] border-[#F28C28] rounded-r-full mr-4 shadow-sm')
                        : 'text-[#68727D] hover:bg-white/10'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={isSidebarCollapsed ? '' : 'shrink-0'}>{item.icon}</div>
                  {!isSidebarCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="p-4 mb-4">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
              className={`hidden md:flex items-center justify-center w-full py-3 rounded-xl hover:bg-white/10 transition-colors text-[#68727D]`}
              title="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-[72px] bg-white/75 backdrop-blur-xl border-b border-[#F28C28]/12 text-[#27313B] flex items-center justify-between px-4 sm:px-6 shadow-md z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-[#53606C] mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shrink-0 overflow-hidden">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" onError={(e) => { e.target.outerHTML = '<div class="w-full h-full bg-green-700 rounded-full"></div>' }}/>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold leading-tight">Solid Waste Management System</h1>
              <p className="text-xs opacity-90">Citizen Panel</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <LogOut size={16} className="text-[#E47715]" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CitizenLayout;







