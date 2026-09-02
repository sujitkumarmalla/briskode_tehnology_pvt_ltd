import React from "react";

export default function StatCard({ title, value, icon: Icon, color = "blue", subtext, trend }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100"
  };

  const iconBg = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl border ${iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {(subtext || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          {trend && (
            <span className="text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}
