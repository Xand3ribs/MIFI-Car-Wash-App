function Step5({
  selectedVehicle,
  selectedService,
  address,
  selectedDate,
  selectedTime,
  userInfo,
}) {
  return (
    <div className="flex flex-col animate-fadeIn">
      <div className="mb-8 lg:mb-10">
        <h1 className="text-[2rem] lg:text-[3rem] text-white">
          Review Details
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          Please confirm everything is correct before finalizing.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white
        [&>div]:bg-gray-dark [&>div]:border [&>div]:border-border-dark [&>div]:p-6 [&>div]:rounded-3xl [&>div]:flex [&>div]:flex-col [&>div]:gap-4"
      >
        {/* Card 1: Service & Vehicle */}
        <div>
          <div className="flex items-center gap-3 border-b border-border-dark pb-3">
            <span className="bg-blue-action/20 text-blue-action p-2 rounded-lg text-sm font-bold">
              01
            </span>
            <h2 className="text-xl font-semibold">Service Selection</h2>
          </div>
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider">
              Vehicle Type
            </p>
            <p className="text-xl">{selectedVehicle || 'Not selected'}</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider">
              Service Plan
            </p>
            <p className="text-xl">{selectedService || 'Not selected'}</p>
          </div>
        </div>

        {/* Card 2: Contact Info */}
        <div>
          <div className="flex items-center gap-3 border-b border-border-dark pb-3">
            <span className="bg-blue-action/20 text-blue-action p-2 rounded-lg text-sm font-bold">
              02
            </span>
            <h2 className="text-xl font-semibold">Personal Details</h2>
          </div>
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider">
              Name
            </p>
            <p className="text-xl">
              {userInfo.firstName} {userInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider">
              Contact
            </p>
            <p className="text-xl">{userInfo.email}</p>
            <p className="text-lg text-text-secondary">{userInfo.phone}</p>
          </div>
        </div>

        {/* Card 3: Logistics (Full Width) */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 border-b border-border-dark pb-3">
            <span className="bg-blue-action/20 text-blue-action p-2 rounded-lg text-sm font-bold">
              03
            </span>
            <h2 className="text-xl font-semibold">Appointment Logistics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-text-secondary text-sm uppercase tracking-wider">
                Location
              </p>
              <p className="text-lg">{address || 'No address provided'}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm uppercase tracking-wider">
                Date
              </p>
              <p className="text-lg">{selectedDate}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm uppercase tracking-wider">
                Time
              </p>
              <p className="text-lg">{selectedTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step5;
