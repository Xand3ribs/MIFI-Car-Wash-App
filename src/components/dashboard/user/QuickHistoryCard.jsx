// src/components/dashboards/user/QuickHistoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';

function QuickHistoryCard({ historyData }) {
  return (
    <div className="flex-1 bg-gray-dark border border-border-dark rounded-3xl p-5 flex flex-col gap-3 shadow-xl">

        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Recent History</h2>

      {historyData.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-3.5 rounded-xl bg-navy-deep/40 border border-border-dark/30 hover:border-blue-action/40 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{item.service}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{item.date} • {item.vehicle}</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
      ))}

      <Link
        to="/account/history"
        className="text-blue-action text-center font-bold text-xs mt-3 py-2 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl transition-colors block"
      >
        View full clean history logs
      </Link>
    </div>
  );
}

export default QuickHistoryCard;