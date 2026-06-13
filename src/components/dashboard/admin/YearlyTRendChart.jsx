import React from 'react';

export default function YearlyTrendChart({
  chartData,
  selectedYear,
  onYearChange,
  availableYears,
}) {
  return (
    <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h4 className="font-bold text-base">
            Annual Volume & Revenue Trends
          </h4>
          <p className="text-xs text-slate-500">
            Month-by-month comparative operational overview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">
            Filter Year:
          </span>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-white font-bold px-3 py-2 rounded-xl outline-none focus:border-blue-500 cursor-pointer"
          >
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full pt-4 px-2 overflow-x-auto">
        <div className="flex items-end justify-between gap-3 h-56 border-b border-slate-800 pb-2 min-w-[600px] relative select-none">
          {chartData.map((data) => (
            <div
              key={data.month}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
            >
              {/* Graphical Column Bar */}
              {/* * * CHANGE MADE HERE:
               * Added 'relative' directly to this column block so child elements
               * compute their absolute position layout boundaries directly from the bar itself.
               */}
              <div
                className={`w-full max-w-[24px] ${data.barHeight} bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm group-hover:from-emerald-500 group-hover:to-emerald-400 transition-all duration-300 shadow-lg relative`}
              >
                {/* * * CHANGE MADE HERE:
                 * Clean, zero-state custom pure CSS tooltip.
                 * Set 'top-1/2 -translate-y-1/2' to lock it vertically halfway down the bar,
                 * and 'left-1/2 -translate-x-1/2' to center it perfectly horizontally.
                 */}
                <div className="opacity-0 group-hover:opacity-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 border border-slate-700 p-1.5 rounded-lg text-[10px] font-bold text-center pointer-events-none transition-opacity shadow-2xl z-50 whitespace-nowrap">
                  <p className="text-emerald-400">
                    ₦{data.revenue.toLocaleString()}
                  </p>
                  <p className="text-slate-400">
                    {data.bookings} {data.bookings === 1 ? 'Job' : 'Jobs'}
                  </p>
                </div>

                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 group-hover:text-white">
                  {data.bookings}
                </span>
              </div>

              <span className="text-[11px] font-bold text-slate-500 group-hover:text-white transition-colors">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
