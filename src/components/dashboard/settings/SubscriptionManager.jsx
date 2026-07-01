import React from 'react';
import { CreditCard, Sparkles } from 'lucide-react';

export default function SubscriptionManager() {
  return (
    <div className="text-slate-200 flex flex-col gap-4">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
        Feature coming soon
      </span>

      {/* Plan Status Banner */}
      {/* <div className="bg-navy-deep border border-slate-800/60 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-action/10 text-blue-action rounded-xl">
            <CreditCard size={24} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Active Account Plan
            </span>
            <h4 className="text-lg font-black text-slate-100 flex items-center gap-1.5">
              MiFai Standard Tier{' '}
              <Sparkles size={14} className="text-blue-action" />
            </h4>
          </div>
        </div>
        <div className="text-left md:text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Next Renewal Token
          </span>
          <p className="text-sm font-bold text-slate-300">June 28, 2026</p>
        </div>
      </div> */}

      {/* Subscription Action Utilities */}
      {/* <div className="flex items-center gap-3 mt-2">
        <button className="bg-blue-action text-navy-deep px-5 py-2.5 rounded-xl font-black text-xs shadow-md hover:brightness-110 transition-all">
          Change Subscription
        </button>
        <button className="border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900/50 px-5 py-2.5 rounded-xl font-black text-xs transition-all">
          Cancel Plan
        </button>
      </div> */}
    </div>
  );
}
