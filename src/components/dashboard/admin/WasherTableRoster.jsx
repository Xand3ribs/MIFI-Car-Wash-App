import React from 'react';
import { MapPin, Key, Trash2 } from 'lucide-react';

export default function WasherTableRoster({ crewList, onToggleDuty }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
            <th className="py-3 px-2">Washer Operator</th>
            <th className="py-3 px-2">Location Base</th>
            <th className="py-3 px-2">Stats Volume</th>
            <th className="py-3 px-2 text-center">Duty Status</th>
            <th className="py-3 px-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40 font-medium text-slate-300">
          {crewList.map((washer) => (
            <tr
              key={washer.id}
              className="hover:bg-slate-900/30 transition-colors group"
            >
              {/* Profile Details */}
              <td className="py-4 px-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold text-sm">
                    {washer.name}
                  </span>
                  <span className="text-slate-500 font-mono tracking-tight text-[11px]">
                    {washer.id} &bull; {washer.phone}
                  </span>
                </div>
              </td>

              {/* Location Base */}
              <td className="py-4 px-2 text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} className="text-slate-600" />
                  {washer.location}
                </span>
              </td>

              {/* Metrics Performance Stats */}
              <td className="py-4 px-2">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-semibold">
                    {washer.washes} Completed
                  </span>
                  <span className="text-emerald-500 font-bold">
                    ₦{washer.earnings.toLocaleString()}
                  </span>
                </div>
              </td>

              {/* Toggle Switch Button */}
              <td className="py-4 px-2 text-center">
                <button
                  type="button"
                  onClick={() => onToggleDuty(washer.id)}
                  className="focus:outline-none inline-flex items-center justify-center transition-transform active:scale-90"
                  title={washer.isOnDuty ? 'Mark Off-Duty' : 'Mark On-Duty'}
                >
                  {washer.isOnDuty ? (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      On-Duty
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-slate-800 text-slate-500 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border border-slate-700/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      Off-Duty
                    </div>
                  )}
                </button>
              </td>

              {/* Quick utility tools */}
              <td className="py-4 px-2 text-right">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
                    title="Reset Password Credentials"
                  >
                    <Key size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                    title="Deactivate Account"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
