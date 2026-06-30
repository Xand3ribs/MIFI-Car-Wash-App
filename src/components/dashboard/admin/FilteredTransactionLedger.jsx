import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FilteredTransactionLedger({ 
  transactions, 
  searchQuery, 
  selectedMonth, 
  selectedYear 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  // Filter the data
  const filteredData = transactions.filter((txn) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = String(txn.customer || "").toLowerCase().includes(q) || 
                          String(txn.id || "").toLowerCase().includes(q) || 
                          String(txn.washer || "").toLowerCase().includes(q);

    const matchesMonth = txn.metaMonth === selectedMonth;
    const matchesYear = txn.metaYear === selectedYear;

    return matchesSearch && matchesMonth && matchesYear;
  });

  // Reset to page 1 whenever filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMonth, selectedYear]);

  // Paginate the filtered data
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col gap-4">
      <div className="border-b border-slate-800 pb-4">
        <h4 className="font-bold text-base">Global Transaction History</h4>
        <p className="text-xs text-slate-500">
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} transactions
        </p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Bk ID</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Vehicle</th>
              <th className="py-3 px-2">Assigned Washer</th>
              <th className="py-3 px-2">Timestamp Date</th>
              <th className="py-3 px-2 text-right">Amount</th>
              <th className="py-3 px-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 font-medium text-slate-300">
            {paginatedData.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3.5 px-2 font-mono text-slate-500">#{txn.id}</td>
                <td className="py-3.5 px-2 text-white font-semibold">{txn.customer}</td>
                <td className="py-3.5 px-2">{txn.car}</td>
                <td className="py-3.5 px-2">{txn.washer}</td>
                <td className="py-3.5 px-2 text-slate-400">{txn.date}</td>
                <td className="py-3.5 px-2 text-right text-emerald-400 font-bold">₦{txn.amount.toLocaleString()}</td>
                <td className="py-3.5 px-2 text-center">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <p className="text-slate-500 text-center py-6 italic">No transactions found for this period.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-2">
          <div className="join">
            <button 
              className="join-item btn btn-sm bg-slate-900 border-slate-800"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            <button className="join-item btn btn-sm bg-slate-900 border-slate-800 text-white cursor-default">
              Page {currentPage} of {totalPages}
            </button>
            <button 
              className="join-item btn btn-sm bg-slate-900 border-slate-800"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}