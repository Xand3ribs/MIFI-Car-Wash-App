import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboard({
  userInfo,
  selectedVehicle,
  selectedService,
  address,
  selectedDate,
  selectedTime,
}) {
  // Mock data for history since we aren't doing logic/DB yet
  const history = [
    {
      id: 1,
      date: 'May 10, 2024',
      vehicle: 'Tesla Model 3',
      service: 'Deep Clean',
      status: 'Completed',
    },
    {
      id: 2,
      date: 'April 15, 2024',
      vehicle: 'Tesla Model 3',
      service: 'Quick Wash',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-deep text-white p-6 lg:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header Area */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">
              Hello, {userInfo?.firstName || 'User'}
            </h1>
            <p className="text-text-secondary mt-2 text-lg font-medium">
              Manage your professional car care sessions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Active Booking (Main Focus) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-bold ml-1">Current Appointment</h2>

            <div className="bg-gray-dark border border-border-dark rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden shadow-xl">
              {/* Status Badge */}
              <div className="absolute top-8 right-8 bg-blue-action/20 text-blue-action px-4 py-2 rounded-full text-sm font-bold border border-blue-action/30">
                Confirmed
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <p className="text-blue-action font-bold uppercase tracking-widest text-sm">
                    Upcoming Wash
                  </p>
                  <h3 className="text-4xl font-bold">
                    {selectedDate || 'No Date'} @ {selectedTime || 'No Time'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-border-dark/50">
                  <div>
                    <p className="text-text-secondary text-sm uppercase mb-1">
                      Vehicle
                    </p>
                    <p className="text-xl font-medium">
                      {selectedVehicle || 'Tesla Model 3'}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm uppercase mb-1">
                      Service
                    </p>
                    <p className="text-xl font-medium">
                      {selectedService || 'Full Detail'}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-text-secondary text-sm uppercase mb-1">
                      Location
                    </p>
                    <p className="text-xl font-medium truncate">
                      {address || '123 Main St, NY'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                  <button className="btn bg-blue-action text-navy-deep border-none px-8 rounded-xl font-bold hover:brightness-110">
                    Reschedule
                  </button>
                  <button className="btn bg-transparent border border-border-dark text-white px-8 rounded-xl font-bold hover:bg-white/5">
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: History & Quick Stats */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold ml-1">Recent History</h2>

            <div className="bg-gray-dark border border-border-dark rounded-[2.5rem] p-6 flex flex-col gap-4 shadow-xl">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-navy-deep/50 border border-border-dark/30 hover:border-blue-action/30 transition-all cursor-pointer"
                >
                  <div>
                    <p className="font-bold">{item.service}</p>
                    <p className="text-sm text-text-secondary">{item.date}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              ))}

              <Link
                to="/account/history"
                className="text-blue-action text-center font-bold mt-4 hover:underline"
              >
                View all past washes
              </Link>
            </div>

            {/* Help Card */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
