import { VEHICLES, SERVICES } from '../../config/bookingConfig';

// ─── Vehicle card ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(vehicle.name)}
      className={`
        group relative flex h-full min-h-[90px] items-center justify-between w-full
        px-5 py-4 rounded-2xl border text-left
        transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'bg-blue-action border-blue-action text-navy-deep shadow-[0_0_20px_rgba(0,200,255,0.2)]'
            : 'bg-gray-dark border-border-dark text-white hover:border-blue-action/60 hover:bg-white/5'
        }
      `}
    >
      <div className="flex items-center gap-4">
        <span
          className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl
            transition-colors duration-200
            ${isSelected ? 'bg-navy-deep/20' : 'bg-white/5'}`}
        >
          {vehicle.icon}
        </span>
        <span className="text-lg font-semibold">{vehicle.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">₦{vehicle.price}</span>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
            transition-all duration-200 shrink-0
            ${
              isSelected
                ? 'border-navy-deep bg-navy-deep'
                : 'border-white/30 group-hover:border-blue-action/60'
            }`}
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-blue-action" />
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(service.name)}
      className={`
        group relative flex h-full min-h-[90px] flex-col justify-between w-full
        px-5 py-4 rounded-2xl border text-left gap-1
        transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'bg-blue-action border-blue-action text-navy-deep shadow-[0_0_20px_rgba(0,200,255,0.2)]'
            : 'bg-gray-dark border-border-dark text-white hover:border-blue-action/60 hover:bg-white/5'
        }
      `}
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-lg font-semibold">{service.name}</span>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">₦{service.price}</span>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 shrink-0
              ${
                isSelected
                  ? 'border-navy-deep bg-navy-deep'
                  : 'border-white/30 group-hover:border-blue-action/60'
              }`}
          >
            {isSelected && (
              <div className="w-2 h-2 rounded-full bg-blue-action" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-medium px-2 py-0.5 rounded-lg
            ${isSelected ? 'bg-navy-deep/20 text-navy-deep' : 'bg-white/8 text-white/50'}`}
        >
          ⏱ {service.time}
        </span>
        <span
          className={`text-sm ${isSelected ? 'text-navy-deep/70' : 'text-white/40'}`}
        >
          {service.description}
        </span>
      </div>
    </button>
  );
}

function Step1({
  selectedVehicle,
  setSelectedVehicle,
  selectedService,
  setSelectedService,
}) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Page heading */}
      <div>
        <h1 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-tight">
          What are we washing?
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          Select your vehicle type and service type
        </p>
      </div>

      {/* ── Grid Container ── */}
      <div className="flex flex-col xl:justify-between xl:flex-row ">
        {/* Vehicle selection */}
        <section className="w-full">
          <div className="flex justify-center text-center mb-4">
            {/* <span className="text-xs font-bold  uppercase ">Step A</span> */}
            <h2 className="text-xl font-bold text-blue-action tracking-widest uppercase">
              Vehicle Type
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {VEHICLES.map((vehicle) => (
              <VehicleCard
                key={vehicle.name}
                vehicle={vehicle}
                isSelected={selectedVehicle === vehicle.name}
                onSelect={setSelectedVehicle}
              />
            ))}
          </div>
        </section>

        <div className="divider xl:divider-horizontal divider-info"></div>

        {/* Service selection */}
        <section className="w-full">
          <div className="flex justify-center text-center mb-4">
            {/* <span className="text-xs font-bold tracking-widest  text-blue-action">Step B</span> */}
            <h2 className="text-xl font-bold text-blue-action tracking-widest uppercase">
              Service Type
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                isSelected={selectedService === service.name}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Live price summary */}
      {selectedVehicle &&
        selectedService &&
        (() => {
          const v = VEHICLES.find((x) => x.name === selectedVehicle);
          const s = SERVICES.find((x) => x.name === selectedService);
          const total = (v?.price ?? 0) + (s?.price ?? 0);
          return (
            <div
              className="flex items-center justify-between px-6 py-4 rounded-2xl
            bg-blue-action/10 border border-blue-action/30 text-white w-full
            animate-[fadeIn_0.3s_ease_both]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{v?.icon}</span>
                <div>
                  <p className="font-semibold">
                    {selectedVehicle} · {selectedService}
                  </p>
                  <p className="text-sm text-white/50">
                    {s?.time} · {s?.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40 uppercase tracking-wide">
                  Estimated Total
                </p>
                <p className="text-2xl font-bold text-blue-action">₦{total}</p>
              </div>
            </div>
          );
        })()}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Step1;
