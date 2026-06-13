import React, { useState } from 'react';
// * CHANGE MADE HERE: Imported the sub-components
import MonthlyMetrics from './MonthlyMetrics';
import YearlyTrendChart from './YearlyTrendChart';
import FilteredTransactionLedger from './FilteredTransactionLedger';

// * MASTER DATA STRUCTURE: Formatted with metadata links for cleaner calendar calculation routing
const MOCK_DB_TRANSACTIONS = [
  {
    id: 'TXN-001',
    customer: 'Mike Taylor',
    car: 'Tesla Model 3',
    washer: 'Alex Rivera',
    amount: 25000,
    status: 'Completed',
    date: 'Jun 04, 2026',
    metaMonth: 'June',
    metaYear: '2026',
  },
  {
    id: 'TXN-002',
    customer: 'Sarah Miller',
    car: 'Ford F-150',
    washer: 'Marcus Kruse',
    amount: 35000,
    status: 'Completed',
    date: 'Jun 02, 2026',
    metaMonth: 'June',
    metaYear: '2026',
  },
  {
    id: 'TXN-003',
    customer: 'John Doe',
    car: 'Honda Civic',
    washer: 'Alex Rivera',
    amount: 15000,
    status: 'Completed',
    date: 'May 14, 2026',
    metaMonth: 'May',
    metaYear: '2026',
  },
  {
    id: 'TXN-004',
    customer: 'Emily Davis',
    car: 'Toyota RAV4',
    washer: 'Marcus Kruse',
    amount: 28000,
    status: 'In Progress',
    date: 'Jun 08, 2026',
    metaMonth: 'June',
    metaYear: '2026',
  },
  {
    id: 'TXN-005',
    customer: 'David Cole',
    car: 'Lexus RX350',
    washer: 'Alex Rivera',
    amount: 40000,
    status: 'Completed',
    date: 'Jan 15, 2025',
    metaMonth: 'January',
    metaYear: '2025',
  },
];

// Mock database dictionary optimized to return multi-month plots depending on the year filter context
const YEARLY_TRENDS_MAP = {
  2026: [
    { month: 'Jan', revenue: 45000, bookings: 2, barHeight: 'h-12' },
    { month: 'Feb', revenue: 90000, bookings: 4, barHeight: 'h-24' },
    { month: 'Mar', revenue: 30000, bookings: 1, barHeight: 'h-8' },
    { month: 'Apr', revenue: 120000, bookings: 6, barHeight: 'h-32' },
    { month: 'May', revenue: 180000, bookings: 9, barHeight: 'h-44' },
    { month: 'Jun', revenue: 210000, bookings: 11, barHeight: 'h-52' }, // Busiest month
    { month: 'Jul', revenue: 0, bookings: 0, barHeight: 'h-0' },
    { month: 'Aug', revenue: 0, bookings: 0, barHeight: 'h-0' },
    { month: 'Sep', revenue: 0, bookings: 0, barHeight: 'h-0' },
    { month: 'Oct', revenue: 0, bookings: 0, barHeight: 'h-0' },
    { month: 'Nov', revenue: 0, bookings: 0, barHeight: 'h-0' },
    { month: 'Dec', revenue: 0, bookings: 0, barHeight: 'h-0' },
  ],
  2025: [
    { month: 'Jan', revenue: 140000, bookings: 8, barHeight: 'h-36' },
    { month: 'Feb', revenue: 110000, bookings: 6, barHeight: 'h-28' },
    { month: 'Mar', revenue: 160000, bookings: 9, barHeight: 'h-40' },
    { month: 'Apr', revenue: 95000, bookings: 5, barHeight: 'h-24' },
    { month: 'May', revenue: 130000, bookings: 7, barHeight: 'h-32' },
    { month: 'Jun', revenue: 150000, bookings: 8, barHeight: 'h-36' },
    { month: 'Jul', revenue: 175000, bookings: 10, barHeight: 'h-44' },
    { month: 'Aug', revenue: 190000, bookings: 12, barHeight: 'h-48' },
    { month: 'Sep', revenue: 120000, bookings: 6, barHeight: 'h-28' },
    { month: 'Oct', revenue: 115000, bookings: 5, barHeight: 'h-26' },
    { month: 'Nov', revenue: 140000, bookings: 7, barHeight: 'h-32' },
    { month: 'Dec', revenue: 240000, bookings: 15, barHeight: 'h-56' },
  ],
};

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
const AVAILABLE_YEARS = ['2026', '2025'];

export default function AnalyticsView() {
  // * CHANGE MADE HERE: Managed global tracking parameters at the parent view baseline scope
  const [metricsMonth, setMetricsMonth] = useState('June');
  const [metricsYear, setMetricsYear] = useState('2026');
  const [chartYear, setChartYear] = useState('2026');
  const [ledgerMonth, setLedgerMonth] = useState('All');
  const [ledgerYear, setLedgerYear] = useState('All');

  // * CHANGE MADE HERE: Derived metrics counts on the fly according to current user dropdown configurations
  const filteredMetricsTxns = MOCK_DB_TRANSACTIONS.filter(
    (t) => t.metaMonth === metricsMonth && t.metaYear === metricsYear
  );
  const monthlyRevenue = filteredMetricsTxns.reduce(
    (sum, curr) => (curr.status === 'Completed' ? sum + curr.amount : sum),
    0
  );
  const totalBookingsCount = filteredMetricsTxns.length;
  const completedCount = filteredMetricsTxns.filter(
    (t) => t.status === 'Completed'
  ).length;
  const activeCount = filteredMetricsTxns.filter(
    (t) => t.status !== 'Completed'
  ).length;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-navy-deep p-6 text-white flex flex-col gap-6 animate-fadeIn">
      {/* Top Header Section with Dynamic Section 1 Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold">Business Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Segmented financial accounting matrices
          </p>
        </div>

        {/* Section 1 Dropdown Filter Group */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
          <span className="text-[10px] text-slate-500 font-bold uppercase px-1">
            Metrics Scope:
          </span>
          <select
            value={metricsMonth}
            onChange={(e) => setMetricsMonth(e.target.value)}
            className="bg-transparent text-xs text-white font-bold outline-none cursor-pointer"
          >
            {AVAILABLE_MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={metricsYear}
            onChange={(e) => setMetricsYear(e.target.value)}
            className="bg-transparent text-xs text-white font-bold outline-none cursor-pointer border-l border-slate-800 pl-2"
          >
            {AVAILABLE_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* * * SECTION 1 COMPONENT * * */}
      <MonthlyMetrics
        revenue={monthlyRevenue}
        totalBookings={totalBookingsCount}
        completed={completedCount}
        active={activeCount}
        selectedMonth={metricsMonth}
        selectedYear={metricsYear}
      />

      {/* * * SECTION 2 COMPONENT * * */}
      {/* <YearlyTrendChart 
        chartData={YEARLY_TRENDS_MAP[chartYear] || []}
        selectedYear={chartYear}
        onYearChange={setChartYear}
        availableYears={AVAILABLE_YEARS}
      /> */}

      {/* * * SECTION 3 COMPONENT * * */}
      <FilteredTransactionLedger
        transactions={MOCK_DB_TRANSACTIONS}
        months={AVAILABLE_MONTHS}
        years={AVAILABLE_YEARS}
        selectedMonth={ledgerMonth}
        selectedYear={ledgerYear}
        onMonthChange={setLedgerMonth}
        onYearChange={setLedgerYear}
      />
    </div>
  );
}
