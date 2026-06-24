import React from 'react';
import {
  X,
  ShieldCheck,
  XCircle,
  Car,
  Clock,
  MapPin,
  ArrowRightLeft,
  FileText,
} from 'lucide-react';

function HistoryDetailModal({ log, role, onClose }) {
  if (!log) return null;

  const isCancelled = log.status?.toLowerCase() === 'cancelled';

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Centered Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-gray-dark border border-slate-800 w-[95%] sm:w-[92%] max-w-md max-h-[90vh] rounded-3xl p-6 shadow-2xl pointer-events-auto flex flex-col justify-between overflow-y-auto animate-zoom-in text-white">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-action">
                  Session Breakdown
                </span>
                <h3 className="text-xl font-black mt-0.5">
                  Order #BK-{log.id}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close details"
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Status Banner */}
            <div
              className={`mt-5 p-3 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${
                log.status === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {log.status === 'Completed' ? (
                <ShieldCheck size={16} />
              ) : (
                <XCircle size={16} />
              )}
              STATUS: {log.status}
            </div>

            {/* Core Details Stack */}
            <div className="mt-5 flex flex-col gap-4">
              {/* Vehicle */}
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Serviced Vehicle Fleet Profile
                </p>
                <div className="flex items-center gap-3 bg-navy-deep p-3 rounded-xl border border-slate-800">
                  <Car className="text-blue-action" size={20} />
                  <div>
                    <p className="text-sm font-black text-slate-100">
                      {log.vehicle}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Premium Care Treatment Tier
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Logs */}
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Operation Time Stamps
                </p>
                <div className="grid grid-cols-2 gap-3 bg-navy-deep p-3 rounded-xl border border-slate-800 text-xs">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Clock size={11} /> Service Started
                    </span>
                    <span className="font-bold text-slate-300">
                      {isCancelled ? '---' : (log.timeStarted || '09:14 AM')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-l border-slate-800 pl-3">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Clock size={11} /> Service Completed
                    </span>
                    <span className="font-bold text-slate-300">
                      {isCancelled ? 'Cancelled' : (log.timeEnded || '10:32 AM')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Address Location */}
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Dispatch Address Location
                </p>
                <div className="flex items-start gap-2 text-xs text-slate-300 bg-navy-deep p-3 rounded-xl border border-slate-800">
                  <MapPin
                    size={16}
                    className="text-slate-500 shrink-0 mt-0.5"
                  />
                  <p className="leading-relaxed font-medium">
                    {log.address}
                  </p>
                </div>
              </div>

              {/* Personnel Block */}
              {!(role === 'user' && isCancelled) && (
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {role === 'user'
                      ? 'Assigned Detailing Operator'
                      : 'Client Profile Details'}
                  </p>
                  <div className="text-xs bg-navy-deep p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-200">
                      {role === 'user' ? log.washerName : log.customerName}
                    </span>
                  </div>
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="flex flex-col gap-1 mt-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Fare Settlement Invoice
                </p>
                <div className="bg-navy-deep/40 rounded-xl p-3.5 border border-slate-800 text-xs flex flex-col gap-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Rate</span>
                    <span className="font-mono">
                      ₦{(log.price * 0.85).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Eco Water Levy</span>
                    <span className="font-mono">
                      ₦{(log.price * 0.1).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Logistics Surcharge</span>
                    <span className="font-mono">
                      ₦{(log.price * 0.05).toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-slate-800 my-1" />
                  <div className="flex justify-between text-sm font-black text-slate-100">
                    <span>Total Net Paid Balance</span>
                    <span className="font-mono text-blue-action">
                      ₦{log.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800/80 mt-5">
            {role === 'user' ? (
              <button 
                onClick={() => alert('Rebooking implementation scoped for next development task.')}
                className="w-full bg-blue-action text-navy-deep py-3 rounded-xl font-black text-sm shadow-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <ArrowRightLeft size={16} /> Rebook This Exact Clean
              </button>
            ) : (
              <button className="w-full bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 py-3 rounded-xl font-black text-sm shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                <FileText size={16} /> Lodge Dispute Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryDetailModal;