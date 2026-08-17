import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import {
  ArrowLeft,
  Clock,
  Car,
  MapPin,
  Navigation,
  Check,
  Phone,
  MessageSquare,
} from 'lucide-react';
import JobReportForm from './JobReportForm';

export default function JobDetailView({
  job,
  onBack,
  onCompleteJob,
  isAdmin = false,
  availableWashers = [],
  onAssignWasher,
  setJobs,
}) {
  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    setCurrentStatus(job.status);
  }, [job.status]);

  const statusKey = currentStatus?.toLowerCase().trim();

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase().trim()) {
      case 'confirmed':
      case 'queued':
        return 'bg-blue-500 bg-opacity-10 text-blue-400';
      case 'en route':
        return 'bg-amber-500 bg-opacity-10 text-amber-400';
      case 'arrived':
        return 'bg-purple-500 bg-opacity-10 text-purple-400';
      case 'washing':
      case 'in progress':
        return 'bg-indigo-500 bg-opacity-10 text-indigo-400';
      case 'completed':
        return 'bg-emerald-500 bg-opacity-10 text-emerald-400';
      default:
        return 'bg-slate-500 bg-opacity-10 text-slate-400';
    }
  };

  const advanceWorkflowStatus = async () => {
    let nextStatus = currentStatus;

    if (statusKey === 'confirmed' || statusKey === 'queued') {
      nextStatus = 'En Route';
    } else if (statusKey === 'en route') {
      nextStatus = 'Arrived';
    } else if (statusKey === 'arrived') {
      nextStatus = 'Washing';
    }

    try {
      const databaseId = Number(job.id);
      if (!databaseId || isNaN(databaseId)) {
        console.error('Invalid database ID:', job.id);
        return;
      }

      const { data, error } = await supabase
        .from('bookings')
        .update({ status: nextStatus })
        .eq('id', databaseId)
        .select();

      if (error) {
        console.error('Booking status update failed:', error.message);
        return;
      }
      if (!data || data.length === 0) {
        console.error('No booking found to update for ID:', databaseId);
        return;
      }

      const updatedBooking = data[0];
      const rawNumberString = String(job.number || databaseId).replace(/\D/g, '');
      const paddedNumber = rawNumberString ? rawNumberString.padStart(2, '0') : String(databaseId);
      const formattedBookingId = `BK-00${paddedNumber}`;
      const washerName = updatedBooking.assigned_washer || job.assignedWasher || job.assigned_washer || 'Your assigned washer';

      const { data: adminRecord, error: adminError } = await supabase
        .from('admin_profiles')
        .select('id')
        .limit(1)
        .single();

      if (adminError) {
        console.error('Failed to fetch admin profile:', adminError.message);
      }

      const notificationsToInsert = [];
      const customerId = job.user_id || job.customer_id;

      let adminTitle = '';
      let adminMessage = '';
      let customerTitle = '';
      let customerMessage = '';

      if (nextStatus === 'En Route') {
        adminTitle = 'Washer En Route';
        adminMessage = `${washerName} is on their way to customer ${job.name} for Booking ${formattedBookingId}.`;
        customerTitle = 'Washer On The Way';
        customerMessage = `${washerName} is on the way to your location!`;
      } else if (nextStatus === 'Arrived') {
        adminTitle = 'Washer Arrived';
        adminMessage = `${washerName} has arrived at the location for Booking ${formattedBookingId}.`;
        customerTitle = 'Washer Arrived';
        customerMessage = `${washerName} has arrived at your location.`;
      } else if (nextStatus === 'Washing') {
        adminTitle = 'Wash Started';
        adminMessage = `Wash has officially started by ${washerName} for Booking ${formattedBookingId}.`;
        customerTitle = 'Wash Started';
        customerMessage = `${washerName} has started washing your vehicle!`;
      }

      if (adminRecord?.id && adminTitle) {
        notificationsToInsert.push({
          user_id: adminRecord.id,
          role: 'admin',
          title: adminTitle,
          message: adminMessage,
          booking_id: databaseId,
          is_read: false,
        });
      }

      if (customerId && customerTitle) {
        notificationsToInsert.push({
          user_id: customerId,
          role: 'customer',
          title: customerTitle,
          message: customerMessage,
          booking_id: databaseId,
          is_read: false,
        });
      }

      if (notificationsToInsert.length > 0) {
        const { error: notifError } = await supabase
          .from('notifications')
          .insert(notificationsToInsert);

        if (notifError) {
          console.error('SUPABASE NOTIFICATION INSERT ERROR:', notifError.message);
        } else {
          console.log('Notifications inserted successfully!');
        }
      }

      setCurrentStatus(nextStatus);
      if (setJobs) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: nextStatus } : j))
        );
      }
    } catch (err) {
      console.error('Unexpected workflow error caught:', err);
    }
  };

  const handleCompleteJobWithNotifications = async (jobId, formData) => {
    try {
      const databaseId = Number(jobId);
      if (!databaseId || isNaN(databaseId)) return;

      const imageUrls = [];

      // 1. Upload proof-of-work images to Supabase Storage bucket ('job-reports')
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          const file = formData.images[i];
          const fileExt = file.name.split('.').pop();
          const fileName = `${databaseId}_${Date.now()}_${i}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('job-reports')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Image upload failed:', uploadError.message);
          } else {
            const { data: publicUrlData } = supabase.storage
              .from('job-reports')
              .getPublicUrl(filePath);

            if (publicUrlData?.publicUrl) {
              imageUrls.push(publicUrlData.publicUrl);
            }
          }
        }
      }

      // 2. Update booking status and save report details into precise columns
      const { data, error } = await supabase
        .from('bookings')
        .update({ 
          status: 'Completed',
          preexisting_conditions: formData.issues || {},      // JSONB checkboxes state
          proof_images: imageUrls,                            // Array of public storage URLs
          operational_notes: formData.washerNotes || ''       // Optional operational notes text
        })
        .eq('id', databaseId)
        .select();

      if (error) {
        console.error('Failed to complete booking:', error.message);
        return;
      }

      const updatedBooking = data[0];
      const rawNumberString = String(updatedBooking.number || databaseId).replace(/\D/g, '');
      const paddedNumber = rawNumberString ? rawNumberString.padStart(2, '0') : String(databaseId);
      const formattedBookingId = `BK-00${paddedNumber}`;
      const washerName = updatedBooking.assigned_washer || job.assignedWasher || job.assigned_washer || 'Your assigned washer';

      const { data: adminRecord, error: adminError } = await supabase
        .from('admin_profiles')
        .select('id')
        .limit(1)
        .single();

      if (adminError) {
        console.error('Failed to fetch admin profile:', adminError.message);
      }

      const notificationsToInsert = [];
      const customerId = updatedBooking.user_id || updatedBooking.customer_id;

      const adminTitle = 'Wash Completed';
      const adminMessage = `Wash has been completed by ${washerName} for Booking ${formattedBookingId}.`;
      const customerTitle = 'Wash Completed';
      const customerMessage = `Your vehicle wash has been completed by ${washerName}! Thank you for choosing us.`;

      if (adminRecord?.id) {
        notificationsToInsert.push({
          user_id: adminRecord.id,
          role: 'admin',
          title: adminTitle,
          message: adminMessage,
          booking_id: databaseId,
          is_read: false,
        });
      }

      if (customerId) {
        notificationsToInsert.push({
          user_id: customerId,
          role: 'customer',
          title: customerTitle,
          message: customerMessage,
          booking_id: databaseId,
          is_read: false,
        });
      }

      if (notificationsToInsert.length > 0) {
        const { error: notifError } = await supabase
          .from('notifications')
          .insert(notificationsToInsert);

        if (notifError) {
          console.error('SUPABASE NOTIFICATION INSERT ERROR:', notifError.message);
        } else {
          console.log('Completion notifications sent successfully!');
        }
      }

      setCurrentStatus('Completed');
      if (typeof onCompleteJob === 'function') {
        onCompleteJob(jobId, formData);
      }
    } catch (err) {
      console.error('Unexpected error completing job:', err);
    }
  };

  return (
    <div className="w-full min-h-full bg-navy-deep p-4 text-white flex flex-col gap-6 animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 text-sm font-semibold hover:text-white self-start mt-3"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold">{job.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Booking ID: #{job.number}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 mt-1">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md capitalize tracking-wide ${getStatusStyles(currentStatus)}`}
            >
              {statusKey === 'confirmed' ? 'Queued' : currentStatus}
            </span>

            <div className="flex items-center gap-3 mt-2">
              <a
                href={`tel:${job.phone || '+234800000000'}`}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors"
              >
                <Phone size={14} />
              </a>

              <a
                href={`sms:${job.phone || '+234800000000'}?body=Hi%20${encodeURIComponent(job.name)},%20this%20is%20your%20MiFai%20Wash%20crew%20pro!`}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors"
              >
                <MessageSquare size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-400" />
            <span>
              Time slot: <strong className="text-white">{job.time}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Car size={16} className="text-blue-400" />
            <span>
              Vehicle: <strong className="text-white">{job.car}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
              Service
            </span>
            <span className="text-white font-semibold">
              {job.service || 'Standard Wash'}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <MapPin size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">{job.address}</p>
              {job.distance && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {job.distance} ({job.driveTime} drive)
                </p>
              )}
            </div>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 w-full bg-blue-action hover:bg-slate-700 text-gray-dark py-2.5 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Navigation size={14} /> Open in Google Maps
          </a>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Customer Notes
          </span>
          <p className="text-xs text-slate-300 bg-slate-900 bg-opacity-40 p-3 rounded-xl italic border border-slate-800">
            {job.customerNotes || 'No specific instructions left by client.'}
          </p>
        </div>

        {isAdmin && (
          <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
            <div className="flex items-center gap-1 lg:justify-between ">
              <span className="text-xs font-bold uppercase text-slate-500 block">
                Operational Assignment
              </span>

              {statusKey !== 'pending' && (
                <div className="mt-1 inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 p-3 rounded-xl w-auto animate-fadeIn">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-slate-950 font-black">
                    W
                  </div>
                  <p className="text-slate-300 text-xs font-medium">
                    <span className="text-white font-semibold">
                      {job.assignedWasher || 'Marcus Kruse'}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {statusKey !== 'completed' ? (
              <div className="dropdown dropdown-top w-full mt-1">
                <div
                  tabIndex={0}
                  role="button"
                  className={`text-center w-full py-3 font-bold text-sm rounded-xl transition-colors ${
                    statusKey === 'pending'
                      ? 'bg-blue-500 hover:bg-blue-600 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs mt-1'
                  }`}
                >
                  {statusKey === 'pending'
                    ? 'Assign Washer ▼'
                    : 'Change / Reassign Washer ▼'}
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-slate-800 border border-border-dark rounded-xl w-full z-[100] mt-1 text-slate-200"
                >
                  <li className="menu-title text-[10px] text-slate-500 uppercase tracking-wider font-bold p-2">
                    Available Crew
                  </li>

                  {availableWashers.length > 0 ? (
                    availableWashers.map((washer) => (
                      <li key={washer.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onAssignWasher(job.id, washer.id);
                          }}
                          className="hover:bg-blue-500 hover:text-slate-950 text-sm py-2.5 rounded-lg transition-colors"
                        >
                          {washer.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500 text-xs p-2 italic">
                      No available washers
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <div className="mt-1 inline-flex items-center gap-1.5 bg-emerald-950 bg-opacity-20 border border-emerald-900/30 p-3 rounded-xl w-full">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-slate-950 font-black">
                  ✓
                </div>
                <p className="text-slate-300 text-xs font-medium">
                  Job Completed By:{' '}
                  <span className="text-white font-semibold">
                    {job.assignedWasher || 'Marcus Kruse'}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {!isAdmin && (
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between px-2 text-sm">
            <span className="text-slate-400">Your Pending Payout:</span>
            <span className="text-emerald-400 font-bold flex items-center text-lg">
              ₦25.00
            </span>
          </div>

          {!showReportForm ? (
            <>
              {(statusKey === 'confirmed' || statusKey === 'queued') && (
                <button
                  onClick={advanceWorkflowStatus}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-slate-950 font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Navigation size={18} strokeWidth={3} /> Start Trip
                </button>
              )}

              {statusKey === 'en route' && (
                <button
                  onClick={advanceWorkflowStatus}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MapPin size={18} strokeWidth={3} /> Arrived at Location
                </button>
              )}

              {statusKey === 'arrived' && (
                <button
                  onClick={advanceWorkflowStatus}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Car size={18} strokeWidth={3} /> Start Wash
                </button>
              )}

              {(statusKey === 'washing' || statusKey === 'in progress') && (
                <button
                  onClick={() => setShowReportForm(true)}
                  className="w-full bg-green-500 hover:bg-green-600 text-slate-950 font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Check size={18} strokeWidth={3} /> Complete Wash
                </button>
              )}
            </>
          ) : (
            <JobReportForm
              onSubmit={(formData) => handleCompleteJobWithNotifications(job.id, formData)}
            />
          )}
        </div>
      )}
    </div>
  );
}