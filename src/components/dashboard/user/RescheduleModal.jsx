import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Ban, X } from 'lucide-react';

const TIME_SLOTS = [
  { label: '9:00 AM', hour: 9 }, { label: '10:00 AM', hour: 10 },
  { label: '11:00 AM', hour: 11 }, { label: '12:00 PM', hour: 12 },
  { label: '1:00 PM', hour: 13 }, { label: '2:00 PM', hour: 14 },
  { label: '3:00 PM', hour: 15 }, { label: '4:00 PM', hour: 16 },
  { label: '5:00 PM', hour: 17 }
];

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function RescheduleModal({ isOpen, onClose, defaultDate, defaultTime, onConfirm, isSubmitting }) {
  const today = getTodayString();
  const [newDate, setNewDate] = useState(defaultDate || '');
  const [newTime, setNewTime] = useState(defaultTime || '');

  const slotStates = useMemo(() => {
    const isToday = newDate === today;
    const currentHour = new Date().getHours();
    return TIME_SLOTS.map(slot => ({
      ...slot,
      disabled: isToday && slot.hour <= currentHour
    }));
  }, [newDate, today]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-navy-deep border border-slate-800 w-full max-w-xl rounded-3xl p-6 relative shadow-2xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-100 transition-colors">
          <X size={20} />
        </button>

        <h3 className="text-xl font-black text-slate-100">Reschedule Appointment</h3>
        <p className="text-slate-400 text-xs mt-1">Select a new preferred date and time slot for your service below.</p>

        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col gap-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider"><Calendar size={13} />Choose Date</label>
            <input
              type="date"
              min={today}
              value={newDate}
              onChange={(e) => {
                setNewDate(e.target.value);
                setNewTime('');
              }}
              className="w-full bg-slate-800/50 border border-slate-800 rounded-2xl px-4 py-3.5 text-white text-sm focus:border-blue-action/70 focus:outline-none transition-colors [color-scheme:dark]"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider"><Clock size={13} />Available Time Slots</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {slotStates.map(({ label, disabled }) => (
                <button
                  key={label}
                  disabled={disabled}
                  onClick={() => setNewTime(label)}
                  className={`relative flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border text-xs font-bold transition-all duration-200 ${
                    disabled
                      ? 'bg-white/[0.01] border-white/5 text-white/20 opacity-30 cursor-not-allowed pointer-events-none'
                      : newTime === label
                        ? 'bg-blue-action border-blue-action text-navy-deep font-black shadow-[0_0_15px_rgba(0,200,255,0.3)]'
                        : 'bg-slate-800/40 border-slate-800/80 text-slate-200 hover:border-blue-action/50 hover:bg-slate-800'
                  }`}
                >
                  {disabled && <Ban size={11} className="text-white/30 shrink-0" />}
                  <span className={disabled ? 'line-through decoration-white/10' : ''}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 border-t border-slate-800/60 pt-4">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-bold transition-all">Nevermind</button>
          <button
            onClick={() => onConfirm(newDate, newTime)}
            disabled={isSubmitting || !newDate || !newTime}
            className="flex-1 bg-blue-action text-navy-deep py-3 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center"
          >
            {isSubmitting ? "Updating..." : "Update Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RescheduleModal;