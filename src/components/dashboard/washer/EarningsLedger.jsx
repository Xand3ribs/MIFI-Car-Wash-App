import React, { useState } from 'react';
import { Landmark, TrendingUp, CalendarDays } from 'lucide-react';
import MetricCard from './MetricCard';
import SettlementFilters from './SettlementFilters';
import SettlementList from './SettlementList';
import PayoutReceiptModal from './PayoutReceiptModal';

export default function EarningsLedger() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedPayout, setSelectedPayout] = useState(null);

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = ['2024', '2025', '2026'];

  const performanceStats = [
    {
      id: 1,
      label: 'Payout Method',
      value: 'Access Bank',
      subtext: '•••• 4321',
      icon: Landmark,
      color: 'text-blue-action',
    },
    {
      id: 2,
      label: 'This Month',
      value: '₦32,700',
      subtext: 'Earned',
      icon: CalendarDays,
      color: 'text-amber-400',
    },
    {
      id: 3,
      label: 'This Week',
      value: '₦12,800',
      subtext: 'Earned',
      icon: TrendingUp,
      color: 'text-emerald-400',
    },
  ];

  const recentPayouts = [
    {
      id: 'TXN-1024',
      date: 'June 04, 2026',
      rawMonth: '06',
      rawYear: '2026',
      amount: '₦14,200',
      status: 'Settled',
      bank: 'Access Bank •••• 4321',
      gross: '₦16,500',
      fee: '₦2,300',
    },
    {
      id: 'TXN-0981',
      date: 'May 28, 2026',
      rawMonth: '05',
      rawYear: '2026',
      amount: '₦18,500',
      status: 'Settled',
      bank: 'OPay •••• 9876',
      gross: '₦21,000',
      fee: '₦2,500',
    },
    {
      id: 'TXN-0842',
      date: 'March 15, 2025',
      rawMonth: '03',
      rawYear: '2025',
      amount: '₦15,800',
      status: 'Settled',
      bank: 'Access Bank •••• 4321',
      gross: '₦18,000',
      fee: '₦2,200',
    },
    {
      id: 'TXN-0711',
      date: 'March 22, 2026',
      rawMonth: '03',
      rawYear: '2026',
      amount: '₦11,000',
      status: 'Settled',
      bank: 'OPay •••• 9876',
      gross: '₦13,000',
      fee: '₦2,000',
    },
    {
      id: 'TXN-0654',
      date: 'January 10, 2024',
      rawMonth: '01',
      rawYear: '2024',
      amount: '₦22,400',
      status: 'Settled',
      bank: 'Access Bank •••• 4321',
      gross: '₦25,500',
      fee: '₦3,100',
    },
  ];

  const filteredPayouts = recentPayouts.filter((payout) => {
    const matchesMonth =
      selectedMonth === 'all' || payout.rawMonth === selectedMonth;
    const matchesYear =
      selectedYear === 'all' || payout.rawYear === selectedYear;
    return matchesMonth && matchesYear;
  });

  return (
    <div className="p-4 md:p-6 bg-navy-dark min-h-screen text-white relative">
      {/* SECTION HEADER */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
          Earnings History
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1"></p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        {performanceStats.map((stat) => (
          <MetricCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* RECENT SETTLEMENTS LEDGER */}
      <div className="bg-navy-deep border border-slate-800 rounded-2xl shadow-md p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-sm md:text-base font-black text-slate-100">
            Recent Settlements
          </h3>

          <SettlementFilters
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            months={months}
            years={years}
          />
        </div>

        <SettlementList
          payouts={filteredPayouts}
          onPayoutClick={setSelectedPayout}
        />
      </div>

      {/* RESPONSIVE RECEIPT MODAL */}
      <PayoutReceiptModal
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />
    </div>
  );
}
