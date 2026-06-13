import React from 'react';
import MasterHistoryLog from '../../../pages/MasterHistoryLog';

// Mock performance data matrix specific to detailing operations
const WASHER_PERFORMANCE_LOGS = [
  {
    id: '721',
    service: 'Executive Detail',
    date: 'May 28, 2026',
    vehicle: 'Mercedes-Benz G63 AMG',
    customerName: 'Destiny Onyebuchi Okoye',
    price: 35000,
    status: 'Completed',
    timeStarted: '08:15 AM',
    timeEnded: '10:45 AM',
    address: 'Plot 24, Banana Island Rd, Ikoyi, Lagos',
  },
  {
    id: '604',
    service: 'Standard Eco Wash',
    date: 'May 24, 2026',
    vehicle: 'Toyota Camry',
    customerName: 'Amara Chinedu',
    price: 12000,
    status: 'Completed',
    timeStarted: '02:30 PM',
    timeEnded: '03:40 PM',
    address: '14 Admiralty Way, Lekki Phase 1, Lagos',
  },
  {
    id: '412',
    service: 'Rug & Interior Deep Clean',
    date: 'May 19, 2026',
    vehicle: 'Range Rover Sport',
    customerName: 'Tunde Folawiyo',
    price: 45000,
    status: 'Cancelled',
    timeStarted: '11:00 AM',
    timeEnded: '11:15 AM',
    address: 'Block 8, Phase 2, Ikeja GRA, Lagos',
  },
];

function WasherHistoryView() {
  return (
    <div className="p-6 bg-navy-dark min-h-screen text-white">
      {/* SECTION HEADER BLOCK */}
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-100">
          {' '}
          Review your past detailing jobs.
        </h2>
        <p className="text-sm text-slate-400 mt-1"></p>
      </div>

      {/* CORE HISTORY ENGINE */}
      <MasterHistoryLog role="washer" initialData={WASHER_PERFORMANCE_LOGS} />
    </div>
  );
}

export default WasherHistoryView;
