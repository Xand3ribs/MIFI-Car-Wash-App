import React from 'react';
import { MoreVertical, ShieldAlert, ShieldCheck, History } from 'lucide-react';

export default function UserActionsDropdown({ user, onToggleStatus }) {
  return (
    <div className="dropdown dropdown-left dropdown-end inline-block">
      {/* Dropdown Trigger */}
      <button
        type="button"
        tabIndex={0}
        aria-label="Open user actions"
        className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors focus:outline-none"
      >
        <MoreVertical size={16} />
      </button>

      {/* Menu Overlay Container */}
      <ul
        tabIndex={0}
        className="dropdown-content menu p-1.5 shadow-2xl bg-slate-900 border border-slate-800 rounded-xl w-48 text-left text-xs z-30 space-y-0.5"
      >
        <li>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg active:bg-blue-600"
          >
            <History size={13} className="text-slate-500" />
            Booking History
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              onToggleStatus(user.id);
              document.activeElement.blur(); // Dismiss dropdown element cleanly
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold ${
              user.status === 'Active'
                ? 'text-rose-400 hover:bg-rose-500/10'
                : 'text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            {user.status === 'Active' ? (
              <>
                <ShieldAlert size={13} />
                Suspend Account
              </>
            ) : (
              <>
                <ShieldCheck size={13} />
                Reinstate Account
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
}
