import React, { useState } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';

export default function ProfileForm({ user }) {
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Destiny Onyebuchi Okoye',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Identity profiles updated successfully.');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-slate-200">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Account Name</label>
        <div className="relative flex items-center">
          <User className="absolute left-4 text-slate-500" size={16} />
          <input 
            type="text" 
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-action transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-slate-500" size={16} />
            <input 
              type="email" 
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-action transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile Phone Line</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-4 text-slate-500" size={16} />
            <input 
              type="tel" 
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-action transition-colors"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="mt-2 self-start bg-blue-action text-navy-deep px-6 py-3 rounded-xl font-black text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
        <Save size={14} /> Save Profile Changes
      </button>
    </form>
  );
}