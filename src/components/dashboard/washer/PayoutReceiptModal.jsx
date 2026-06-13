import React from 'react';
import { X, ReceiptText, ShieldCheck, Landmark } from 'lucide-react';

export default function PayoutReceiptModal({ payout, onClose }) {
  if (!payout) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
      <div className="bg-navy-deep border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-slate-800 flex items-center justify-between bg-navy-dark/50">
          <div className="flex items-center gap-2 text-slate-100 font-black tracking-tight text-sm md:text-base">
            <ReceiptText size={16} className="text-blue-action" />
            <span>Payout Receipt</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 space-y-5 md:space-y-6">
          <div className="text-center py-4 bg-navy-dark/30 border border-slate-800/60 rounded-2xl">
            <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">
              Net Settled Amount
            </span>
            <div className="text-2xl md:text-3xl font-black text-emerald-400 mt-0.5">
              {payout.amount}
            </div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mt-1.5">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Paid via Bank Transfer</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[11px] border-b border-slate-800/50 pb-4">
            <div>
              <span className="text-slate-500 block font-bold uppercase tracking-wide">
                Reference ID
              </span>
              <span className="text-slate-200 font-mono text-xs mt-0.5 block">
                {payout.id}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block font-bold uppercase tracking-wide">
                Payment Date
              </span>
              <span className="text-slate-200 text-xs mt-0.5 block">
                {payout.date}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs md:text-sm border-b border-slate-800/50 pb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Gross Booking Earnings</span>
              <span className="text-slate-200 font-medium">{payout.gross}</span>
            </div>
            <div className="flex justify-between text-[11px] md:text-xs">
              <span className="text-slate-500">Platform Comm. Fee (15%)</span>
              <span className="text-rose-400">-{payout.fee}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-navy-dark/40 p-3.5 rounded-xl text-xs md:text-sm border border-slate-800/40">
            <Landmark size={16} className="text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-500 block font-bold uppercase">
                Destination Account
              </span>
              <span className="text-slate-200 font-medium">{payout.bank}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-navy-dark/50 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-sm w-full sm:w-auto bg-blue-action hover:bg-blue-600 text-navy-deep border-none font-bold rounded-xl px-5"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
