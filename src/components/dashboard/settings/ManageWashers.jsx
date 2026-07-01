// src/components/dashboard/settings/ManageWashers.jsx
import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../supabaseClient';
import WasherTableRoster from '../admin/WasherTableRoster';
import WasherOnboardModal from '../admin/WasherOnboardModal';

export default function ManageWashers() {
  // 🟢 Starts as empty array so we load live database content instead of static values
  const [crewList, setCrewList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // 🟢 Read live washers from your Supabase washer_profiles table on component refresh
  useEffect(() => {
    async function loadWashers() {
      try {
        const { data, error } = await supabase
          .from('washer_profiles') // 👈 Swapped target table name
          .select('*'); // 👈 No longer need .eq('role') filter since this table contains ONLY washers

        if (error) throw error;

        if (data) {
          // Map new database table columns back to your table roster properties
          const formattedCrew = data.map((profile) => ({
            id: profile.id,
            // Merges first_name and last_name back into your layout visual string
            name:
              profile.first_name || profile.last_name
                ? `${profile.first_name} ${profile.last_name}`.trim()
                : 'Unnamed Operator',
            phone: profile.phone || 'No Phone',
            address: profile.address || 'No Address', // Ensure this column matches your table layout setup
          }));
          setCrewList(formattedCrew);
        }
      } catch (err) {
        console.error('Error fetching live washer registry logs:', err.message);
      }
    }

    loadWashers();
  }, []);

  const handleToggleDuty = (id) => {
    setCrewList((prev) =>
      prev.map((washer) =>
        washer.id === id ? { ...washer, isOnDuty: !washer.isOnDuty } : washer
      )
    );
  };

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    const cleanName = formData.name.trim().toLowerCase().replace(/\s+/g, '.');
    const generatedEmail = `${cleanName}@mifaiwash.com`;
    const generatedPassword = `WashCrew@${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const supabaseAdminAuth = createClient(
        supabase.supabaseUrl,
        supabase.supabaseKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );

      const { data: authData, error: signUpError } =
        await supabaseAdminAuth.auth.signUp({
          email: generatedEmail,
          password: generatedPassword,
          options: {
            data: {
              full_name: formData.name,
              phone: formData.phone,
              address: formData.address, // Sent safely into user metadata payload
              role: 'washer',
            },
          },
        });

      if (signUpError) throw signUpError;

      // Append your freshly minted credentials cleanly to the screen array
      const newWasher = {
        id: authData.user?.id || `WSH-00${crewList.length + 1}`,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      setCrewList((prev) => [...prev, newWasher]);

      alert(
        `🎉 Washer Registered Successfully!\n\n` +
          `Provide these credentials to the crew member:\n` +
          `📧 Email: ${generatedEmail}\n` +
          `🔑 Password: ${generatedPassword}`
      );

      setFormData({ name: '', phone: '', address: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error onboarding crew member:', error);
      alert(`Registration Failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            Washer Crew Roster
          </h3>
          <p className="text-xs text-slate-500">
            Manage team operational metrics, duty logs, and account creation
            access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all self-start sm:self-auto shadow-lg shadow-blue-500/10"
        >
          <UserPlus size={15} />
          Register Crew
        </button>
      </div>

      {/* Rendered Sub-Component Table */}
      <WasherTableRoster crewList={crewList} onToggleDuty={handleToggleDuty} />

      {/* Rendered Sub-Component Overlay Form Modal */}
      {isModalOpen && (
        <WasherOnboardModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleOnboardSubmit}
        />
      )}
    </div>
  );
}
