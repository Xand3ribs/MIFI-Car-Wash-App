import React, { useState, useEffect } from 'react';
import { Landmark, CalendarDays } from 'lucide-react';
import { supabase } from '../../../supabaseClient';
import MetricCard from './MetricCard';
import SettlementFilters from './SettlementFilters';
import SettlementList from './SettlementList';
import PayoutReceiptModal from './PayoutReceiptModal';

const AVAILABLE_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AVAILABLE_YEARS = ['2024', '2025', '2026'];

export default function EarningsLedger() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPayout, setSelectedPayout] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select(
        'id, total_price, customer_name, status, selected_date, selected_time'
      )
      .eq('status', 'Completed')
      .order('selected_date', { ascending: false });

    if (error) console.error('Error fetching:', error);
    else setRawData(data || []);
    setLoading(false);
  }

  const payouts = rawData.map((b) => {
    const dateObj = new Date(b.selected_date);
    return {
      id: b.id,
      amount: b.total_price || 0,
      customer_name: b.customer_name || 'N/A',
      date: `${b.selected_date}`,
      metaMonth: dateObj.toLocaleString('default', { month: 'long' }),
      metaYear: dateObj.getFullYear().toString(),
      status: b.status,
      gross_amount: b.total_price,
      fee: Math.floor((b.total_price || 0) * 0.15),
      bank_details: 'Access Bank •••• 4321',
    };
  });

  const filteredData = payouts.filter((p) => {
    const matchesMonth =
      selectedMonth === 'All' || p.metaMonth === selectedMonth;
    const matchesYear = selectedYear === 'All' || p.metaYear === selectedYear;
    return matchesMonth && matchesYear;
  });

  useEffect(() => setCurrentPage(1), [selectedMonth, selectedYear]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const monthlyRevenue = filteredData.reduce(
    (sum, curr) => sum + curr.amount,
    0
  );

  return (
    <div className="p-4 md:p-6 bg-navy-dark min-h-screen text-white flex flex-col gap-6">
      <div className="mb-2">
        <h2 className="text-2xl font-black tracking-tight">Earnings History</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          label="Payout Method"
          value="Access Bank"
          subtext="•••• 4321"
          icon={Landmark}
          color="text-blue-action"
        />

        <MetricCard
          label="Earned Monthly"
          value={`₦${monthlyRevenue.toLocaleString()}`}
          subtext="Total Payout"
          icon={CalendarDays}
          color="text-emerald-400"
        />
      </div>

      <div className="bg-navy-deep border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-black">Recent Settlements</h3>
          <SettlementFilters
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            months={AVAILABLE_MONTHS.map((m) => ({ value: m, label: m }))}
            years={AVAILABLE_YEARS}
          />
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : filteredData.length > 0 ? (
          <SettlementList
            payouts={paginatedData}
            onPayoutClick={setSelectedPayout}
          />
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
            <div className="text-slate-500 mb-2">
              <CalendarDays className="mx-auto h-8 w-8 opacity-50" />
            </div>
            <h4 className="text-white font-bold">No settlements found</h4>
            <p className="text-slate-400 text-sm">
              There are no completed washes for {selectedMonth} {selectedYear}.
            </p>
          </div>
        )}

        {filteredData.length >= pageSize && (
          <div className="join mt-6 flex justify-center">
            <button
              className="join-item btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              «
            </button>
            <button className="join-item btn btn-sm cursor-default">
              Page {currentPage}
            </button>
            <button
              className="join-item btn btn-sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              »
            </button>
          </div>
        )}
      </div>

      <PayoutReceiptModal
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />
    </div>
  );
}
