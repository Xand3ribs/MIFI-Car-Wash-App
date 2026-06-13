// src/components/dashboards/UserDashboardView.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // <-- Captures your submission data safely
import LiveProgressTracker from './user/LiveProgressTracker';
import QuickHistoryCard from './user/QuickHistoryCard';
import SupportCard from './user/SupportCard';
import NoActiveBookingCard from './user/NoActiveBookingCard';
import SubscriptionCard from './user/SubscriptionCard';

function UserDashboardView() {
  const location = useLocation();

  // Extract data passed from your Confirm Booking success modal link
  const routeState = location.state || {};

  const userInfo = { firstName: routeState.firstName || 'User' };
  const selectedVehicle = routeState.vehicle || '';
  const selectedService = routeState.service || '';
  const address = routeState.address || '';
  const selectedDate = routeState.date || '';
  const selectedTime = routeState.time || '';

  // Flag to check if a booking transaction just took place
  const hasActiveBooking = routeState.hasActiveBooking || !!selectedService;

  const [washTimeline, setWashTimeline] = useState([
    { step: 'Confirmed', label: 'Booked', done: hasActiveBooking },
    { step: 'En Route', label: 'En Route', done: false },
    { step: 'Washing', label: 'Washing', done: false },
    { step: 'Done', label: 'Completed', done: false },
  ]);

  const activeMilestone = [...washTimeline]
    .reverse()
    .find((phase) => phase.done);
  const currentWashStatus = activeMilestone
    ? activeMilestone.label
    : 'Completed';

  const history = [
    {
      id: 1,
      date: 'May 10, 2026',
      vehicle: 'Tesla Model 3',
      service: 'Deep Clean',
      status: 'Completed',
      amount: '15,000',
    },
    {
      id: 2,
      date: 'April 15, 2026',
      vehicle: 'Tesla Model 3',
      service: 'Quick Wash',
      status: 'Completed',
      amount: '15,000',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-deep text-white p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* PREMIUM HUB WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border-dark/40 pb-6">
          <div className="max-w-sm 2xl:max-w-lg">
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight">
              Hello, {userInfo.firstName}
            </h1>
            <p className="text-slate-400 mt-1.5 text-sm lg:text-base font-medium">
              Welcome back to your premium car care headquarters.
            </p>
          </div>

          <Link
            to="/booking"
            className="bg-blue-action text-navy-deep px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition-all self-start md:self-auto"
          >
            + Book New Wash
          </Link>
        </div>

        {/* YOUR ORIGINAL VERTICAL STACK LAYOUT CONTAINER */}
        <div className="flex flex-col gap-8">
          {/* TOP ZONE: ACTIVE TRACKING SYSTEM OR EMPTY STATE STATE TRIGGER */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">
              Live Appointment Tracking
            </h2>

            {!hasActiveBooking ? (
              <NoActiveBookingCard />
            ) : (
              <LiveProgressTracker
                selectedService={selectedService}
                selectedVehicle={selectedVehicle}
                currentWashStatus={currentWashStatus}
                timelineSteps={washTimeline}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                address={address}
              />
            )}
          </div>

          {/* BOTTOM ZONE: DASHBOARD UTILITY SUB-CONTAINERS */}
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:justify-between w-full ">
              <QuickHistoryCard historyData={history} />
              <SubscriptionCard />
            </div>

            <SupportCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardView;
