import React from 'react';
import { MapPin, Key, Trash2, Phone } from 'lucide-react';

export default function WasherTableRoster({ crewList, onToggleDuty }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
            <th className="py-3 px-2">Washer Operator</th>
            <th className="py-3 px-2">Location Base</th>
            <th className="py-3 px-2">Phone Number</th>
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
                </div>
              </td>

              {/* Location Base */}
              <td className="py-4 px-2 text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} className="text-slate-600" />
                  {washer.location}
                </span>
              </td>

              {/* Phone Number */}
              <td className="py-4 px-2 text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Phone size={13} className="text-slate-600" />
                  {washer.phone}
                </span>
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
