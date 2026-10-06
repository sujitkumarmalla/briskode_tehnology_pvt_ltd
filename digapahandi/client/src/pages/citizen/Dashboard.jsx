import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  { url: '/images1.jpg', text: 'Welcome to Digapahandi' },
  { url: '/images2.jpg', text: 'Keep Our City Clean' }
];

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Alert Banner */}
      <div className="bg-[#e91e63] text-white px-6 py-3 rounded-xl font-medium shadow-sm">
        the khata is being sold for 20 rupees
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#E47715] mb-1">Citizen Dashboard</h1>
        <p className="text-gray-500">Track waste collection and manage complaints efficiently.</p>
      </div>

      {/* Banner Image Carousel */}
      <div className="w-full h-48 md:h-72 rounded-2xl overflow-hidden relative shadow-md group">
        {/* Overlay and Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 flex items-end p-6 md:p-8 transition-all">
          <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-md">{slides[currentSlide].text}</h2>
        </div>
        
        {/* Simple Image */}
        <img 
          src={slides[currentSlide].url} 
          alt={slides[currentSlide].text} 
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl p-5 text-[#27313B] shadow-[0_8px_30px_rgba(80,50,20,0.06)] border border-white/80 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div>
            <h3 className="text-xs font-semibold tracking-wider opacity-90 uppercase mb-1">Total Complaints</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="absolute top-4 right-4 bg-[#F28C28]/10 text-[#E47715] p-2 rounded-lg">
            <FileText size={20} />
          </div>
          <button className="bg-white/20 hover:bg-white/30 transition-colors w-fit px-3 py-1 text-xs font-medium rounded-md mt-4">
            View
          </button>
        </div>

        {/* Resolved */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl p-5 text-[#27313B] shadow-[0_8px_30px_rgba(80,50,20,0.06)] border border-white/80 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div>
            <h3 className="text-xs font-semibold tracking-wider opacity-90 uppercase mb-1">Resolved Complaints</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="absolute top-4 right-4 bg-[#F28C28]/10 text-[#E47715] p-2 rounded-lg">
            <CheckCircle size={20} />
          </div>
          <button className="bg-white/20 hover:bg-white/30 transition-colors w-fit px-3 py-1 text-xs font-medium rounded-md mt-4">
            View
          </button>
        </div>

        {/* Pending */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl p-5 text-[#27313B] shadow-[0_8px_30px_rgba(80,50,20,0.06)] border border-white/80 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div>
            <h3 className="text-xs font-semibold tracking-wider opacity-90 uppercase mb-1">Pending Complaints</h3>
            <p className="text-4xl font-bold">0</p>
          </div>
          <div className="absolute top-4 right-4 bg-[#F28C28]/10 text-[#E47715] p-2 rounded-lg">
            <Clock size={20} />
          </div>
          <button className="bg-white/20 hover:bg-white/30 transition-colors w-fit px-3 py-1 text-xs font-medium rounded-md mt-4">
            View
          </button>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#27313B] mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-[#27313B]">Total complaints: 0</p>
                <p className="text-sm text-slate-500 mt-1">Complaints registered in the system</p>
              </div>
              <span className="text-xs text-slate-400">Updated now</span>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-start">
              <div>
                <p className="font-medium text-[#27313B]">Resolved complaints: 0</p>
                <p className="text-sm text-slate-500 mt-1">Issues successfully closed</p>
              </div>
              <span className="text-xs text-slate-400">Updated now</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-[#27313B] mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <Link to="/citizen/complaint" className="block w-full py-3.5 bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white hover:opacity-90 text-center rounded-xl text-sm font-medium transition-colors shadow-sm">
              Post a Complaint
            </Link>
            <Link to="/citizen/track" className="block w-full py-3.5 bg-gradient-to-br from-[#6CBCC7] to-[#A8DDE2] hover:opacity-90 text-white text-center rounded-xl text-sm font-medium transition-colors shadow-sm">
              Track Vehicle
            </Link>
            <Link to="/citizen/payments" className="block w-full py-3.5 bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white hover:opacity-90 active:opacity-100 text-center rounded-xl text-sm font-medium transition-colors shadow-sm">
              Service Booking & Payment
            </Link>
            <button className="block w-full py-3.5 bg-[#a855f7] hover:opacity-90 active:opacity-100 text-white text-center rounded-xl text-sm font-medium transition-colors shadow-sm">
              My Complaints
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;







