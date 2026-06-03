import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Save } from 'lucide-react';

function ProfileView({ user }) {
  // Local state initialized with fallback data
  const [formData, setFormData] = useState({
    name: user?.name || 'Destiny Onyebuchi Okoye',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Profile save sequence triggered...');
  };

  return (
    <div className="p-6 bg-navy-dark min-h-screen text-white">
      {/* SECTION HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-100">Account Command Hub</h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage your security settings, identity profile credentials, and role-specific platform configurations.
        </p>
      </div>

      {/* RESPONSIVE TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* COLUMN 1 & 2: PRIMARY ACCOUNT DATA (Takes up 2/3 space on desktop) */}
        <div className="lg:col-span-2 bg-gray-dark border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6">
            <User className="text-blue-action" size={20} />
            <h3 className="text-lg font-black text-slate-100">Personal Security Credentials</h3>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            {/* Input Name Block */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Account Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-slate-500" size={16} />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-action transition-colors"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Grid Row for Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Email Block */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-slate-500" size={16} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-action transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              {/* Input Phone Block */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile Phone Line</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 text-slate-500" size={16} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-navy-deep border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-action transition-colors"
                    placeholder="+234..."
                  />
                </div>
              </div>
            </div>

            {/* Action Save Button */}
            <button 
              type="submit"
              className="mt-2 self-start bg-blue-action text-navy-deep px-6 py-3 rounded-xl font-black text-xs shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Save size={14} /> Save Profile Changes
            </button>
          </form>
        </div>

        {/* COLUMN 3: ROLE DEPENDENT HUB (Takes up 1/3 space) */}
        <div className="flex flex-col gap-6">
          {/* Status Platform Badge */}
          <div className="bg-gray-dark border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
            <div className="p-4 bg-blue-action/10 rounded-2xl text-blue-action mb-3">
              <Shield size={32} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Clearance Level</span>
            <h4 className="text-xl font-black text-slate-200 mt-1 uppercase tracking-tight">
              {user?.role || 'User'}
            </h4>
            <div className="h-px bg-slate-800 w-full my-4" />
            <p className="text-xs text-slate-400 leading-normal">
              Account verification status is live. This authorization tier dictates dashboard console actions.
            </p>
          </div>

          {/* Dynamic Component Target Zone */}
          <div className="bg-navy-deep/40 border border-slate-800/60 border-dashed rounded-3xl p-6 text-center text-slate-500 text-xs">
            {user?.role === 'washer' ? (
              <p>Washer verification credentials and payout stats will mount here.</p>
            ) : (
              <p>Digital Garage & Fleet manager extensions will mount here.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileView;