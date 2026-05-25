// src/components/dashboard/washer/JobReportForm.jsx
import React, { useState } from 'react';
import { ShieldAlert, Image as ImageIcon } from 'lucide-react';

export default function JobReportForm({ onSubmit }) {
  const [issues, setIssues] = useState({
    heavyDirt: false,
    scratches: false,
    stubbornStains: false,
    damagesNoted: false
  });
  const [washerNotes, setWasherNotes] = useState("");

  const handleCheckboxChange = (field) => {
    setIssues(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="bg-gray-dark border border-amber-500/30 rounded-2xl p-5 flex flex-col gap-4 animate-slideDown mt-2">
      <div>
        <h3 className="text-base font-bold text-amber-400 flex items-center gap-1.5">
          <ShieldAlert size={18} /> Post-Wash Field Report
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">Document any workspace flags or pre-existing conditions.</p>
      </div>

      {/* Grid Checkbox Options */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {[
          { id: 'heavyDirt', label: 'Heavy Mud/Dirt' },
          { id: 'scratches', label: 'Pre-existing Scratches' },
          { id: 'stubbornStains', label: 'Stubborn Stains' },
          { id: 'damagesNoted', label: 'Prior Damages' }
        ].map(item => (
          <label key={item.id} className="flex items-center gap-2 p-2.5 bg-slate-900 bg-opacity-50 border border-slate-800 rounded-xl cursor-pointer">
            <input 
              type="checkbox" 
              checked={issues[item.id]} 
              onChange={() => handleCheckboxChange(item.id)}
              className="checkbox checkbox-primary checkbox-sm rounded-md" 
            />
            <span className="text-xs text-slate-300">{item.label}</span>
          </label>
        ))}
      </div>

      {/* Proof of Work Media Section */}
      <div>
        <span className="text-xs font-bold uppercase text-slate-500 block mb-1.5">Proof of Work (Images)</span>
        <div className="border border-dashed border-slate-700 bg-slate-900/30 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-900/50 transition-colors">
          <ImageIcon size={20} className="text-blue-400" />
          <span className="text-xs text-slate-300 font-semibold">Upload Images</span>
          <span className="text-[10px] text-slate-500">Before & After conditions</span>
        </div>
      </div>

      {/* Field Notes Area */}
      <div>
        <span className="text-xs font-bold uppercase text-slate-500 block mb-1.5">Operational Notes</span>
        <textarea 
          rows="3"
          value={washerNotes}
          onChange={(e) => setWasherNotes(e.target.value)}
          placeholder="Add notes about paint condition, customer sign-off, or delays..."
          className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-600 resize-none"
        />
      </div>

      <button
        onClick={() => onSubmit({ issues, washerNotes })}
        className="w-full bg-blue-500 hover:bg-blue-600 text-slate-950 font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-colors mt-2"
      >
        Submit Report & Close Job
      </button>
    </div>
  );
}