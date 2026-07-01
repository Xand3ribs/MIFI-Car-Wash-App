import React from 'react';

export default function UserTableLog({ users }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
            <th className="py-3 px-2">Customer Name</th>
            <th className="py-3 px-2">Contact Details</th>
            <th className="py-3 px-2">Address</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/40 font-medium text-slate-300">
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="py-8 text-center text-slate-600 font-bold tracking-wide uppercase"
              >
                No matching customer files discovered
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-900/30 transition-colors group"
              >
                <td className="py-4 px-2 text-white font-bold text-sm">
                  {user.first_name} {user.last_name}
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {user.id}
                  </div>
                </td>

                <td className="py-4 px-2">
                  <div className="flex flex-col gap-0.5">
                    <span>{user.email}</span>
                    <span className="text-slate-500">{user.phone}</span>
                  </div>
                </td>

                <td className="py-4 px-2 text-slate-400 max-w-[200px] truncate">
                  {user.address}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
