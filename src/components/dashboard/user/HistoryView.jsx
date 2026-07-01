import React, { useState, useEffect } from 'react';
import MasterHistoryLog from '../../../pages/MasterHistoryLog';
import { supabase } from '../../../supabaseClient';

function HistoryView() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserHistory() {
      try {
        setLoading(true);

        // 1. Verify active session context
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setError('User authentication context missing.');
          return;
        }

        // 2. Query terminal states only ('Completed' or 'Cancelled') scoped to this user
        const { data, error: dbError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['Completed', 'Cancelled'])
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;

        // 3. Map definitive snapshot fields
        const mappedHistory = (data || []).map((b) => ({
          id: b.id,
          date: b.selected_date || 'Date Pending',
          vehicle: b.selected_vehicle || 'No Vehicle Set',
          service: b.selected_service || 'Standard Wash',
          status: b.status || 'Pending',
          price: Number(b.total_price || 0),
          washerName: b.assigned_washer || 'Unassigned Crew',
          customerName: b.customer_name || 'Client',
          address: b.address || 'No Address Provided',
          timeStarted: b.time_started || '09:00 AM',
          timeEnded: b.time_ended || '10:15 AM',
        }));

        setBookings(mappedHistory);
      } catch (err) {
        setError(err.message || 'Failed to retrieve wash history.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserHistory();
  }, []);

  return (
    <div className="min-h-screen bg-navy-deep text-white p-6 md:p-8">
      <div className="w-full flex flex-col gap-6">
        <div>
          <h1 className="text-3xl tracking-tight font-black">Wash History</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review your past wash transactions and services.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <span className="loading loading-spinner text-blue-action w-10"></span>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <MasterHistoryLog role="user" initialData={bookings} />
        )}
      </div>
    </div>
  );
}

export default HistoryView;
