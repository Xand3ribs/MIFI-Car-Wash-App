function Step1({
  selectedVehicle,
  setSelectedVehicle,
  selectedService,
  setSelectedService,
}) {
  const vehicles = [
    { name: 'Sedan', price: '25', icon: '🚗' },
    { name: 'SUV', price: '35', icon: '🚙' },
    { name: 'Truck', price: '45', icon: '🛻' },
  ];

  const services = [
    { name: 'Basic Wash', time: '20 min', price: '25' },
    { name: 'Premium Wash', time: '45 min', price: '45' },
    { name: 'Deluxe Wash', time: '60 min', price: '65' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="mb-8 lg:mb-10">
        <h1 className="text-[2rem] lg:text-[3rem] text-white">
          What are we washing?
        </h1>

        <p className="text-lg text-text-secondary mt-2">
          Select your vehicle and service
        </p>
      </div>

      <div
        className="flex flex-col xl:justify-between xl:flex-row 
            [&_h2]:text-center [&_h2]:mb-6 [&_h2]:text-[1.7rem]"
      >
        {/* vehicle type */}
        <div className="flex-1 text-white">
          <h2>Vehicle Type</h2>

          {/* vehicle selection */}
          <div
            className="flex flex-col gap-6 w-full text-[1rem] sm:text-[1.5rem]
                    [&>div>div]:flex [&>div>div]:items-center [&>div>div]:gap-2"
          >
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                onClick={() => setSelectedVehicle(vehicle.name)}
                className={`flex flex-row justify-between items-center p-4 border rounded-2xl w-full cursor-pointer transition-all duration-200
                                    ${
                                      selectedVehicle === vehicle.name
                                        ? 'bg-blue-action text-navy-deep border-blue-action'
                                        : 'bg-gray-dark text-white border-border-dark hover:border-blue-action'
                                    }`}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-car-icon lucide-car"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>

                  <p>{vehicle.name}</p>
                </div>

                <p>₦{vehicle.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="divider xl:divider-horizontal divider-info"></div>

        {/* Service level */}
        <div className="flex-1 text-white">
          <h2>Service Level</h2>

          {/* level selection */}
          <div
            className="flex flex-col gap-6 w-full text-[1rem] sm:text-[1.5rem]
                    [&>div]:
                    [&>div>div]:flex [&>div>div]:items-center [&>div>div]:gap-2
                    [&_p]:"
          >
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(service.name)}
                className={`flex flex-row justify-between items-center p-4 border rounded-2xl w-full cursor-pointer transition-all duration-200
                                    ${
                                      selectedService === service.name
                                        ? 'bg-blue-action text-navy-deep border-blue-action'
                                        : 'bg-gray-dark text-white border-border-dark hover:border-blue-action'
                                    }`}
              >
                <div>
                  <p>{service.name}</p>
                </div>

                <div>
                  <p>₦{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1;
