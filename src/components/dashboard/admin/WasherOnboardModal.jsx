import React from 'react';
import { X, Phone, MapPin } from 'lucide-react';

export default function WasherOnboardModal({
  formData,
  setFormData,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gray-dark border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80 bg-slate-900/50">
          <div>
            <h4 className="font-bold text-white text-base">
              Onboard New Washer Crew
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Fill details to provision team system access tokens.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-500 hover:text-white rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
              />
              <input
                type="tel"
                required
                placeholder="e.g., +234 801 234 5678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              Address Location Base
            </label>
            <div className="relative">
              <MapPin
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
              />
              <input
                type="text"
                required
                placeholder="e.g., Ikeja, Lagos"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/60 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600 active:scale-95 transition-all"
            >
              Save & Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
