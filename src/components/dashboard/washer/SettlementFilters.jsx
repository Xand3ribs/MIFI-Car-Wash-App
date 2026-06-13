import React from 'react';
import { Filter } from 'lucide-react';

export default function SettlementFilters({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  months,
  years,
}) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <div className="hidden xs:flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
        <Filter size={12} className="text-blue-action" />
        <span>Filter:</span>
      </div>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="select select-sm bg-navy-dark border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-action flex-1 sm:flex-none sm:min-w-[120px]"
      >
        <option value="all">All Months</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="select select-sm bg-navy-dark border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-action flex-1 sm:flex-none sm:min-w-[100px]"
      >
        <option value="all">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
