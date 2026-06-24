import React from 'react';
import {
  Clock,
  MapPin,
  ChevronRight,
  Phone,
  Navigation,
  Home,
  Play,
} from 'lucide-react';

export default function ActiveJobCard({ job, onClick }) {
  if (!job) {
    return (
      <div className="bg-gray-dark border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
        All clear! No current active washes assigned.
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'En Route':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          text: 'En Route to Location',
          icon: <Navigation size={12} className="animate-pulse" />,
          borderStyle: 'border-amber-500/50',
        };
      case 'Arrived':
        return {
          bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          text: 'Arrived at Customer Location',
          icon: <Home size={12} />,
          borderStyle: 'border-indigo-500/50',
        };
      case 'In Progress':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          text: 'Wash In Progress',
          icon: (
            <Play
              size={12}
              className="animate-spin"
              style={{ animationDuration: '3s' }}
            />
          ),
          borderStyle: 'border-emerald-500',
        };
      case 'Confirmed':
      default:
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          text: 'Next Up',
          icon: <Clock size={12} />,
          borderStyle: 'border-blue-action',
        };
    }
  };

  const statusConfig = getStatusConfig(job.status);

  return (
    <div
      onClick={onClick}
      className={`bg-gray-dark border ${statusConfig.borderStyle} rounded-2xl p-4 shadow-xl flex flex-col gap-3 cursor-pointer
       transition-all active:scale-[0.99] group relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 left-0 h-[2px] ${statusConfig.bg.split(' ')[0]}`} />

      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase bg-slate-800 px-2 py-0.5 rounded-md">
              {job.service}
            </span>

            <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md border flex items-center gap-1 ${statusConfig.bg}`}>
              {statusConfig.icon} {statusConfig.text}
            </span>
          </div>

          <h4 className="text-lg text-white font-bold mt-2.5 group-hover:text-blue-400 transition-colors truncate">
            {job.name}
          </h4>
          <p className="text-slate-400 text-xs mt-0.5">{job.car}</p>
        </div>

        <div className="text-right flex flex-col items-end shrink-0 ml-2">
          <span className="text-blue-400 font-bold text-sm flex items-center gap-1">
            <Clock size={13} /> {job.time}
          </span>

          <a
            href={`tel:${job.phone || '+234800000000'}`}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Call ${job?.name ?? 'customer'}`}
            className="mt-3 p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors shadow-inner"
          >
            <Phone size={14} />
          </a>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl p-2.5 my-1 text-xs text-slate-400 flex items-center justify-between">
        {job.status === 'En Route' ? (
          <p>
            🚘 Driving timeline estimate:{' '}
            <span className="text-amber-400 font-semibold">
              {job.driveTime} cushion window
            </span>
          </p>
        ) : job.status === 'Arrived' ? (
          <p className="text-indigo-300 font-medium animate-pulse">
            📍 Parked outside. Open sheet to begin physical cleaning setup.
          </p>
        ) : job.status === 'In Progress' ? (
          <p className="text-emerald-400 font-medium">
            🧼 Currently cleaning! Do not leave page until submission report is filed.
          </p>
        ) : (
          <p>
            🏁 Distance from last point:{' '}
            <span className="text-blue-400 font-semibold">
              {job.distance} away
            </span>
          </p>
        )}
      </div>

      <div className="border-t border-slate-800/60 pt-2.5 flex items-center justify-between text-slate-400 text-xs">
        <span className="flex items-center gap-1 truncate max-w-[75%]">
          <MapPin size={14} className="text-red-400 shrink-0" />
          <span className="truncate">{job.address}</span>
        </span>
        <span className="text-blue-400 font-bold flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform">
          Open Actions <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
}