// src/components/dashboard/washer/ScheduleSummary.jsx
import React from 'react';
import { Briefcase, CheckCircle2, DollarSign } from 'lucide-react';

function ScheduleSummary({ totalJobs, completedCount, estimatedEarnings }) {
  return (
  
    <div className="grid grid-cols-3 gap-3 w-full mt-3 lg:mt-6">
      
      {/* Total Assigned Cards Metric */}
      <div className="bg-gray-dark border border-border-dark p-3 rounded-2xl flex flex-col items-center text-center">
        <Briefcase className="text-blue-500 mb-1" size={20} />
        <span className="text-xs text-slate-400 font-medium">Assigned</span>
        <span className="text-lg font-bold text-white mt-1">{totalJobs}</span>
      </div>

      {/* Completed Jobs Metric */}
      <div className="bg-gray-dark border border-border-dark p-3 rounded-2xl flex flex-col items-center text-center">
        <CheckCircle2 className="text-green-500 mb-1" size={20} />
        <span className="text-xs text-slate-400 font-medium">Done</span>
        <span className="text-lg font-bold text-white mt-1">{completedCount}</span>
      </div>

      {/* Dynamic Estimated Daily Payout Metric */}
      <div className="bg-gray-dark border border-border-dark p-3 rounded-2xl flex flex-col items-center text-center">
        <span className="text-green-500 mb-1 text-lg size-5">₦</span>
        <span className="text-xs text-slate-400 font-medium">Est. Pay</span>
        <span className="text-lg font-bold text-white mt-0.5">₦{estimatedEarnings}</span>
      </div>

    </div>
  );
}

export default ScheduleSummary;