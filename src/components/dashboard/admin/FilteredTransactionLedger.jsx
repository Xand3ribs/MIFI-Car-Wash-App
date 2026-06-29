import React from 'react';

export default function FilteredTransactionLedger({ 
  transactions, 
  searchQuery, 
  selectedMonth, 
  selectedYear 
}) {
  
  const filteredData = transactions.filter((txn) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = String(txn.customer || "").toLowerCase().includes(q) || 
                          String(txn.id || "").toLowerCase().includes(q) || 
                          String(txn.washer || "").toLowerCase().includes(q);

    const matchesMonth = txn.metaMonth === selectedMonth;
    const matchesYear = txn.metaYear === selectedYear;

    return matchesSearch && matchesMonth && matchesYear;
  });

  return (
    <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col gap-4">
      <div className="border-b border-slate-800 pb-4">
        <h4 className="font-bold text-base">Global Transaction History</h4>
        <p className="text-xs text-slate-500">
          Showing data for {selectedMonth} {selectedYear}
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
            {filteredData.map((txn) => (
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
        {filteredData.length === 0 && <p className="text-slate-500 text-center py-6 italic">No transactions found for this period.</p>}
      </div>
    </div>
  );
}