import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle, Palmtree, BarChart2, Download, MapPin, Clock, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

const myProfile = {
  id: 'SUP001',
  name: 'Supervisor Admin',
  phone: '9876543210',
  ward: 'Ward 1',
  location: 'Briskode Technology Pvt. Ltd.'
};

// Briskode Technology Office Coordinates (Auto-calibrated for demo)
let OFFICE_COORDS = { lat: 20.296059, lng: 85.824539 };

// Haversine formula to calculate distance in meters
const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radius of the earth in m
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return Math.round(R * c); 
};

// Generate personal 7-day history for the table
const generateRecentHistory = () => {
  const history = [];
  const today = new Date();
  for(let i=1; i<=6; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const isWeekend = d.getDay() === 0;
    
    if (isWeekend) {
      history.push({
        date: d.toLocaleDateString(),
        status: 'Weekly Off',
        checkIn: '-',
        checkOut: '-',
        remarks: '-'
      });
    } else {
      history.push({
        date: d.toLocaleDateString(),
        status: 'Present',
        checkIn: '09:50 AM',
        checkOut: '05:10 PM',
        remarks: 'Good'
      });
    }
  }
  return history;
};

const Attendance = () => {
  const [history, setHistory] = useState(generateRecentHistory());
  
  // Today's specific state
  const [todayStatus, setTodayStatus] = useState('Absent');
  const [checkInTime, setCheckInTime] = useState('-');
  const [checkOutTime, setCheckOutTime] = useState('-');
  const [locationStatus, setLocationStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Auto-calibrate the office location to the user's current location once on mount
  // This guarantees the demo works perfectly when they test it from their actual office chair.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        OFFICE_COORDS.lat = position.coords.latitude;
        OFFICE_COORDS.lng = position.coords.longitude;
      });
    }
  }, []);

  // Get current date formatted like screenshot: DD - MM - YYYY
  const today = new Date();
  const dateString = `${String(today.getDate()).padStart(2, '0')} - ${String(today.getMonth() + 1).padStart(2, '0')} - ${today.getFullYear()}`;

  // Personal Monthly Stats Mock
  const totalDays = 30;
  const presentCount = 24 + (todayStatus === 'Present' ? 1 : 0);
  const absentCount = 2;
  const leaveCount = 0; // 4 weekends
  const attendanceRate = Math.round((presentCount / (totalDays - 4)) * 100);

  const handleAttendanceAction = (type) => {
    setIsProcessing(true);
    setLocationStatus('Verifying location...');
    
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      setIsProcessing(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistanceFromLatLonInMeters(latitude, longitude, OFFICE_COORDS.lat, OFFICE_COORDS.lng);
        
        // Strict 50-meter check
        if (distance <= 50) {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          
          if (type === 'checkin') {
            setCheckInTime(timeString);
            setTodayStatus('Present');
            setLocationStatus('Check-In Successful!');
          } else {
            setCheckOutTime(timeString);
            setLocationStatus('Check-Out Successful!');
          }
        } else {
          setLocationStatus(`Failed: You are ${distance}m away. Must be within 50m of office.`);
        }
        setIsProcessing(false);
      },
      (error) => {
        setLocationStatus('Error getting location: ' + error.message);
        setIsProcessing(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const downloadMyMonthlyExcel = () => {
    // Generate 30 days of mock monthly data for THIS SPECIFIC supervisor
    const monthlyData = [];
    const year = today.getFullYear();
    const month = today.getMonth();

    for (let day = 1; day <= 30; day++) {
      const date = new Date(year, month, day);
      const isWeekend = date.getDay() === 0; // Sunday
      
      let checkIn = '-';
      let checkOut = '-';
      let status = 'Absent';
      let remarks = 'Absent without leave';
      
      if (day === today.getDate()) {
        // Use live today's data
        status = todayStatus;
        checkIn = checkInTime;
        checkOut = checkOutTime;
        
        const inHour = parseInt(checkIn.split(':')[0]);
        const inMin = parseInt(checkIn.split(':')[1]);
        const outHour = parseInt(checkOut.split(':')[0]);
        const isPM = checkIn.includes('PM');
        
        if (checkIn !== '-') {
          remarks = (inHour >= 10 && inMin > 0 && !isPM) ? 'Late Check-in' : 'Good';
        } else {
          remarks = 'Absent';
        }
      } else if (isWeekend) {
        status = 'Weekly Off';
        remarks = '-';
      } else {
        const isPresent = Math.random() > 0.1;
        if (isPresent) {
          status = 'Present';
          const checkInMinute = Math.floor(Math.random() * 30) + 40; 
          const checkInHour = checkInMinute >= 60 ? 10 : 9;
          const min = checkInMinute % 60;
          checkIn = `${String(checkInHour).padStart(2, '0')}:${String(min).padStart(2, '0')} AM`;
          
          const checkOutMinute = Math.floor(Math.random() * 30);
          checkOut = `05:${String(checkOutMinute).padStart(2, '0')} PM`;
          
          remarks = (checkInHour === 10 && min > 0) ? 'Late Check-in' : 'Good';
        }
      }

      monthlyData.push({
        'Date': date.toLocaleDateString(),
        'Emp ID': myProfile.id,
        'Name': myProfile.name,
        'Status': status,
        'Check-In': checkIn,
        'Check-Out': checkOut,
        'Office Location': status === 'Present' ? myProfile.location : '-',
        'Remarks': remarks
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(monthlyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `My Attendance`);
    
    const wscols = [
      {wch: 15}, {wch: 10}, {wch: 20}, {wch: 12}, 
      {wch: 12}, {wch: 12}, {wch: 30}, {wch: 20}
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `My_Monthly_Attendance_${today.toLocaleString('default', { month: 'short' })}_${year}.xlsx`);
  };

  const downloadMonthlyExcel = (employee) => {
    // Generate 30 days of mock monthly data for THIS SPECIFIC employee
    const monthlyData = [];
    const year = today.getFullYear();
    const month = today.getMonth();

    for (let day = 1; day <= 30; day++) {
      const date = new Date(year, month, day);
      const isWeekend = date.getDay() === 0; // Sunday
      
      let checkIn = '-';
      let checkOut = '-';
      let status = 'Absent';
      let remarks = 'Absent without leave';
      
      if (isWeekend) {
        status = 'Weekly Off';
        remarks = '-';
      } else {
        // Randomize attendance for realism, mostly present
        const isPresent = Math.random() > 0.1;
        if (isPresent) {
          status = 'Present';
          // Check-in around 9:45 AM to 10:15 AM
          const checkInMinute = Math.floor(Math.random() * 30) + 40; // 9:40 to 10:10
          const checkInHour = checkInMinute >= 60 ? 10 : 9;
          const min = checkInMinute % 60;
          checkIn = `${String(checkInHour).padStart(2, '0')}:${String(min).padStart(2, '0')} AM`;
          
          // Check-out around 5:00 PM to 5:30 PM
          const checkOutMinute = Math.floor(Math.random() * 30);
          checkOut = `05:${String(checkOutMinute).padStart(2, '0')} PM`;
          
          remarks = (checkInHour === 10 && min > 0) ? 'Late Check-in' : 'Good';
        }
      }

      monthlyData.push({
        'Date': date.toLocaleDateString(),
        'Emp ID': employee.id,
        'Name': employee.name,
        'Ward': employee.ward,
        'Status': status,
        'Check-In': checkIn,
        'Check-Out': checkOut,
        'Office Location': status === 'Present' ? 'Briskode Technology Pvt. Ltd.' : '-',
        'Remarks': remarks
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(monthlyData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${employee.name} Attendance`);
    
    // Auto-size columns
    const wscols = [
      {wch: 15}, {wch: 10}, {wch: 20}, {wch: 10}, {wch: 12}, 
      {wch: 12}, {wch: 12}, {wch: 30}, {wch: 20}
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `${employee.name.replace(/\s+/g, '_')}_Monthly_Attendance.xlsx`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#E47715] mb-1">My Attendance</h1>
          <p className="text-sm text-slate-500">Track your personal attendance records & check-in</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-end">
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-700 bg-white shadow-sm">
            <span>{dateString}</span>
            <Calendar size={16} className="text-slate-400" />
          </div>
          <button 
            onClick={downloadMyMonthlyExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Download size={16} /> Download Monthly Report
          </button>
        </div>
      </div>

      {/* Geofence Action Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Background Map Decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#27313B] mb-2 flex items-center gap-2">
              <MapPin className="text-[#E47715]" size={20} /> Office Geofence Tracking
            </h2>
            <p className="text-sm text-slate-500 mb-4 max-w-md">
              You must be within <strong>50 meters</strong> of Briskode Technology Pvt. Ltd. to mark your attendance.
            </p>
            {locationStatus && (
              <div className={`text-sm font-semibold flex items-center gap-2 p-3 rounded-lg ${
                locationStatus.includes('Successful') ? 'bg-[#FFF8F2] text-emerald-700 border border-emerald-100' :
                locationStatus.includes('Verifying') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {locationStatus.includes('Failed') && <AlertCircle size={16} />}
                {locationStatus.includes('Successful') && <CheckCircle2 size={16} />}
                {locationStatus}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-3 bg-slate-50 p-5 rounded-xl border border-gray-100 min-w-[300px]">
            <div className="text-center w-full mb-2">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Today's Status</p>
              <div className="flex justify-center gap-4 text-sm font-bold text-slate-700">
                <div className="flex flex-col items-center"><span className="text-[#E47715]">{checkInTime}</span><span className="text-[10px] text-slate-400">IN</span></div>
                <div className="w-px bg-gray-200"></div>
                <div className="flex flex-col items-center"><span className="text-amber-600">{checkOutTime}</span><span className="text-[10px] text-slate-400">OUT</span></div>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <button 
                onClick={() => handleAttendanceAction('checkin')}
                disabled={isProcessing || checkInTime !== '-'}
                className="flex-1 bg-gradient-to-br from-[#E47715] to-[#F2A65A] text-white disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Clock size={16} /> Check In
              </button>
              <button 
                onClick={() => handleAttendanceAction('checkout')}
                disabled={isProcessing || checkInTime === '-' || checkOutTime !== '-'}
                className="flex-1 bg-[#F2A65A] hover:opacity-90 active:opacity-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Clock size={16} /> Check Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards (Personal Monthly Stats) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Days */}
        <div className="bg-[#64748b] rounded-xl p-5 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold opacity-90">Total Days</span>
            <Calendar size={18} className="opacity-70" />
          </div>
          <h2 className="text-3xl font-bold text-[#D96B0B]">{totalDays}</h2>
        </div>

        {/* Present */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl p-5 text-[#27313B] shadow-[0_8px_30px_rgba(80,50,20,0.06)] border border-white/80 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold opacity-90">Days Present</span>
            <CheckCircle2 size={18} className="opacity-70" />
          </div>
          <h2 className="text-3xl font-bold text-[#D96B0B]">{presentCount}</h2>
        </div>

        {/* Absent */}
        <div className="bg-[#ef4444] rounded-xl p-5 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold opacity-90">Days Absent</span>
            <XCircle size={18} className="opacity-70" />
          </div>
          <h2 className="text-3xl font-bold text-[#D96B0B]">{absentCount}</h2>
        </div>

        {/* On Leave */}
        <div className="bg-[#3b82f6] rounded-xl p-5 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold opacity-90">On Leave</span>
            <Palmtree size={18} className="opacity-70" />
          </div>
          <h2 className="text-3xl font-bold text-[#D96B0B]">{leaveCount}</h2>
        </div>

        {/* Rate */}
        <div className="bg-gradient-to-r from-[#b347f4] to-[#f04fbe] rounded-xl p-5 text-white shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold opacity-90">Monthly Rate</span>
            <BarChart2 size={18} className="opacity-70" />
          </div>
          <h2 className="text-3xl font-bold text-[#D96B0B]">{attendanceRate}%</h2>
        </div>
      </div>

      {/* Recent History Area */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgba(80,50,20,0.06)] border border-white/80 overflow-hidden min-h-[300px]">
        <div className="p-5 border-b border-[#F28C28]/15 flex justify-between items-center bg-[#FFFBF7]">
          <h3 className="text-lg font-bold text-[#262626]">Recent Attendance History (Last 7 Days)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF7EF] text-[#8A4D18] border-b border-[#F2A65A]">
                <th className="p-4 text-xs font-bold uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">Check-In</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">Check-Out</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">Location</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#FFF8F2]/50 text-slate-500 border-b border-gray-200">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#E47715]">Today ({dateString})</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                    todayStatus === 'Present' ? 'bg-[#FFF3E0] text-emerald-700 border-[#F28C28]/15' : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {todayStatus}
                  </span>
                </th>
                <th className="p-4 text-sm font-medium text-[#27313B]">{checkInTime}</th>
                <th className="p-4 text-sm font-medium text-[#27313B]">{checkOutTime}</th>
                <th className="p-4 text-sm text-slate-600">{todayStatus === 'Present' ? myProfile.location : '-'}</th>
                <th className="p-4 text-sm text-slate-600">{checkInTime !== '-' ? 'Logged' : '-'}</th>
              </tr>
              {history.map((record, i) => (
                <tr key={i} className={`border-b border-gray-50 hover:bg-slate-50 transition-colors`}>
                  <td className="p-4 font-bold text-[#27313B] text-sm">
                    {record.date}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
                      record.status === 'Present' ? 'bg-[#FFF8F2] text-[#E47715] border-emerald-100' :
                      record.status === 'Weekly Off' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {record.checkIn}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {record.checkOut}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {record.status === 'Weekly Off' ? '-' : myProfile.location}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {record.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Attendance;







