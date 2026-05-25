// src/components/dashboards/user/SupportCard.jsx
import React from 'react';
import { ShieldQuestion } from 'lucide-react';

function SupportCard() {
  return (
    <div className="bg-gradient-to-br from-gray-dark to-slate-900 border border-border-dark rounded-3xl p-5 flex flex-row items-start  gap-4 shadow-xl w-full">

      <div className="p-3 bg-blue-action/10 text-blue-400 rounded-2xl shrink-0">
        <ShieldQuestion size={20} />
      </div>

      <div>
        <h4 className="font-bold text-sm text-slate-200">Need operational support?</h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Have questions about your current service package or custom requirements? Message dispatch immediately.
        </p>
        <button className="text-xs text-blue-400 font-extrabold hover:underline mt-2.5 block">
          Open Support Window ↗
        </button>
      </div>
    </div>
  );
}

export default SupportCard;