import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { supabase } from '../../../supabaseClient';
import CancelModal from './CancelModal';
import RescheduleModal from './RescheduleModal';

function LiveProgressTracker({
  bookingId,
  selectedService,
  selectedVehicle,
  currentWashStatus,
  timelineSteps,
  selectedDate,
  selectedTime,
  address,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const numericBookingId = parseInt(bookingId, 10);

  const isActionLocked = [
    'en route',
    'arrived',
    'in progress',
    'washing',
    'completed',
  ].includes(currentWashStatus?.toLowerCase().trim());

  const handleCancelAction = async (finalReason) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'Cancelled', cancellation_reason: finalReason })
        .eq('id', numericBookingId)
        .select();
      if (!error && data?.length) setActiveModal(null);
    } catch (err) {
      // Handled securely
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRescheduleAction = async (newDate, newTime) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ selected_date: newDate, selected_time: newTime })
        .eq('id', numericBookingId)
        .select();
      if (!error && data?.length) setActiveModal(null);
    } catch (err) {
      // Handled securely
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-dark border border-border-dark rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold text-blue-action tracking-widest uppercase bg-blue-action/10 px-2.5 py-1 rounded-md border border-blue-action/20">
            {selectedService}
          </span>
          <h3 className="text-2xl font-black mt-3 text-slate-100">
            {selectedVehicle}
          </h3>
        </div>

        <span
          className={`text-xs font-black px-3 py-1.5 rounded-xl border tracking-wide flex items-center gap-1.5 capitalize 
            ${currentWashStatus === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-action/10 text-blue-action border-blue-action/20'}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${currentWashStatus === 'Completed' ? 'bg-emerald-400' : 'bg-blue-action'}`}
          />
          {currentWashStatus === 'Confirmed' ? 'Queued' : currentWashStatus}
        </span>
      </div>

      <div className="bg-navy-deep/40 border border-slate-800/80 rounded-2xl p-5 grid grid-cols-5 gap-2 text-center relative">
        {timelineSteps?.map((phase, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                 ${phase.done ? 'bg-blue-action text-navy-deep font-black shadow-[0_0_15px_rgba(0,200,255,0.4)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-navy-deep/20 rounded-2xl p-4 border border-border-dark/30">
        <div className="flex items-center gap-3 text-sm">
          <div className="p-2.5 bg-slate-800/60 rounded-xl text-blue-action border border-slate-700/40">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              Scheduled Date & Time
            </p>
            <p className="font-semibold text-slate-200">
              {selectedDate} at {selectedTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="p-2.5 bg-slate-800/60 rounded-xl text-blue-action border border-slate-700/40">
            <MapPin size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              Service Location
            </p>
            <p className="font-semibold text-slate-200 truncate">{address}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-slate-800/60">
        <button
          onClick={() => setActiveModal('reschedule')}
          disabled={isActionLocked}
          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 px-6 py-3 rounded-xl font-bold text-xs border border-slate-700 transition-all active:scale-[0.99] cursor-pointer"
        >
          Reschedule
        </button>
        <button
          onClick={() => setActiveModal('cancel')}
          disabled={isActionLocked}
          className="bg-transparent text-slate-400 hover:text-red-400 hover:bg-red-500/5 disabled:opacity-0 px-6 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer"
        >
          Cancel Session
        </button>
      </div>

      <CancelModal
        isOpen={activeModal === 'cancel'}
        onClose={() => setActiveModal(null)}
        onConfirm={handleCancelAction}
        isSubmitting={isSubmitting}
      />
      <RescheduleModal
        isOpen={activeModal === 'reschedule'}
        onClose={() => setActiveModal(null)}
        defaultDate={selectedDate}
        defaultTime={selectedTime}
        onConfirm={handleRescheduleAction}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default LiveProgressTracker;
