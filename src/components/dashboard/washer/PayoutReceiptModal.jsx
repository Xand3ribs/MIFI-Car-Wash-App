import React from 'react';
import { X, ReceiptText, ShieldCheck, Landmark } from 'lucide-react';

export default function PayoutReceiptModal({ payout, onClose }) {
  if (!payout) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-navy-deep border border-slate-800 rounded-3xl w-full max-w-sm shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-sm">
            <ReceiptText size={16} /> Receipt
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <span className="text-[10px] uppercase font-black text-slate-500">
              Net Amount
            </span>
            <div className="text-3xl font-black text-emerald-400">
              ₦{payout.amount.toLocaleString()}
            </div>
          </div>
          <div className="space-y-3 text-xs border-b border-slate-800 pb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Gross Earnings</span>
              <span className="text-white font-medium">
                ₦{payout.gross_amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Platform Fee</span>
              <span className="text-rose-400">
                -₦{payout.fee.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="bg-navy-dark p-3 rounded-xl text-xs">
            <span className="text-slate-500 font-bold block mb-1">
              Destination
            </span>
            <span className="text-white">{payout.bank_details}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
