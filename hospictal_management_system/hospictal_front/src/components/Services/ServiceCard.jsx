import MedicalIcon from "../common/MedicalIcon";

function ServiceCard({ service }) {
  return (
    <div className="bg-[#F0FDF4] text-emerald-950 rounded-xl p-4.5 border border-emerald-200/90 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200">
            <MedicalIcon name={service.icon || service.title} className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {service.title}
          </h3>
        </div>

        <p className="text-xs text-emerald-900/80 leading-normal mb-3 line-clamp-2 font-medium">
          {service.description}
        </p>
        
        {service.features && (
          <ul className="space-y-1 border-t border-emerald-200/60 pt-2.5">
            {service.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center text-[11px] text-emerald-900 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 flex-shrink-0"></span>
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;
