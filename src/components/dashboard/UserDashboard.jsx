import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; 

import LiveProgressTracker from './user/LiveProgressTracker';
import QuickHistoryCard from './user/QuickHistoryCard';
import SupportCard from './user/SupportCard';
import NoActiveBookingCard from './user/NoActiveBookingCard';
import SubscriptionCard from './user/SubscriptionCard';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Recent Wash';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [history, setHistory] = useState([]);

  const [washTimeline, setWashTimeline] = useState([
    { step: 'Confirmed', label: 'Confirmed', done: false },
    { step: 'En Route', label: 'En Route', done: false },
    { step: 'Arrived', label: 'Arrived', done: false },
    { step: 'Washing', label: 'Washing', done: false },
    { step: 'Done', label: 'Completed', done: false },
  ]);

  const updateTimelineState = (statusString) => {
    const normalized = statusString?.toLowerCase().trim();
    let activeIndex = 0;

    if (normalized === 'confirmed' || normalized === 'queued') {
      activeIndex = 0;
    } else if (normalized === 'en route') {
      activeIndex = 1; 
    } else if (normalized === 'arrived') {
      activeIndex = 2; 
    } else if (normalized === 'in progress' || normalized === 'washing') {
      activeIndex = 3; 
    } else if (normalized === 'completed' || normalized === 'done') {
      activeIndex = 4; 
    }

    setWashTimeline([
      { step: 'Confirmed', label: 'Confirmed', done: activeIndex >= 0 },
      { step: 'En Route', label: 'En Route', done: activeIndex >= 1 },
      { step: 'Arrived', label: 'Arrived', done: activeIndex >= 2 },
      { step: 'Washing', label: 'Washing', done: activeIndex >= 3 },
      { step: 'Done', label: 'Completed', done: activeIndex >= 4 },
    ]);
  };

  useEffect(() => {
    let userRefId = null;

    const fetchDashboardContext = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        setActiveUser(user);
        userRefId = user.id; 

        // 1. Fetch live active booking
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select('*')
          .not('status', 'in', '("Completed","Cancelled")')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (bookings && bookings.length > 0) {
          const liveWash = bookings[0];
          setActiveBooking(liveWash);
          updateTimelineState(liveWash.status);
        }

        // 2. Fetch history: Only Completed and Cancelled, just like the history page
        try {
          const { data: historyData, error: historyErr } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', user.id)
            .in('status', ['Completed', 'completed', 'Cancelled', 'cancelled'])
            .order('created_at', { ascending: false })
            .limit(3);

          if (historyErr) throw historyErr;

          if (historyData) {
            const parsedHistory = historyData.map((item) => ({
              id: item.id,
              date: formatDate(item.selected_date),
              vehicle: item.selected_vehicle || 'Vehicle Details',
              service: item.selected_service || 'Premium Wash',
              amount: item.total_price || '0',
              status: item.status,
            }));
            setHistory(parsedHistory);
          }
        } catch (historyCrash) {
          console.error('History mapping column mismatch:', historyCrash);
        }
      } catch (err) {
        console.error('Core Dashboard fetch error:', err);
      } finally {
        // This is now guaranteed to execute no matter what happens above
        setLoading(false); 
      }
    };

    fetchDashboardContext();

    // 4. Enhanced realtime tracking network channel
    const channel = supabase
      .channel('live-booking-status-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          const rowData = payload.new || payload.old;
          const currentUserId = userRefId || activeUser?.id;

          if (rowData && rowData.user_id === currentUserId) {
            const statusLower = rowData.status?.toLowerCase();
            
            if (statusLower === 'completed' || statusLower === 'cancelled') {
              setActiveBooking(null);
              
              // If marked complete, dynamically feed into history log view window immediately
              if (statusLower === 'completed') {
                const freshHistoryRow = {
                  id: rowData.id,
                  date: formatDate(rowData.selected_date),
                  vehicle: rowData.selected_vehicle || 'Vehicle Details',
                  service: rowData.selected_service || 'Premium Wash',
                  amount: rowData.amount || rowData.price || '0',
                  status: rowData.status,
                };
                setHistory((prev) => [freshHistoryRow, ...prev.slice(0, 2)]);
              }
            } else {
              setActiveBooking(rowData);
              updateTimelineState(rowData.status);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeUser?.id]);

  const firstName = activeUser?.user_metadata?.first_name || 'Client';

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-deep flex items-center justify-center text-white">
        <span className="loading loading-spinner text-blue-action w-12"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-deep text-white p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border-dark/40 pb-6">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight">Hello, {firstName}</h1>
            <p className="text-slate-400 mt-1.5 text-sm lg:text-base font-medium">Welcome back to your premium car care headquarters.</p>
          </div>
          <Link to="/booking" className="bg-blue-action text-navy-deep px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition-all self-start md:self-auto">+ Book New Wash</Link>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-1">Live Appointment Tracking</h2>
            {!activeBooking ? (
              <NoActiveBookingCard />
            ) : (
              <LiveProgressTracker
                bookingId={activeBooking.id}
                selectedService={activeBooking.selected_service}
                selectedVehicle={activeBooking.selected_vehicle}
                currentWashStatus={activeBooking.status}
                timelineSteps={washTimeline}
                selectedDate={activeBooking.selected_date}
                selectedTime={activeBooking.selected_time}
                address={activeBooking.address}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:justify-between w-full">
              {/* 5. Fed live formatted history array state into the presentation layout element */}
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

export default UserDashboard;