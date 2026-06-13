import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';

const STATUS_BORDERS = {
  Pending: 'border-l-red-500',
  Assigned: 'border-l-yellow-500',
  'In Progress': 'border-l-blue-500',
  Completed: 'border-l-green-500',
};

const STATUS_BADGES = {
  Pending: 'bg-red-500 bg-opacity-20 text-red-400',
  Assigned: 'bg-yellow-500 bg-opacity-20 text-yellow-400',
  'In Progress': 'bg-blue-500 bg-opacity-20 text-blue-400',
  Completed: 'bg-green-500 bg-opacity-20 text-green-400',
};

function BookingHub({ mockBookings, onSelectBooking }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All', 'Pending', 'Assigned', 'In Progress', 'Completed'];

  const getCount = (status) => {
    if (status === 'All') return mockBookings.length;
    return mockBookings.filter((b) => b.status === status).length;
  };

  return (
    <div className="flex-1 lg:h-full overflow-y-auto p-6 min-h-0 border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Booking Hub</h2>

      {/* Search Input */}
      <label className="input flex items-center gap-2 bg-gray-dark rounded-2xl p-4 text-white border border-border-dark mb-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent outline-none"
        />
      </label>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6 pb-2 border-b border-gray-800">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          const count = getCount(filter);
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-500 text-slate-950 border-blue-500 shadow-md font-semibold'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              <span>{filter}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-slate-950 bg-opacity-20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                {count}
              </span>
              {filter === 'Pending' && count > 0 && (
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {mockBookings
            .filter((b) => activeFilter === 'All' || b.status === activeFilter)
            .filter((b) => {
              const q = searchQuery.toLowerCase();
              return (
                b.name.toLowerCase().includes(q) ||
                b.number.toLowerCase().includes(q) ||
                b.car.toLowerCase().includes(q) ||
                b.address.toLowerCase().includes(q)
              );
            })
            .map((booking) => (
              <div
                key={booking.id}
                onClick={() => onSelectBooking(booking.id)}
                className={`flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-gray-dark border border-border-dark border-l-4 ${STATUS_BORDERS[booking.status] || 'border-l-slate-600'} rounded-xl gap-4 cursor-pointer hover:border-gray-700 active:scale-[0.995] transition-all`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold text-base sm:text-lg">
                      {booking.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-medium ${STATUS_BADGES[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm mt-1">
                    #{booking.number}
                  </p>

                  <div className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                    <Calendar size={16} />
                    <div className="flex flex-col xl:flex-row">
                      <span className="text-sm">{booking.car} ,</span>
                      <span className="text-sm">{booking.time}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                    <MapPin size={16} />
                    {booking.address}
                  </p>

                  {/* Display the Assigned Washer Name if it exists */}
                  {booking.status !== 'Pending' && (
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-slate-950 font-black">
                        W
                      </div>
                      <p className="text-slate-300 text-xs font-medium">
                        Washer:{' '}
                        <span className="text-white font-semibold">
                          {booking.assignedWasher || 'Marcus Kruse'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {mockBookings
            .filter((b) => activeFilter === 'All' || b.status === activeFilter)
            .filter((b) =>
              b.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
            <p className="text-slate-500 text-center py-8">
              No matching bookings found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingHub;
