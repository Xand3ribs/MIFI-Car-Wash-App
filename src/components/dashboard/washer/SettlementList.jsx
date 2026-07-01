import React from 'react';
import { Calendar, Inbox } from 'lucide-react';

export default function SettlementList({ payouts, onPayoutClick }) {
  if (payouts.length === 0) {
    return (
      <div className="text-center py-12">
        <Inbox className="mx-auto h-12 w-12 text-slate-700 mb-3" />
        <p className="text-slate-500 font-medium">
          No settlements match your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE LIST LAYOUT */}
      <div className="block md:hidden space-y-3">
        {payouts.map((payout) => (
          <div
            key={payout.id}
            onClick={() => onPayoutClick(payout)}
            className="bg-navy-dark/40 border border-slate-800/60 p-4 rounded-xl cursor-pointer"
          >
            <div className="flex justify-between mb-2">
              <span className="font-mono text-xs font-bold text-blue-action">
                #{payout.id}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Completed
              </span>
            </div>
            <div className="text-sm font-bold text-white mb-1">
              {payout.customer_name}
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{payout.date}</span>
              <span className="font-black text-white">
                ₦{payout.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE LAYOUT */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-black uppercase text-slate-400">
              <th className="pb-3">Reference</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
            {payouts.map((payout) => (
              <tr
                key={payout.id}
                onClick={() => onPayoutClick(payout)}
                className="hover:bg-slate-800/40 cursor-pointer"
              >
                <td className="py-4 font-mono text-blue-action">
                  #{payout.id}
                </td>

                <td className="py-4 flex items-center gap-2">
                  {' '}
                  {payout.customer_name}
                </td>

                <td className="py-4">{payout.date}</td>

                <td className="py-4 font-black">
                  ₦{payout.amount.toLocaleString()}
                </td>

                <td className="py-4 text-right">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
