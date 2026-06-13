// src/components/dashboard/settings/ManageWashers.jsx
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import WasherTableRoster from '../admin/WasherTableRoster';
import WasherOnboardModal from '../admin/WasherOnboardModal';

const INITIAL_WASHER_CREW = [
  {
    id: 'WSH-001',
    name: 'Alex Rivera',
    phone: '+234 801 234 5678',
    location: 'Surulere, Lagos',
    washes: 14,
    earnings: 45000,
    isOnDuty: true,
  },
  {
    id: 'WSH-002',
    name: 'Marcus Kruse',
    phone: '+234 809 876 5432',
    location: 'Yaba, Lagos',
    washes: 8,
    earnings: 22500,
    isOnDuty: false,
  },
];

export default function ManageWashers() {
  const [crewList, setCrewList] = useState(INITIAL_WASHER_CREW);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
  });

  const handleToggleDuty = (id) => {
    setCrewList((prev) =>
      prev.map((washer) =>
        washer.id === id ? { ...washer, isOnDuty: !washer.isOnDuty } : washer
      )
    );
  };

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location) return;

    const newWasher = {
      id: `WSH-00${crewList.length + 1}`,
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      washes: 0,
      earnings: 0,
      isOnDuty: true,
    };

    setCrewList((prev) => [...prev, newWasher]);
    setFormData({ name: '', phone: '', location: '' });
    setIsModalOpen(false);
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
