import React, { useState } from 'react';
import { X } from 'lucide-react';

const PREDEFINED_REASONS = [
  "Change of plans / Unavailable",
  "Weather conditions",
  "Booked wrong date/time",
  "Pricing too high",
  "Other"
];

function CancelModal({ isOpen, onClose, onConfirm, isSubmitting }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("Please select a reason for cancellation.");
      return;
    }
    const finalReason = selectedReason === "Other" ? `Other: ${customNote}` : selectedReason;
    onConfirm(finalReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-navy-deep border border-slate-800 w-full max-w-md rounded-3xl p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-100 transition-colors">
          <X size={20} />
        </button>
        
        <h3 className="text-xl font-black text-slate-100 pr-6">Cancel Appointment</h3>
        <p className="text-slate-400 text-xs mt-2 leading-relaxed">
          Are you sure you want to cancel your wash appointment? Please let us know why so we can improve our service.
        </p>

        <div className="flex flex-col gap-2 mt-5">
          {PREDEFINED_REASONS.map((reason, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedReason(reason)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold border transition-all ${
                selectedReason === reason
                  ? 'bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                  : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {reason}
            </button>
          ))}
        </div>

        {selectedReason === "Other" && (
          <textarea
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Please tell us more..."
            maxLength={200}
            className="w-full mt-3 p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-slate-700 placeholder-slate-600 resize-none h-20 transition-all"
          />
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-bold transition-all">
            Keep Appointment
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedReason}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center"
          >
            {isSubmitting ? "Cancelling..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelModal;