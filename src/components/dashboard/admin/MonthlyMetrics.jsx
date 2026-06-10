import React from 'react';
import { Wallet, CalendarCheck } from 'lucide-react';

/* * * NEW COMPONENT * *
 * Tracks section 1: Monthly business metrics.
 * Displays gross income volume and total processed bookings contextually for the filtered view.
 */
export default function MonthlyMetrics({ revenue, totalBookings, completed, active, selectedMonth, selectedYear }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Gross Revenue Counter */}
      <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase text-slate-500">
            Gross Revenue Volume ({selectedMonth} {selectedYear})
          </span>
          <h3 className="text-3xl font-black text-emerald-400">
            ₦{revenue.toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">All completed intake for this month scale</p>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400">
          <Wallet size={24} />
        </div>
      </div>

      {/* Booking Counters */}
      <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase text-slate-500">
            Bookings Processed ({selectedMonth} {selectedYear})
          </span>
          <h3 className="text-3xl font-black text-white">
            {totalBookings} <span className="text-sm font-normal text-slate-500">Total</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            <span className="text-emerald-400 font-bold">{completed}</span> Completed &bull; <span className="text-blue-400 font-bold">{active}</span> Active
          </p>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-blue-400">
          <CalendarCheck size={24} />
        </div>
      </div>

    </div>
  );
}