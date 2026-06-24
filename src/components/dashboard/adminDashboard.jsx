import React, { useState, useEffect } from 'react';
import AdminBookingManager from './admin/AdminBookingManager';
import { supabase } from '../../supabaseClient';

function AdminDashboardView() {
  const [bookings, setBookings] = useState([]);
  const [washers, setWashers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);

        const [bookingsResponse, washersResponse] = await Promise.all([
          supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false }),
          supabase.from('profiles').select('*').eq('role', 'washer'),
        ]);

        if (bookingsResponse.error) throw bookingsResponse.error;
        if (washersResponse.error) throw washersResponse.error;

        const mappedBookings = (bookingsResponse.data || []).map((b) => ({
          id: b.id,
          name: b.customer_name || 'Anonymous Client',
          number: b.number || b.booking_number || `BK-00${b.id}`,
          car: b.selected_vehicle
            ? `${b.selected_service} (${b.selected_vehicle})`
            : 'No Vehicle Set',
          time: b.selected_time
            ? `${b.selected_date || 'Today'} at ${b.selected_time}`
            : 'No Time Set',
          address: b.address || b.location || 'No Address Provided',
          status: b.status || 'Pending',
          assignedWasher: b.assigned_washer || null,
        }));

        const mappedWashers = (washersResponse.data || []).map((w) => {
          const isCurrentlyWorking = mappedBookings.some(
            (b) => b.assignedWasher === w.full_name && b.status !== 'Completed'
          );

          return {
            id: w.id,
            name: w.full_name || 'Unnamed Operator',
            shift: '8:00 AM - 5:00 PM',
            status: isCurrentlyWorking ? 'Busy' : 'Available',
          };
        });

        setBookings(mappedBookings);
        setWashers(mappedWashers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleAssignWasher = async (bookingId, washerId) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    const oldWasherName = targetBooking ? targetBooking.assignedWasher : null;

    const selectedWasher = washers.find((w) => w.id === washerId);
    const newWasherName = selectedWasher ? selectedWasher.name : 'Assigned Crew';

    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'Confirmed',
          assigned_washer: newWasherName,
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === bookingId
            ? { ...b, status: 'Confirmed', assignedWasher: newWasherName }
            : b
        )
      );

      setWashers((prevWashers) =>
        prevWashers.map((w) => {
          if (oldWasherName && w.name === oldWasherName) {
            return { ...w, status: 'Available' };
          }
          if (w.id === washerId) {
            return { ...w, status: 'Busy' };
          }
          return w;
        })
      );
    } catch (err) {
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#0D1B2A] text-white">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium">
          Loading live dashboard records...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#0D1B2A] text-white p-6 text-center">
        <div className="text-red-500 text-xl font-bold mb-2">
          Failed to Sync Database
        </div>
        <p className="text-slate-400 max-w-md mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 w-full p-3">
      <AdminBookingManager
        bookings={bookings}
        availableWashers={washers.filter((w) => w.status === 'Available')}
        onAssignWasher={handleAssignWasher}
      />
    </div>
  );
}

export default AdminDashboardView;