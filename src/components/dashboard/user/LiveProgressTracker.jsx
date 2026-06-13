// src/components/dashboards/user/LiveProgressTracker.jsx
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

function LiveProgressTracker({
  selectedService,
  selectedVehicle,
  currentWashStatus,
  timelineSteps,
  selectedDate,
  selectedTime,
  address,
}) {
  return (
    <div className="bg-gray-dark border border-border-dark rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
      {/* Service Header Block */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold text-blue-action tracking-widest uppercase bg-blue-action/10 px-2.5 py-1 rounded-md border border-blue-action/20">
            {selectedService || 'Full Detail Deluxe'}
          </span>
          <h3 className="text-2xl font-black mt-3 flex items-center gap-2">
            {selectedVehicle || 'Tesla Model 3'}
          </h3>
        </div>

        <span
          className={`text-xs font-black px-3 py-1.5 rounded-xl border ${
            currentWashStatus === 'Completed'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-blue-action/10 text-blue-action border-blue-action/20 animate-pulse'
          }`}
        >
          ● {currentWashStatus}
        </span>
      </div>

      {/* Visual Progress Steps Bar */}
      <div className="bg-navy-deep/40 border border-slate-800/80 rounded-2xl p-4 grid grid-cols-4 gap-2 text-center relative">
        {timelineSteps?.map((phase, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                phase.done
                  ? 'bg-blue-action text-navy-deep'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}
            >
              {phase.done ? '✓' : idx + 1}
            </div>
            <span
              className={`text-[10px] font-bold tracking-wide ${phase.done ? 'text-slate-200' : 'text-slate-600'}`}
            >
              {phase.step}
            </span>
          </div>
        ))}
      </div>

      {/* Operational Metrics Sub-Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-navy-deep/20 rounded-2xl p-4 border border-border-dark/30">
        <div className="flex items-center gap-3 text-sm">
          <div className="p-2.5 bg-slate-800/60 rounded-xl text-blue-action">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              Scheduled Date & Time
            </p>
            <p className="font-semibold text-slate-200">
              {selectedDate || 'Tomorrow, May 26'} at{' '}
              {selectedTime || '10:30 AM'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="p-2.5 bg-slate-800/60 rounded-xl text-blue-action">
            <MapPin size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              Service Location
            </p>
            <p className="font-semibold text-slate-200 truncate">
              {address || '123 Main St, Lagos'}
            </p>
          </div>
        </div>
      </div>

      {/* User Modification Actions Trigger Menu */}
      <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-slate-800/60">
        <button
          disabled={
            currentWashStatus === 'Washing' || currentWashStatus === 'Completed'
          }
          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 px-6 py-3 rounded-xl font-bold text-xs border border-slate-700 transition-all active:scale-[0.99]"
        >
          Reschedule
        </button>
        <button
          disabled={
            currentWashStatus === 'Washing' || currentWashStatus === 'Completed'
          }
          className="bg-transparent text-slate-400 hover:text-red-400 hover:bg-red-500/5 disabled:opacity-0 px-6 py-3 rounded-xl font-bold text-xs transition-all"
        >
          Cancel Session
        </button>
        {(currentWashStatus === 'Washing' ||
          currentWashStatus === 'Completed') && (
          <p className="text-[11px] text-slate-500 italic flex items-center gap-1 ml-auto">
            {currentWashStatus === 'Completed'
              ? 'Service finalized.'
              : 'Changes locked while wash process is active.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default LiveProgressTracker;
