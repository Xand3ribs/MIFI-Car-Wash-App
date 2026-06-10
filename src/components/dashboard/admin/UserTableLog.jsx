import React from 'react';
import UserActionsDropdown from './UserActionsDropdown';

export default function UserTableLog({ users, onToggleStatus }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
            <th className="py-3 px-2 w-1/2">Customer Details</th>
            <th className="py-3 px-2">Subscription Tier</th>
            <th className="py-3 px-2 text-center">Account Status</th>
            <th className="py-3 px-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40 font-medium text-slate-300">
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-8 text-center text-slate-600 font-bold tracking-wide uppercase">
                No matching customer files discovered
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-900/30 transition-colors group">
                
                {/* Identity Cluster Stack */}
                <td className="py-4 px-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white font-bold text-sm">{user.name}</span>
                    <span className="text-slate-500 font-mono tracking-tight text-[11px]">
                      {user.id} &bull; {user.email} &bull; {user.phone}
                    </span>
                  </div>
                </td>

                {/* Styled Plan Badges */}
                <td className="py-4 px-2 vertical-middle">
                  {user.tier === 'Premium' ? (
                    <span className="inline-flex items-center bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md font-black text-[10px] uppercase border border-blue-500/20 tracking-wider">
                      ★ Premium Plan
                    </span>
                  ) : user.tier === 'Pay-As-You-Go' ? (
                    <span className="inline-flex items-center bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border border-slate-700/60 tracking-wider">
                      Pay-As-You-Go
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-amber-500/10 text-amber-500/80 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border border-amber-500/10 tracking-wider">
                      None (Expired)
                    </span>
                  )}
                </td>

                {/* Account Security Flags */}
                <td className="py-4 px-2 text-center vertical-middle">
                  {user.status === 'Active' ? (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border border-rose-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                      Suspended
                    </div>
                  )}
                </td>

                {/* Dropdown Action Wrapper */}
                <td className="py-4 px-2 text-right vertical-middle">
                  <UserActionsDropdown user={user} onToggleStatus={onToggleStatus} />
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}