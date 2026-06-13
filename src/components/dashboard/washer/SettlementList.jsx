import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

export default function SettlementList({ payouts, onPayoutClick }) {
  return (
    <>
      {/* MOBILE LIST LAYOUT */}
      <div className="block md:hidden space-y-3">
        {payouts.length > 0 ? (
          payouts.map((payout) => (
            <div
              key={payout.id}
              onClick={() => onPayoutClick(payout)}
              className="bg-navy-dark/40 border border-slate-800/60 p-4 rounded-xl space-y-3 active:bg-slate-800/30 tap-highlight-transparent cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-blue-action">
                  {payout.id}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400">
                  {payout.status}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={12} />
                  <span>{payout.date}</span>
                </div>
                <div className="text-base font-black text-slate-100">
                  {payout.amount}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-[10px] text-slate-500 uppercase tracking-widest font-black">
            No matching payouts
          </div>
        )}
      </div>

      {/* DESKTOP TABLE LAYOUT */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-black uppercase tracking-wider text-slate-400">
              <th className="pb-3">Reference ID</th>
              <th className="pb-3">Processing Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
            {payouts.length > 0 ? (
              payouts.map((payout) => (
                <tr
                  key={payout.id}
                  onClick={() => onPayoutClick(payout)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-4 font-mono font-medium text-blue-action group-hover:underline">
                    {payout.id}
                  </td>
                  <td className="py-4 flex items-center gap-2">
                    <Calendar size={14} className="text-slate-500" />
                    {payout.date}
                  </td>
                  <td className="py-4 font-black text-slate-100">
                    {payout.amount}
                  </td>
                  <td className="py-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400">
                      <ArrowUpRight size={12} />
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center text-xs text-slate-500 uppercase tracking-widest font-black"
                >
                  No matching payouts detected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
