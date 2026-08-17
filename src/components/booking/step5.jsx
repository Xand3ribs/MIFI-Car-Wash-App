import { VEHICLES, SERVICES } from '../../config/bookingConfig';
import {
  Car,
  Sparkles,
  MapPin,
  CalendarDays,
  Clock,
  User,
  ShieldCheck,
} from 'lucide-react';

// ─── Detail row inside a card ─────────────────────────────────────────────────
function DetailRow({ label, value, sub }) {
  return (
    <div>
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-base text-white font-medium leading-snug">
        {value || '—'}
      </p>
      {sub && <p className="text-sm text-white/40 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function ReviewCard({ index, icon: Icon, title, children, wide }) {
  return (
    <div
      className={`
        bg-gray-dark border border-border-dark rounded-3xl p-6 flex flex-col gap-5
        ${wide ? 'md:col-span-2' : ''}
      `}
    >
      <div className="flex items-center gap-3 pb-4 border-b border-border-dark">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-xl
          bg-blue-action/15 border border-blue-action/25"
        >
          <Icon size={16} className="text-blue-action" />
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-blue-action tabular-nums">
            {String(index).padStart(2, '0')}
          </span>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
}

function Step5({
  selectedVehicle,
  selectedService,
  address,
  selectedDate,
  selectedTime,
  userInfo,
  isLoggedIn,
  activeUser,
}) {
  const vehicleData = VEHICLES.find((v) => v.name === selectedVehicle);
  const serviceData = SERVICES.find((s) => s.name === selectedService);
  const estimatedTotal = (vehicleData?.price ?? 0) + (serviceData?.price ?? 0);

  const firstName = isLoggedIn
    ? activeUser?.user_metadata?.first_name
    : userInfo.firstName;
  const lastName = isLoggedIn
    ? activeUser?.user_metadata?.last_name
    : userInfo.lastName;
  const email = isLoggedIn ? activeUser?.email : userInfo.email;
  const phone = isLoggedIn ? activeUser?.phone : userInfo.phone;

  return (
    <div className="flex flex-col gap-8 w-full animate-[fadeSlideUp_0.35s_ease_both]">
      {/* Page heading */}
      <div>
        <h1 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-tight">
          Review Details
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          Confirm everything looks right before we lock it in.
        </p>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Service & Vehicle */}
        <ReviewCard index={1} icon={Car} title="Service Selection">
          <DetailRow
            label="Vehicle Type"
            value={`${vehicleData?.icon ?? ''} ${selectedVehicle}`}
            sub={vehicleData ? `Base price: ₦${vehicleData.price}` : undefined}
          />
          <DetailRow
            label="Service Plan"
            value={selectedService}
            sub={
              serviceData
                ? `${serviceData.time} · ${serviceData.description}`
                : undefined
            }
          />
          <div className="flex items-center justify-between pt-2 border-t border-border-dark">
            <span className="text-sm text-white/40">Service add-on</span>
            <span className="text-white font-semibold">
              ₦{serviceData?.price ?? '—'}
            </span>
          </div>
        </ReviewCard>

        {/* Card 2: Personal Details */}
        <ReviewCard index={2} icon={User} title="Personal Details">
          <DetailRow label="Full Name" value={`${firstName} ${lastName}`} />
          <DetailRow label="Email" value={email} />
          <DetailRow label="Phone" value={phone || '—'} />
        </ReviewCard>

        {/* Card 3: Logistics — full width */}
        <ReviewCard index={3} icon={MapPin} title="Appointment Logistics" wide>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-3">
              <DetailRow
                label="Service Location"
                value={address || 'No address provided'}
              />
            </div>
            <DetailRow label="Date" value={selectedDate} />
            <DetailRow label="Time" value={selectedTime} />
            <DetailRow label="Duration" value={serviceData?.time ?? '—'} />
          </div>
        </ReviewCard>
      </div>

      {/* ── Estimated total banner ────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 py-5 rounded-3xl
        bg-blue-action/10 border border-blue-action/30"
      >
        <div>
          <p className="text-xs font-semibold text-blue-action uppercase tracking-widest mb-1">
            Estimated Total
          </p>
          <p className="text-sm text-white/50">
            Vehicle ({selectedVehicle}) + {selectedService}
          </p>
        </div>
        <p className="text-3xl font-bold text-white">₦{estimatedTotal}</p>
      </div>

      {/* ── Trust footer ─────────────────────────────────────────────────── */}
      {/* <div className="flex items-center gap-2.5 text-white/30 text-xs">
        <ShieldCheck size={13} className="text-green-400/60 shrink-0" />
        Your payment is processed securely. No card data is stored on our servers.
      </div> */}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Step5;
