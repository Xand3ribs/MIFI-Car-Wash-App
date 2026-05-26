import React from 'react';
import { Calendar, Car, ArrowRightLeft, FileText, CheckCircle2, XCircle } from 'lucide-react';

function HistoryCard({ log, role, onCardClick }) {
  return (
    <div 
      onClick={() => onCardClick(log)}
      className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-700/80 hover:bg-slate-900/40 cursor-pointer group"
    >
      {/* Left Core Data Container Block */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl mt-1 shrink-0 ${
          log.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {log.status === 'Completed' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/40">
              {log.service}
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Calendar size={12} /> {log.date}
            </span>
          </div>
          
          <h4 className="text-lg font-black text-slate-100 mt-0.5 flex items-center gap-2 group-hover:text-blue-action transition-colors">
            <Car size={18} className="text-blue-action" /> {log.vehicle}
          </h4>
          
          <p className="text-xs text-slate-400 leading-normal mt-0.5">
            <span className="font-bold text-slate-500">
              {role === 'user' ? 'Assigned Operator: ' : 'Client Name: '}
            </span>
            {role === 'user' ? log.washerName : log.customerName}
          </p>
        </div>
      </div>

      {/* Right Side Pricing & Actions Matrix */}
      <div className="flex items-center md:flex-col justify-between md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left md:text-right">
            {role === 'user' ? 'Invoice Amount' : 'Earnings Split'}
          </p>
          <p className="text-lg font-black text-slate-200 mt-0.5">
            ₦{log.price.toLocaleString()}
          </p>
        </div>

        {role === 'user' ? (
          <button 
            onClick={(e) => { e.stopPropagation(); alert("Rebooking system running..."); }}
            className="bg-blue-action text-navy-deep px-4 py-2 rounded-xl font-extrabold text-xs shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <ArrowRightLeft size={12} /> Rebook Wash
          </button>
        ) : (
          <button className="bg-slate-800 border border-slate-700 hover:bg-slate-700/80 text-slate-200 px-4 py-2 rounded-xl font-extrabold text-xs shadow-md active:scale-[0.98] transition-all flex items-center gap-1.5">
            <FileText size={12} /> View Breakdown
          </button>
        )}
      </div>
    </div>
  );
}

export default HistoryCard; // <-- Fixed style consistency