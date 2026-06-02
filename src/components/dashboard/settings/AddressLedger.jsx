import React, { useState } from 'react';
import { Home, Briefcase, Save } from 'lucide-react';

export default function AddressLedger() {
  const [addresses, setAddresses] = useState({ home: '', work: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddresses(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Logistics dispatch ledger saved.');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-slate-200">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
          <Home size={12} className="text-blue-action" /> Home Dispatch Station
        </label>
        <input 
          type="text"
          name="home"
          value={addresses.home}
          onChange={handleChange}
          className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-action transition-colors"
          placeholder="Enter residential street address..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
          <Briefcase size={12} className="text-blue-action" /> Office / Corporate Hub
        </label>
        <input 
          type="text"
          name="work"
          value={addresses.work}
          onChange={handleChange}
          className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 px-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-action transition-colors"
          placeholder="Enter workplace compound description..."
        />
      </div>

      <button type="submit" className="mt-2 self-start bg-blue-action text-navy-deep px-6 py-3 rounded-xl font-black text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
        <Save size={14} /> Update Dispatch Ledger
      </button>
    </form>
  );
}