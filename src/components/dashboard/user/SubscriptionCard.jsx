// src/components/dashboards/user/SubscriptionCard.jsx
import React from 'react';
import { ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function SubscriptionCard() {
  // Mock subscription context variables
  const hasSubscription = true; 
  const planName = "MiFai Club Elite";
  const washesUsed = 2;
  const totalWashes = 4;
  
  // Calculate exact completion percentage string for our visual inline progress gauge bar
  const usagePercentage = `${(washesUsed / totalWashes) * 100}%`;

  if (!hasSubscription) {
    return (
      <div className="flex-1 bg-gradient-to-br from-gray-dark to-slate-900 border border-blue-action/20 rounded-3xl p-5 shadow-xl relative overflow-hidden">

        <div className="absolute top-0 right-0 bg-blue-action text-navy-deep text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
          Save 25%
        </div>

        <h4 className="font-black text-sm text-slate-100 flex items-center gap-1.5">
          <Zap size={15} className="text-blue-action" /> Join MiFai Wash Club
        </h4>

        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Get automatic recurring care for your vehicle. Save money with 4 scheduled details per month.
        </p>
        <button className="w-full bg-blue-action text-navy-deep text-xs font-black py-2.5 rounded-xl mt-4 hover:brightness-110 transition-all">
          Explore Plans
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-dark border border-border-dark rounded-3xl p-5 shadow-xl flex flex-col gap-4">
      {/* Plan Tier Banner Badge */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-action/10 text-blue-action rounded-lg">
            <ShieldCheck size={16} />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Active Membership</h4>
            <p className="font-black text-sm text-slate-100 mt-0.5">{planName}</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">
          Active
        </span>
      </div>

      {/* Credit Metric Meter Breakdown */}
      <div>
        <div className="flex justify-between items-end text-xs font-bold mb-1.5">
          <span className="text-slate-400">Monthly Wash Credits</span>
          <span className="text-slate-200">{totalWashes - washesUsed} of {totalWashes} left</span>
        </div>
        {/* Progress Gauge track styling wrapper */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
          <div 
            className="h-full bg-gradient-to-r from-blue-action to-cyan-400 transition-all duration-500" 
            style={{ width: usagePercentage }}
          />
        </div>
      </div>

      {/* Mini Feature Perks Summary Block */}
      <div className="bg-navy-deep/30 rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400 flex flex-col gap-1.5">
        <p className="flex items-center gap-1.5">
          <span className="text-blue-action">✓</span> Priority weekend scheduling slot locks
        </p>
        <p className="flex items-center gap-1.5">
          <span className="text-blue-action">✓</span> Free interior scent bomb add-ons
        </p>
      </div>

      {/* Manage Action Navigation Anchors */}
      <Link to="/account/settings/subscription" className="text-center text-xs text-blue-action font-bold hover:underline py-1 mt-1 block">
        Manage Subscription Billing ➔
      </Link>
    </div>
  );
}

export default SubscriptionCard;