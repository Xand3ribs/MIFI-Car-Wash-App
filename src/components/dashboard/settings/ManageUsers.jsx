import React, { useState } from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import UserTableLog from '../admin/UserTableLog';

// Mock database registry simulating active Lagos client footprint
const INITIAL_CUSTOMERS = [
  {
    id: 'USR-892',
    name: 'Chioma Adebayo',
    email: 'chioma@adebayo.co',
    phone: '+234 802 111 2222',
    tier: 'Premium',
    status: 'Active',
  },
  {
    id: 'USR-415',
    name: 'Tunde Bakare',
    email: 'tbakare@outlook.com',
    phone: '+234 815 333 4444',
    tier: 'Pay-As-You-Go',
    status: 'Active',
  },
  {
    id: 'USR-612',
    name: 'Funmi Olowu',
    email: 'funmi.olowu@gmail.com',
    phone: '+234 809 555 6666',
    tier: 'None',
    status: 'Suspended',
  },
];

export default function ManageUsers() {
  const [userList, setUserList] = useState(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');

  // Track our selected filter configuration
  const [activeFilter, setActiveFilter] = useState('All Users');

  // Handle Account Suspension / Re-activation toggles
  const handleToggleStatus = (id) => {
    setUserList((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const nextStatus = user.status === 'Active' ? 'Suspended' : 'Active';
          return { ...user, status: nextStatus };
        }
        return user;
      })
    );
  };

  // Filter List Config Array for mapping the dropdown options
  const filterOptions = [
    { label: 'All Users', value: 'All Users' },
    { label: 'Premium Plan', value: 'Premium' },
    { label: 'Pay-As-You-Go', value: 'Pay-As-You-Go' },
    { label: 'None (Expired)', value: 'None' },
    { label: 'Suspended Accounts', value: 'Suspended' },
  ];

  // Filter & Search Evaluation Pipeline
  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    if (activeFilter === 'All Users') return matchesSearch;
    if (activeFilter === 'Suspended')
      return matchesSearch && user.status === 'Suspended';

    // Otherwise check against the specific subscription tier strings
    return matchesSearch && user.tier === activeFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-100">
          Customer Registry Log
        </h3>
        <p className="text-xs text-slate-500">
          Audit user base profiles, active subscription configurations, and tier
          credentials.
        </p>
      </div>

      {/* Control Strip: Search Bar and New Dropdown Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar Input Container */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
          />
          <input
            type="text"
            placeholder="Search customer name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* * * NEW: DaisyUI Pure CSS Filter Dropdown * * */}
        <div className="dropdown dropdown-end sm:dropdown-left">
          <button
            type="button"
            tabIndex={0}
            className="w-full sm:w-auto flex items-center justify-between gap-4 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <Filter size={13} className="text-blue-400" />
              Filter: <span className="text-white">{activeFilter}</span>
            </span>
            <ChevronDown size={14} className="text-slate-500" />
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-1.5 shadow-2xl bg-slate-900 border border-slate-800 rounded-xl w-52 mt-1 sm:mt-0 z-30 text-left text-xs space-y-0.5"
          >
            <div className="px-2.5 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-800/60 mb-1">
              Select Registry View
            </div>
            {filterOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter(option.value);
                    document.activeElement.blur(); // Dismiss dropdown after selection
                  }}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === option.value
                      ? 'bg-blue-500/10 text-blue-400 font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Structured Presentational Log Table */}
      <UserTableLog users={filteredUsers} onToggleStatus={handleToggleStatus} />
    </div>
  );
}
