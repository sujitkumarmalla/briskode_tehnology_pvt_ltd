import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Available":
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-700 text-white shadow-xs">Available</span>;
      case "Busy":
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-600 text-white shadow-xs">Busy</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-700 text-white shadow-xs">On Leave</span>;
    }
  };

  return (
    <div className="bg-[#F0FDF4] rounded-xl border border-emerald-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Image container */}
      <div className="relative h-44 overflow-hidden bg-emerald-50 border-b border-emerald-200/80">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400";
          }}
        />
        <div className="absolute top-2 right-2">
          {getStatusBadge(doctor.status)}
        </div>
        <div className="absolute bottom-2 left-2 bg-emerald-950 text-white text-[10px] px-2 py-0.5 rounded flex items-center space-x-1 font-bold shadow-xs">
          <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{doctor.rating}</span>
        </div>
      </div>

      {/* Details container */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
            {doctor.department}
          </span>
          <h3 className="text-sm font-extrabold text-emerald-950 mt-0.5 group-hover:text-emerald-700 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-[11px] font-semibold text-emerald-900/80 mb-2 truncate">{doctor.qualification}</p>
          
          <div className="space-y-1 py-2 border-y border-emerald-200/60 text-[11px] text-emerald-900 my-2 font-medium">
            <div className="flex justify-between">
              <span className="text-emerald-800/70">Exp:</span>
              <span className="font-bold text-emerald-950">{doctor.experience} Yrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-800/70">Fee:</span>
              <span className="font-extrabold text-emerald-700">₹{doctor.consultationFee}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Link
            to={`/doctors/${doctor.id}`}
            className="w-full text-center px-2 py-1.5 border border-emerald-300 hover:border-emerald-700 hover:bg-emerald-100 text-emerald-950 text-[11px] font-bold rounded-lg transition-all"
          >
            Profile
          </Link>
          <Link
            to={`/appointment?doctorId=${doctor.id}`}
            className="w-full text-center px-2 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-xs"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
