import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, Home } from 'lucide-react';
import { supabase } from '../../../supabaseClient';
import { useAuth } from '../../../context/AuthContext';

export default function ProfileForm() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [fetchingData, setFetchingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    async function fetchFreshProfileData() {
      if (!user?.id || !user?.role) return;

      setFetchingData(true);
      
      const targetTable =
        user.role === 'admin'
          ? 'admin_profiles'
          : user.role === 'washer'
            ? 'washer_profiles'
            : 'customer_profiles';

      try {
        const selectColumns = user.role === 'admin' 
          ? 'first_name, last_name, phone' 
          : 'first_name, last_name, phone, address';

        const { data, error } = await supabase
          .from(targetTable)
          .select(selectColumns)
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfileData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: user.email || '', 
            phone: data.phone || '',
            address: data.address || '', 
          });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setStatusMessage({
          type: 'error',
          text: 'Could not load your profile records from the server.',
        });
      } finally {
        setFetchingData(false);
      }
    }

    fetchFreshProfileData();
    // 👇 FIXED: Track the primitive strings, not the whole unstable object
  }, [user?.id, user?.role]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    const targetTable =
      user.role === 'admin'
        ? 'admin_profiles'
        : user.role === 'washer'
          ? 'washer_profiles'
          : 'customer_profiles';

    try {
      if (profileData.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: profileData.email,
        });
        if (authError) throw authError;
      }

      const updatePayload = {
        phone: profileData.phone,
      };

      if (targetTable === 'washer_profiles' || targetTable === 'customer_profiles') {
        updatePayload.address = profileData.address;
      }

      const { error: profileError } = await supabase
        .from(targetTable)
        .update(updatePayload)
        .eq('id', user.id);

      if (profileError) throw profileError;

      setStatusMessage({
        type: 'success',
        text: 'Profile modifications saved successfully.',
      });
    } catch (err) {
      console.error('Update error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'An error occurred while saving modifications.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2 text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold tracking-wider uppercase">
          Loading Profile Data...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 text-slate-200 w-full"
    >
      {statusMessage.text && (
        <div
          className={`p-4 rounded-2xl text-sm border font-medium ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FIRST NAME FIELD (LOCKED) */}
        <div className="flex flex-col gap-1.5 opacity-60">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            First Name (Locked)
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-4 text-slate-600" size={16} />
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              disabled
              className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-400 cursor-not-allowed select-none focus:outline-none"
            />
          </div>
        </div>

        {/* LAST NAME FIELD (LOCKED) */}
        <div className="flex flex-col gap-1.5 opacity-60">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Last Name (Locked)
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-4 text-slate-600" size={16} />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              disabled
              className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-400 cursor-not-allowed select-none focus:outline-none"
            />
          </div>
        </div>

        {/* EMAIL FIELD (EDITABLE) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-slate-500" size={16} />
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* PHONE NUMBER FIELD (EDITABLE) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Mobile Phone Line
          </label>
          <div className="relative flex items-center">
            <Phone className="absolute left-4 text-slate-500" size={16} />
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* DISPATCH ADDRESS FIELD (EDITABLE & OPTIONAL) */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Primary Service Delivery Address
          </label>
          <div className="relative flex items-center">
            <Home className="absolute left-4 text-slate-500" size={16} />
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 self-start bg-blue-500 text-slate-950 px-6 py-3 rounded-xl font-black text-xs shadow-lg hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
      >
        <Save size={14} />
        {loading ? 'Saving Changes...' : 'Save Profile Changes'}
      </button>
    </form>
  );
}