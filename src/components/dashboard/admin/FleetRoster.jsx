import React from 'react';

const ROSTER_STATUS = {
  Available: {
    dot: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]',
    badge: 'bg-green-500 bg-opacity-10 text-green-400',
    label: 'Available',
  },
  Busy: {
    dot: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]',
    badge: 'bg-yellow-500 bg-opacity-10 text-yellow-400',
    label: 'On a Wash',
  },
  Offline: {
    dot: 'bg-red-500',
    badge: 'bg-red-500 bg-opacity-10 text-red-400',
    label: 'Offline',
  },
};

function FleetRoster({ mockWashers }) {
  return (
    <div className="hidden lg:flex w-full h-auto lg:h-full lg:w-80  overflow-y-auto p-6 min-h-0 shrink-0 bg-black bg-opacity-30 flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Fleet Roster</h2>
        {/* <p className="text-slate-400 text-xs mt-1">Real-time active crew status tracking.</p> */}
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {mockWashers.map((washer) => {
          const currentConfig =
            ROSTER_STATUS[washer.status] || ROSTER_STATUS['Offline'];
          return (
            <div
              key={washer.id}
              className="p-4 bg-gray-dark border border-border-dark rounded-xl flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-white font-medium text-sm sm:text-base">
                  {washer.name}
                </h4>
                {/* <p className="text-slate-400 text-xs mt-0.5">Shift: {washer.shift}</p> */}
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${currentConfig.badge}`}
                >
                  {currentConfig.label}
                </span>
                {/* <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Live</span>
                  <span className={`w-2 h-2 rounded-full ${currentConfig.dot}`} />
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FleetRoster;
