// src/components/dashboards/user/NoActiveBookingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CalendarPlus } from 'lucide-react';

function NoActiveBookingCard() {
  return (
    <div className="bg-gray-dark border border-border-dark rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center justify-center min-h-[340px] relative overflow-hidden group">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-action/5 rounded-full blur-3xl group-hover:bg-blue-action/10 transition-colors" />
      
      <div className="p-4 bg-slate-800/80 text-blue-action rounded-2xl mb-4 border border-slate-700/50 shadow-inner">
        <Sparkles size={32} />
      </div>

      <h3 className="text-xl font-black tracking-tight text-slate-100">Your Ride is All Set!</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
        Your last professional cleaning is complete and your vehicle is shining. You don't have any upcoming dispatch appointments scheduled right now.
      </p>

      <Link 
        to="/booking"
        className="mt-6 bg-blue-action text-navy-deep px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
      >
        <CalendarPlus size={14} /> Schedule Next Premium Wash
      </Link>
    </div>
  );
}

export default NoActiveBookingCard;