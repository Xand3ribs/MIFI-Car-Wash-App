import React, { useState } from 'react';
import {
  CreditCard,
  Landmark,
  Plus,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function PayoutDetails() {
  const [banks, setBanks] = useState([
    {
      id: 'bnk-1',
      bankName: 'Access Bank',
      accountName: 'Xander Malik',
      accountNumber: '0123456789',
      isPrimary: true,
    },
    {
      id: 'bnk-2',
      bankName: 'OPay Digital',
      accountName: 'Xander Malik',
      accountNumber: '9087654321',
      isPrimary: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const handleSetPrimary = (id) => {
    setBanks(banks.map((bank) => ({ ...bank, isPrimary: bank.id === id })));
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    // Guard clause: Block submission programmatically if they somehow bypass the UI state
    if (banks.length >= 2) return;
    if (!bankName || !accountNumber || !accountName) return;

    const newBank = {
      id: `bnk-${Date.now()}`,
      bankName,
      accountName,
      accountNumber,
      isPrimary: banks.length === 0,
    };

    setBanks([...banks, newBank]);
    setBankName('');
    setAccountNumber('');
    setAccountName('');
    setShowAddForm(false);
  };

  const handleDeleteBank = (id, isPrimary) => {
    if (isPrimary) return;
    setBanks(banks.filter((bank) => bank.id !== id));
  };

  return (
    <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
      <div>
        <h3 className="text-base font-black text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <CreditCard size={18} className="text-blue-action" />
          <span>Bank Payout Hub</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Manage your linked bank settlement details. Your active primary
          profile receives automatic direct weekly revenue distributions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className={`border rounded-2xl p-5 relative flex flex-col justify-between transition-all ${
              bank.isPrimary
                ? 'bg-navy-dark/80 border-blue-action/80 shadow-md shadow-blue-action/5'
                : 'bg-navy-dark/30 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-slate-800/60 rounded-xl text-slate-300">
                  <Landmark size={18} />
                </div>
                {bank.isPrimary ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-blue-action/10 text-blue-action border border-blue-action/20">
                    <CheckCircle2 size={10} /> Primary
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetPrimary(bank.id)}
                    className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-blue-action transition-colors"
                  >
                    Set Active
                  </button>
                )}
              </div>
              <h4 className="text-sm font-black text-slate-200">
                {bank.bankName}
              </h4>
              <p className="font-mono text-sm font-medium text-slate-100 tracking-wide mt-1">
                •••• •••• {bank.accountNumber.slice(-4)}
              </p>
            </div>

            <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-800/60">
              <span className="text-[11px] text-slate-400 truncate max-w-[140px] font-medium">
                {bank.accountName}
              </span>
              {!bank.isPrimary && (
                <button
                  onClick={() => handleDeleteBank(bank.id, bank.isPrimary)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* CONDITIONALLY RENDER ADD BUTTON OR LIMIT METADATA */}
        {banks.length < 2 ? (
          !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="border border-dashed border-slate-800 hover:border-slate-700 bg-transparent rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-slate-200 transition-all group h-full min-h-[140px]"
            >
              <div className="p-2 bg-slate-800/40 group-hover:bg-slate-800 rounded-xl transition-colors">
                <Plus size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">
                Link Bank Account
              </span>
            </button>
          )
        ) : (
          <div className="border border-slate-800/60 bg-navy-deep/20 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-slate-500 h-full min-h-[140px] text-center">
            <AlertCircle size={20} className="text-slate-600" />
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Account Limit Reached
              </span>
              <span className="text-[10px] text-slate-500 max-w-[180px] block mt-0.5 leading-normal">
                You can link a maximum of 2 payout banks. Remove an existing
                account to pair a new one.
              </span>
            </div>
          </div>
        )}
      </div>

      {showAddForm && banks.length < 2 && (
        <form
          onSubmit={handleAddBank}
          className="bg-navy-dark/40 border border-slate-800 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Link Settlement Bank
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-500 hover:text-slate-300 font-bold"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-[11px] font-bold text-slate-400 uppercase">
                  Bank Institution
                </span>
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
                className="select select-sm bg-navy-deep border border-slate-800 rounded-xl text-xs text-slate-200 h-10"
              >
                <option value="" disabled>
                  Select Bank
                </option>
                <option value="Access Bank">Access Bank</option>
                <option value="GTBank">Guaranty Trust Bank (GTB)</option>
                <option value="Zenith Bank">Zenith Bank</option>
                <option value="OPay Digital">OPay</option>
                <option value="Moniepoint">Moniepoint Microfinance</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-[11px] font-bold text-slate-400 uppercase">
                  Account Number
                </span>
              </label>
              <input
                type="text"
                maxLength="10"
                pattern="\d{10}"
                placeholder="0123456789"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value.replace(/\D/g, ''))
                }
                required
                className="input input-sm bg-navy-deep border border-slate-800 rounded-xl text-xs text-slate-100 h-10 font-mono"
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-[11px] font-bold text-slate-400 uppercase">
                Account Holder Name
              </span>
            </label>
            <input
              type="text"
              placeholder="As registered with bank"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
              className="input input-sm bg-navy-deep border border-slate-800 rounded-xl text-xs text-slate-100 h-10"
            />
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="btn btn-sm bg-blue-action border-none text-navy-deep font-black uppercase rounded-xl px-6 h-10 min-h-0 text-xs"
            >
              Verify & Save Profile
            </button>
          </div>
        </form>
      )}

      <div className="flex items-start gap-3 bg-blue-action/5 border border-blue-action/10 p-4 rounded-xl text-xs">
        <ShieldCheck size={16} className="text-blue-action mt-0.5 shrink-0" />
        <div className="text-slate-400 leading-relaxed">
          <span className="font-bold text-slate-300 block mb-0.5">
            Secure Transaction Processing
          </span>
          Bank credentials are directly validated against central verification
          clearing networks.
        </div>
      </div>
    </div>
  );
}
