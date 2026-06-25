import React, { useState, useEffect } from 'react';
import ScheduleSummary from './washer/ScheduleSummary';
import ActiveJobCard from './washer/ActiveJobCard';
import JobDetailView from './washer/JobDetailView';
import { supabase } from '../../supabaseClient';

const LIQ_TOKEN = 'pk.d07bb9c386d6f7c5d13a9d09ebcd5957';
const YABA_HUB_LON = 3.3764;
const YABA_HUB_LAT = 6.5179;

function WasherDashboardView({ user }) {
  const [jobs, setJobs] = useState([]);
  const [washerName, setWasherName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchWasherWorkflow() {
      try {
        setLoading(true);

        // 1. Corrected to fetch from 'washer_profiles' using your exact schema columns
        const { data: profile, error: profileErr } = await supabase
          .from('washer_profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .maybeSingle();

        if (profileErr) throw profileErr;
        if (!profile) {
          setLoading(false);
          return;
        }

        // 2. Combine names into a single string to match how your 'bookings' table tracks them
        const targetWasherName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
        setWasherName(targetWasherName);

        const { data: bookings, error: bookingsErr } = await supabase
          .from('bookings')
          .select('*')
          .eq('assigned_washer', targetWasherName)
          .neq('status', 'Completed')
          .neq('status', 'completed');

        if (bookingsErr) throw bookingsErr;

        let currentLon = YABA_HUB_LON;
        let currentLat = YABA_HUB_LAT;
        const processedJobs = [];

        for (let i = 0; i < bookings.length; i++) {
          const booking = bookings[i];
          const destLat = parseFloat(booking.latitude);
          const destLon = parseFloat(booking.longitude);

          let computedDistance = '0.0 miles';
          let computedDriveTime = '0 mins';

          if (!isNaN(destLat) && !isNaN(destLon)) {
            try {
              const res = await fetch(
                `https://us1.locationiq.com/v1/directions/driving/${currentLon},${currentLat};${destLon},${destLat}?key=${LIQ_TOKEN}&overview=false`
              );
              const routeData = await res.json();

              if (routeData?.routes?.[0]) {
                const primaryRoute = routeData.routes[0];
                const miles = (primaryRoute.distance / 1609.34).toFixed(1);
                const baseMins = Math.round(primaryRoute.duration / 60);
                const trafficAllowanceBuffer = 8;
                const finalMins = baseMins + trafficAllowanceBuffer;

                computedDistance = `${miles} miles`;
                computedDriveTime = `${finalMins} mins`;
              }
            } catch (apiErr) {
              computedDistance = 'Calculated...';
              computedDriveTime = 'Estimation pending';
            }

            currentLat = destLat;
            currentLon = destLon;
          }

          let workingStatus = booking.status || 'Confirmed';
          if (
            workingStatus.toLowerCase() === 'assigned' ||
            workingStatus.toLowerCase() === 'pending'
          ) {
            workingStatus = 'Confirmed';
          }

          processedJobs.push({
            id: booking.id,
            name: booking.customer_name || 'Customer',
            phone: booking.customer_phone || '',
            number: booking.booking_number || `BK-${booking.id}`,
            car: booking.selected_vehicle || 'Vehicle Details',
            service: booking.selected_service || 'Standard Wash',
            time: booking.selected_time || 'TBD',
            date: booking.selected_date || '',
            address: booking.address || 'Lagos Address',
            distance: computedDistance,
            driveTime: computedDriveTime,
            status: workingStatus,
            customerNotes: booking.notes || '',
            latitude: destLat,
            longitude: destLon,
          });
        }

        setJobs(processedJobs);
      } catch (err) {
        // Unsilenced the logger so you can spot failing RLS policies or column spelling bugs immediately
        console.error('Error compiling washer workflow data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWasherWorkflow();
  }, [user?.id]);

  const handleCompleteJob = async (jobId, reportData) => {
    try {
      const databaseId = Number(jobId);

      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'Completed' })
        .eq('id', databaseId)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) return;

      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      setSelectedJob(null);
    } catch (err) {
      console.error('Error completing job:', err);
    }
  };

  const activeJob =
    jobs.find((j) =>
      ['In Progress', 'Washing', 'Arrived', 'En Route'].includes(j.status)
    ) || jobs.find((j) => j.status === 'Confirmed');
  const upcomingQueue = jobs.filter((j) => j.id !== activeJob?.id);
  const totalJobs = jobs.length;
  const completedCount = 0;
  const estimatedEarnings = completedCount * 25;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-4 text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-action/20 border-t-blue-action rounded-full animate-spin" />
        <p className="text-sm font-medium animate-pulse">
          Syncing shifts and parsing optimal travel matrices...
        </p>
      </div>
    );
  }

  if (selectedJob) {
    return (
      <JobDetailView
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
        onCompleteJob={handleCompleteJob}
        setJobs={setJobs}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 w-full">
      <div className="flex flex-col gap-6 lg:gap-10 flex-1 p-3">
        <ScheduleSummary
          totalJobs={totalJobs}
          completedCount={completedCount}
          estimatedEarnings={estimatedEarnings}
        />

        <div className="flex-1">
          <h3 className="text-xs lg:text-lg font-bold uppercase tracking-wider text-slate-500 mb-2 lg:mb-4 pl-1">
            Active Focus Job
          </h3>

          <ActiveJobCard
            job={activeJob}
            onClick={() => setSelectedJob(activeJob)}
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-auto lg:h-full lg:w-80 overflow-y-auto p-6 min-h-0 shrink-0 bg-black bg-opacity-30">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 lg:mb-4 lg:mt-4 pl-1">
          Next Up in Queue ({upcomingQueue.length})
        </h3>

        <div className="flex flex-col gap-3">
          {upcomingQueue.length > 0 ? (
            upcomingQueue.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-gray-dark bg-opacity-60 border border-border-dark rounded-xl flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-xs font-bold">
                      {job.time}
                    </span>
                    <span className="text-slate-600 text-xs">•</span>
                    <h5 className="text-white font-semibold text-sm truncate">
                      {job.car}
                    </h5>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">
                    {job.service}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 shrink-0 capitalize">
                  {job.status === 'Confirmed' ? 'Queued' : job.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-xs italic text-center py-4">
              No remaining queued jobs for today's routing run.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WasherDashboardView;