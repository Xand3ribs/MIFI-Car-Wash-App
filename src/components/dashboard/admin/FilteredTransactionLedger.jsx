import React, { useState } from 'react';
import { Search } from 'lucide-react';

/* * * NEW COMPONENT * *
 * Tracks section 3: Global Transaction Audit Ledger.
 * Provides micro searches alongside isolated month and year filter parameters.
 */
export default function FilteredTransactionLedger({ 
  transactions, 
  months, 
  years, 
  selectedMonth, 
  selectedYear, 
  onMonthChange, 
  onYearChange 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col gap-4">
      
      {/* Header with Triple Filtering Actions */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h4 className="font-bold text-base">Global Transaction History</h4>
          <p className="text-xs text-slate-500">Universal incoming revenue stream logs</p>
        </div>

        {/* Filters Group Grid */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Text Search input */}
          <div className="relative max-w-xs w-full min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer, txn..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl outline-none text-white focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Standalone Month dropdown selector */}
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold px-3 py-2 rounded-xl outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Months</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          {/* Standalone Year dropdown selector */}
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold px-3 py-2 rounded-xl outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Ledger Output Data Table Area */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Txn ID</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Vehicle</th>
              <th className="py-3 px-2">Assigned Washer</th>
              <th className="py-3 px-2">Timestamp Date</th>
              <th className="py-3 px-2 text-right">Amount</th>
              <th className="py-3 px-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 font-medium text-slate-300">
            {transactions
              .filter(txn => {
                const query = searchQuery.toLowerCase();
                const matchesSearch = 
                  txn.customer.toLowerCase().includes(query) ||
                  txn.id.toLowerCase().includes(query) ||
                  txn.washer.toLowerCase().includes(query);
                
                const matchesMonth = selectedMonth === 'All' || txn.metaMonth === selectedMonth;
                const matchesYear = selectedYear === 'All' || txn.metaYear === selectedYear;

                return matchesSearch && matchesMonth && matchesYear;
              })
              .map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-2 font-mono text-slate-500">#{txn.id}</td>
                  <td className="py-3.5 px-2 text-white font-semibold">{txn.customer}</td>
                  <td className="py-3.5 px-2">{txn.car}</td>
                  <td className="py-3.5 px-2">
                    <span className="inline-flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      {txn.washer}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-slate-400">{txn.date}</td>
                  <td className="py-3.5 px-2 text-right text-emerald-400 font-bold">
                    ₦{txn.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      txn.status === 'Completed' 
                        ? 'bg-emerald-500 bg-opacity-10 text-emerald-400' 
                        : 'bg-yellow-500 bg-opacity-10 text-yellow-400'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {/* Table Fallback */}
        {transactions.filter(txn => {
          const query = searchQuery.toLowerCase();
          const matchesSearch = txn.customer.toLowerCase().includes(query) || txn.id.toLowerCase().includes(query) || txn.washer.toLowerCase().includes(query);
          const matchesMonth = selectedMonth === 'All' || txn.metaMonth === selectedMonth;
          const matchesYear = selectedYear === 'All' || txn.metaYear === selectedYear;
          return matchesSearch && matchesMonth && matchesYear;
        }).length === 0 && (
          <p className="text-slate-500 text-center py-6 italic">No transactions found matching the selected parameters.</p>
        )}
      </div>

    </div>
  );
}