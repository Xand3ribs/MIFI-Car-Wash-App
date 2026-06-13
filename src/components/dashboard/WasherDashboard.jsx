// src/components/dashboard/WasherDashboardView.jsx
import React, { useState } from 'react';
import ScheduleSummary from './washer/ScheduleSummary';
import ActiveJobCard from './washer/ActiveJobCard';
import JobDetailView from './washer/JobDetailView';

const INITIAL_JOBS = [
  {
    id: 1,
    name: 'John Doe',
    phone: '+2348123456789',
    number: 'BK001',
    car: 'Honda Civic (Sedan)',
    service: 'Premium Exterior + Wax',
    time: '10:30 AM',
    address: '123 Main St, Lagos',
    distance: '1.8 miles',
    driveTime: '6 mins',
    status: 'In Progress',
    customerNotes:
      'Please pay extra attention to the front rims, they have heavy brake dust. Gate code is #4412.',
  },
  {
    id: 2,
    name: 'John Doeerr',
    phone: '+2348123456789',
    number: 'BK002',
    car: 'Honda Civic (Sedan)',
    service: 'Premium Exterior + Wax',
    time: '10:30 AM',
    address: '123 Main St, Lagos',
    distance: '1.8 miles',
    driveTime: '6 mins',
    status: 'In Progress',
    customerNotes:
      'Please pay extra attention to the front rims, they have heavy brake dust. Gate code is #4412.',
  },
  {
    id: 3,
    name: 'Robert Fox',
    number: 'BK003',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },

  {
    id: 4,
    name: 'Robert Fox',
    number: 'BK004',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },
  {
    id: 5,
    name: 'Robert Fox',
    number: 'BK004',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },
  {
    id: 6,
    name: 'Robert Fox',
    number: 'BK004',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },
  {
    id: 7,
    name: 'Robert Fox',
    number: 'BK004',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },
  {
    id: 8,
    name: 'Robert Fox',
    number: 'BK004',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },
  {
    id: 9,
    name: 'Robert Fox',
    number: 'BK004',
    car: 'BMW X5 (SUV)',
    service: 'Full Interior Detail',
    time: '1:30 PM',
    address: '456 Side Ave',
    distance: '4.2 miles',
    driveTime: '12 mins',
    status: 'Upcoming',
    customerNotes: '',
  },
];

function WasherDashboardView() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState(null);

  const activeJob = jobs.find(
    (j) => j.status === 'Assigned' || j.status === 'In Progress'
  );
  const upcomingQueue = jobs.filter((j) => j.status === 'Upcoming');

  const handleCompleteJob = (jobId, reportData) => {
    // Log final reportData object here when database endpoints are built!
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Completed' } : j))
    );
    setSelectedJob(null);
  };

  const totalJobs = jobs.length;
  const completedCount = jobs.filter((j) => j.status === 'Completed').length;
  const estimatedEarnings = completedCount * 25;

  // Switch to Full Detail Sheet View Layer
  if (selectedJob) {
    return (
      <JobDetailView
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
        onCompleteJob={handleCompleteJob}
      />
    );
  }

  // Standard Main Dashboard Shell View Layer
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 w-full ">
      <div className="flex flex-col gap-6 lg:gap-10 flex-1 p-3">
        {/* TODAY'S SCHEDULE SUMMARY */}
        <ScheduleSummary
          totalJobs={totalJobs}
          completedCount={completedCount}
          estimatedEarnings={estimatedEarnings}
        />

        {/* Section 1: Focus Card Component */}
        <div className="flex-1">
          <h3 className="text-xs lg:text-lg font-bold uppercase tracking-wider text-slate-500 mb-2  lg:mb-4 pl-1">
            Active Focus Job
          </h3>
          <ActiveJobCard
            job={activeJob}
            onClick={() => setSelectedJob(activeJob)}
          />
        </div>
      </div>

      {/* Section 2: Remaining Queue Items */}
      <div className="flex flex-col w-full h-auto lg:h-full lg:w-80 overflow-y-auto p-6 min-h-0 shrink-0 bg-black bg-opacity-30 ">
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
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-500 shrink-0">
                  Queued
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-xs italic text-center py-4">
              No more remaining jobs for today's shift.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WasherDashboardView;
