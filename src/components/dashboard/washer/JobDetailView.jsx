import React, { useState } from 'react';
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
}) {
  const [showReportForm, setShowReportForm] = useState(false);

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
            <span className="text-xs bg-blue-500 bg-opacity-10 text-blue-400 font-bold px-2.5 py-1 rounded-md">
              {job.status}
            </span>

            <div className="flex items-center gap-3 mt-2">
              <a
                href={`tel:${job.phone || '+234800000000'}`}
                aria-label={`Call ${job?.name ?? 'customer'}`}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors"
              >
                <Phone size={14} />
              </a>

              <a
                href={`sms:${job.phone || '+234800000000'}?body=Hi%20${encodeURIComponent(job.name)},%20this%20is%20your%20MiFai%20Wash%20crew%20pro!`}
                aria-label={`Send SMS to ${job?.name ?? 'customer'}`}
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

        {/* ADMIN EXCLUSIVE DEPLOYMENT DROP-DOWN COMPONENT AREA */}
        {isAdmin && (
          <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
            <div className="flex items-center gap-1 lg:justify-between ">
              <span className="text-xs font-bold uppercase text-slate-500 block">
                Operational Assignment
              </span>

              {/* Display current assignment using your exact design token block if already assigned */}
              {job.status !== 'Pending' && (
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

            {/* Show selection dropdown for all active, non-completed jobs */}
            {job.status !== 'Completed' ? (
              <div className="dropdown dropdown-top w-full mt-1">
                <div
                  tabIndex={0}
                  role="button"
                  className={`text-center w-full py-3 font-bold text-sm rounded-xl transition-colors ${
                    job.status === 'Pending'
                      ? 'bg-blue-500 hover:bg-blue-600 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs mt-1'
                  }`}
                >
                  {job.status === 'Pending'
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
              /* If completed, just display your design container without rendering an assignment button */
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

      {/* WASHER EXCLUSIVE ACTIONS AREA */}
      {!isAdmin &&
        (!showReportForm ? (
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex items-center justify-between px-2 text-sm">
              <span className="text-slate-400">Your Pending Payout:</span>
              <span className="text-emerald-400 font-bold flex items-center text-lg">
                ₦25.00
              </span>
            </div>
            <button
              onClick={() => setShowReportForm(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-slate-950 font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Check size={18} strokeWidth={3} /> Mark as Completed
            </button>
          </div>
        ) : (
          <JobReportForm
            onSubmit={(formData) => onCompleteJob(job.id, formData)}
          />
        ))}
    </div>
  );
}
