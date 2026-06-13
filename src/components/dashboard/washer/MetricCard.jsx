import React from 'react';

export default function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-navy-deep border border-slate-800 p-5 md:p-6 rounded-2xl shadow-md flex justify-between items-start">
      <div>
        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400 block mb-2 md:mb-3">
          {label}
        </span>
        <div className="text-xl md:text-2xl font-black text-slate-100">
          {value}
        </div>
        <span className="text-[11px] text-slate-400 mt-1 block font-medium">
          {subtext}
        </span>
      </div>
      <div className={`p-2.5 md:p-3 bg-slate-800/40 rounded-xl ${color}`}>
        <Icon size={18} className="md:w-5 md:h-5" />
      </div>
    </div>
  );
}
