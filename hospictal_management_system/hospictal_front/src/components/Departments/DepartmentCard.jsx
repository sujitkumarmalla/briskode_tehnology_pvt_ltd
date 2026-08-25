import { Link } from "react-router-dom";
import MedicalIcon from "../common/MedicalIcon";

function DepartmentCard({ department }) {
  return (
    <div className="bg-[#F0FDF4] rounded-xl p-4.5 border border-emerald-200/90 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200">
              <MedicalIcon name={department.icon || department.name} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                {department.name}
              </h3>
              <p className="text-[10px] font-bold text-emerald-700">Head: {department.headDoctor}</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-800 text-white rounded-md">
            {department.bedCapacity} Beds
          </span>
        </div>
        
        <p className="text-xs text-emerald-900/80 leading-normal mb-3 line-clamp-2 font-medium">
          {department.description}
        </p>

        {department.symptoms && (
          <div className="mb-3 pt-2 border-t border-emerald-200/60">
            <div className="flex flex-wrap gap-1">
              {department.symptoms.slice(0, 3).map((symp, idx) => (
                <span key={idx} className="text-[10px] font-semibold bg-emerald-100/80 text-emerald-950 border border-emerald-200 px-1.5 py-0.5 rounded">
                  {symp}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        to={`/doctors?department=${encodeURIComponent(department.name)}`}
        className="mt-2 w-full text-center py-2 px-3 border border-emerald-700 bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold rounded-lg transition-all"
      >
        View Doctors
      </Link>
    </div>
  );
}

export default DepartmentCard;
