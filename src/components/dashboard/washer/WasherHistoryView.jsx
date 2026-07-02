import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import MasterHistoryLog from '../../../pages/MasterHistoryLog';

function WasherHistoryView() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWasherHistory() {
      try {
        setLoading(true);

        // 1. Get the authenticated washer's profile/name
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError('Authentication context missing.');
          return;
        }

        // Get washer name to filter correctly
        const { data: profile } = await supabase
          .from('washer_profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();

        const washerFullName = profile ? `${profile.first_name} ${profile.last_name}` : null;

        if (!washerFullName) {
          setError('Washer profile not found.');
          return;
        }

        // 2. Query only Completed/Cancelled, scoped to this washer
        const { data, error: dbError } = await supabase
          .from('bookings')
          .select('*')
          .eq('assigned_washer', washerFullName)
          .in('status', ['Completed', 'Cancelled'])
          .order('selected_date', { ascending: false });

        if (dbError) throw dbError;

        // 3. Map to match the structure MasterHistoryLog expects
        const mappedHistory = (data || []).map((b) => ({
          id: b.id,
          date: b.selected_date || 'N/A',
          vehicle: b.selected_vehicle || 'N/A',
          service: b.selected_service || b.service || 'General Wash',
          status: b.status || 'Pending',
          price: Number(b.total_price || 0),
          customerName: b.customer_name || 'N/A', // Washer sees Customer Name
          address: b.address || 'N/A',
          timeStarted: b.selected_time || 'N/A',
          timeEnded: b.time_ended || 'N/A',
        }));

        setBookings(mappedHistory);
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Failed to retrieve history.');
      } finally {
        setLoading(false);
      }
    }

    fetchWasherHistory();
  }, []);

  return (
    <div className="p-6 bg-navy-dark min-h-screen text-white">
      
      <div className="mb-8">
        <h1 className="text-3xl tracking-tight font-black">Washer History</h1>
        <p className="text-sm text-slate-400 mt-1">Review your completed and cancelled jobs.</p>
      </div>

      {loading && (
        <div className="text-center py-20 text-slate-500">Loading your history...</div>
      )}

      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-4">{error}</div>
      )}

      {!loading && !error && (
        <MasterHistoryLog role="washer" initialData={bookings} />
      )}
    </div>
  );
}

export default WasherHistoryView;