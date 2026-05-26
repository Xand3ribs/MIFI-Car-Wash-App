// src/components/dashboards/user/HistoryView.jsx
import React from 'react';
import MasterHistoryLog from '../../../pages/MasterHistoryLog';

function HistoryView() {
  // Mock customer history data stack array
  const userHistoryMock = [
    { id: 1, date: 'May 10, 2026', vehicle: 'Tesla Model 3', service: 'Full Detail Deluxe', status: 'Completed', price: 25000, washerName: 'Tunde Afolayan' },
    { id: 2, date: 'April 15, 2026', vehicle: 'Tesla Model 3', service: 'Exterior Quick Express', status: 'Completed', price: 12000, washerName: 'Emeka Okafor' },
    { id: 3, date: 'March 22, 2026', vehicle: 'Toyota Camry', service: 'Full Detail Deluxe', status: 'Cancelled', price: 0, washerName: 'Tunde Afolayan' }
  ];

  return (
    <div className="min-h-screen bg-navy-deep text-white p-6 md:p-8">
      <div className="w-full flex flex-col gap-6">
        <div>
          <h1 className="text-3xl tracking-tight">Wash History</h1>
          <p className="text-sm text-slate-400 mt-1">Review your past wash transactions and services.</p>
        </div>
        
        {/* Render shared framework mapping client permissions */}
        <MasterHistoryLog role="user" initialData={userHistoryMock} />
      </div>
    </div>
  );
}

export default HistoryView;