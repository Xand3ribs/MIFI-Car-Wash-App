import React, { useState } from 'react';
import HistoryCard from '../components/dashboard/user/HistoryCard';
import HistoryDetailModal from '../components/dashboard/user/HistoryDetailModal';

const FILTER_TIERS = ['all', 'completed', 'cancelled'];

const MONTHS = [
  { value: 'all', label: 'All Months' },
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
];

function MasterHistoryLog({ role = 'user', initialData = [] }) {

  const [filter, setFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

  const getMonthFromDateStr = (dateStr) => {
    if (!dateStr || dateStr.includes('Pending')) return null;
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime())
      ? null
      : parsedDate.getMonth().toString();
  };

  const monthFilteredData = initialData.filter((item) => {
    if (selectedMonth === 'all') return true;
    const itemMonth = getMonthFromDateStr(item.date);
    return itemMonth === selectedMonth;
  });

  const counts = {
    all: monthFilteredData.length,
    completed: monthFilteredData.filter(
      (item) => item.status?.toLowerCase() === 'completed'
    ).length,
    cancelled: monthFilteredData.filter(
      (item) => item.status?.toLowerCase() === 'cancelled'
    ).length,
  };

  const finalFilteredData = monthFilteredData.filter((item) => {
    if (filter === 'all') return true;
    return item.status?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="flex flex-col gap-6 w-full relative">
      
      {/* FILTER CONTROLS ROW */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">

        {/* Status Tab Group */}
        <div className="flex gap-2 bg-navy-deep/60 border border-slate-800 p-1.5 rounded-xl max-w-full overflow-x-auto">
          {FILTER_TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => setFilter(tier)}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                filter === tier
                  ? 'bg-blue-action text-navy-deep shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tier}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                  filter === tier
                    ? 'bg-navy-deep/20 text-navy-deep'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {counts[tier] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Combined Month Dropdown Selector */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-48 bg-navy-deep/60 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-blue-action transition-all cursor-pointer"
          >
            {MONTHS.map((m) => (
              <option
                key={m.value}
                value={m.value}
                className="bg-gray-dark text-white"
              >
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RENDER LIST FEED OF CARDS */}
      <div className="flex flex-col gap-4">
        {finalFilteredData.length === 0 ? (
          <div className="bg-gray-dark border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
            No past washes. Book a wash now
          </div>
        ) : (
          finalFilteredData.map((log) => (
            <HistoryCard
              key={log.id}
              log={log}
              role={role}
              onCardClick={setSelectedLog}
            />
          ))
        )}
      </div>

      {/* RENDER THE POP-UP INVOICE MODAL */}
      <HistoryDetailModal
        log={selectedLog}
        role={role}
        onClose={() => setSelectedLog(null)}
      />
    </div>
  );
}

export default MasterHistoryLog;
