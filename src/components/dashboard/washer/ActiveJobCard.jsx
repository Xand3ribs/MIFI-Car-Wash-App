// src/components/dashboard/washer/ActiveJobCard.jsx
import React from 'react';
import { Clock, MapPin, ChevronRight, Phone } from 'lucide-react';

export default function ActiveJobCard({ job, onClick }) {
  if (!job) {
    return (
      <div className="bg-gray-dark border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
        All clear! No current active washes assigned.
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-gray-dark border border-blue-action rounded-2xl p-4 shadow-xl flex flex-col gap-3 cursor-pointer
       transition-all active:scale-[0.99] group"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold text-blue-400 tracking-wide uppercase bg-blue-500/10 px-2 py-0.5 rounded-md">
            {job.service}
          </span>
          <h4 className="text-lg text-white font-bold mt-2 group-hover:text-blue-400 transition-colors">
            {job.name}
          </h4>
          <p className="text-white text-xs mt-0.5">{job.car}</p>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-blue-400 font-bold text-sm flex items-center gap-1">
            <Clock size={13} /> {job.time}
          </span>

          {/* ONE-TAP PHONE DIALER BUTTON */}
          <a
            href={`tel:${job.phone || '+234800000000'}`}
            onClick={(e) => e.stopPropagation()} // Stops the card from opening the detail screen when just trying to call!
            className="mt-2 p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors"
          >
            <Phone size={14} />
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800/60 pt-2.5 mt-1 flex items-center justify-between text-slate-400 text-xs">
        <span className="flex items-center gap-1 truncate max-w-[80%]">
          <MapPin size={14} className="text-red-400 shrink-0" /> {job.address}
          <span className="text-[10px] text-slate-500 font-semibold mt-1">
            {job.distance} away
          </span>
        </span>
        <span className="text-blue-400 font-bold flex items-center gap-0.5 shrink-0">
          View Sheet <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
}
