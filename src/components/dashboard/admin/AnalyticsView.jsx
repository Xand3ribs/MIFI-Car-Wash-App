import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import MonthlyMetrics from './MonthlyMetrics';
import FilteredTransactionLedger from './FilteredTransactionLedger';

const AVAILABLE_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const AVAILABLE_YEARS = ['2025', '2026'];

export default function AnalyticsView() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Added Search State

  const now = new Date();
  const [metricsMonth, setMetricsMonth] = useState(now.toLocaleString('default', { month: 'long' }));
  const [metricsYear, setMetricsYear] = useState(now.getFullYear().toString());
  
  const [ledgerMonth, setLedgerMonth] = useState('All');
  const [ledgerYear, setLedgerYear] = useState('All');

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('id, customer_name, selected_vehicle, assigned_washer, total_price, status, created_at')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching:", error);
    else setRawData(data || []);
    setLoading(false);
  }

  const transactions = rawData
    .filter((t) => t.status === 'Completed')
    .map((t) => {
      const dateObj = new Date(t.created_at);
      return {
        id: t.id,
        customer: t.customer_name || 'N/A',
        car: t.selected_vehicle || 'N/A',
        washer: t.assigned_washer || 'Unassigned',
        amount: t.total_price || 0,
        status: t.status || 'Pending',
        date: dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        metaMonth: dateObj.toLocaleString('default', { month: 'long' }),
        metaYear: dateObj.getFullYear().toString(),
      };
    });

  const filteredMetricsTxns = transactions.filter((t) => t.metaMonth === metricsMonth && t.metaYear === metricsYear);
  const monthlyRevenue = filteredMetricsTxns.reduce((sum, curr) => sum + curr.amount, 0);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-navy-deep p-6 text-white flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold">Business Analytics</h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <input 
            type="text" 
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white outline-none px-2 w-24 sm:w-32"
          />
          <select value={metricsMonth} onChange={(e) => setMetricsMonth(e.target.value)} className="bg-transparent text-xs text-white font-bold outline-none cursor-pointer">
            {AVAILABLE_MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={metricsYear} onChange={(e) => setMetricsYear(e.target.value)} className="bg-transparent text-xs text-white font-bold outline-none cursor-pointer border-l border-slate-800 pl-2">
            {AVAILABLE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading data...</div>
      ) : (
        <>
          <MonthlyMetrics
            revenue={monthlyRevenue}
            totalBookings={filteredMetricsTxns.length}
            completed={filteredMetricsTxns.length}
            active={0}
            selectedMonth={metricsMonth}
            selectedYear={metricsYear}
          />
         <FilteredTransactionLedger
            transactions={transactions}
            searchQuery={searchQuery}
            selectedMonth={metricsMonth} 
            selectedYear={metricsYear}   
          />
        </>
      )}
    </div>
  );
}