import React, { useState } from 'react';
import HistoryCard from '../components/dashboard/user/HistoryCard';
import HistoryDetailModal from '../components/dashboard/user/HistoryDetailModal';

const FILTER_TIERS = ['all', 'completed', 'cancelled'];

function MasterHistoryLog({ role = 'user', initialData }) {
  const [filter, setFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

  // Logic: Filter layout utility data parsing configuration
  const filteredData = initialData ? initialData.filter(item => {
    if (filter === 'all') return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  }) : [];

  return (
    <div className="flex flex-col gap-6 w-full relative">
      
      {/* FILTER BUTTONS ROW */}
      <div className="flex gap-2 bg-navy-deep/60 border border-slate-800 p-1.5 rounded-xl self-start">
        {FILTER_TIERS.map((tier) => (
          <button
            key={tier}
            onClick={() => setFilter(tier)}
            className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              filter === tier 
                ? 'bg-blue-action text-navy-deep shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* RENDER LIST FEED OF CARDS */}
      <div className="flex flex-col gap-4">
        {filteredData.length === 0 ? (
          <div className="bg-gray-dark border border-border-dark rounded-2xl p-12 text-center text-slate-500 text-sm">
            No past historical records found matching your selection.
          </div>
        ) : (
          filteredData.map((log) => (
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