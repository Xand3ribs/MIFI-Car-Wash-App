// components/home/HowItWorks.jsx
import { MapPin, CalendarCheck, Truck, Star } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const STEPS = [
  {
    icon: MapPin,
    number: '01',
    title: 'Enter Your Location',
    body: 'Drop a pin or type your address. We come to you — at home, the office, wherever your car is parked.',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Pick a Time',
    body: 'Choose a date and time slot that fits your schedule. Same-day bookings available.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'We Arrive & Wash',
    body: 'Our licensed pro arrives with all equipment. Zero effort on your end — not even moving the car.',
  },
  {
    icon: Star,
    number: '04',
    title: 'Drive Away Spotless',
    body: 'Inspect your car, rate the wash in the app, and repeat whenever you need us.',
  },
];

// ─── Single step item ─────────────────────────────────────────────────────────
function Step({ step, index, isVisible, isLast }) {
  const Icon = step.icon;

  return (
    <div
      className={`
        relative flex flex-col items-center text-center
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon circle */}
      <div className="relative mb-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center
            bg-[#1565C0]/15 border border-[#1565C0]/35
            shadow-[0_0_24px_rgba(21,101,192,0.15)]"
        >
          <Icon size={26} className="text-[#42A5F5]" strokeWidth={1.75} />
        </div>

        {/* Step number badge */}
        <span
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full
            bg-[#0D1B2A] border border-[#1565C0]/50
            flex items-center justify-center
            text-[10px] font-bold text-[#42A5F5] tabular-nums"
        >
          {step.number}
        </span>
      </div>

      {/* Text */}
      <h3
        className="text-lg font-bold text-white mb-2"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {step.title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
        {step.body}
      </p>

      {/* Connecting line to the next step — hidden on last item, vertical on mobile */}
      {!isLast && (
        <>
          {/* Desktop: horizontal arrow line */}
          <div
            className={`
              hidden lg:block
              absolute top-8 left-[calc(50%+40px)] right-0
              h-px
              transition-all duration-700
              ${isVisible ? 'bg-gradient-to-r from-[#1565C0]/40 to-transparent' : 'bg-transparent'}
            `}
            style={{ transitionDelay: `${index * 150 + 300}ms` }}
            aria-hidden="true"
          />
          {/* Mobile: vertical connector */}
          <div
            className={`
              lg:hidden w-px h-10 mt-6
              transition-all duration-700
              ${isVisible ? 'bg-gradient-to-b from-[#1565C0]/40 to-transparent' : 'bg-transparent'}
            `}
            style={{ transitionDelay: `${index * 150 + 300}ms` }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function HowItWorks() {
  const [sectionRef, isVisible] = useInView();

  return (
    <div
      className="w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          'linear-gradient(180deg, #0D1B2A 0%, #0D2240 50%, #0D1B2A 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`
            text-center mb-16 lg:mb-20
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#42A5F5] mb-4">
            How It Works
          </p>
          <h2
            className="text-[2.2rem] lg:text-[3rem] font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Four steps to a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565C0] to-[#42A5F5]">
              spotless car
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            The whole process takes under two minutes to book and we handle
            everything else.
          </p>
        </div>

        {/* Steps grid — 4-column desktop, 1-column mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-4 relative">
          {STEPS.map((step, i) => (
            <Step
              key={step.number}
              step={step}
              index={i}
              isVisible={isVisible}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* Bottom trust strip */}
        <div
          className={`
            flex flex-wrap justify-center gap-6 mt-16 pt-10
            border-t border-white/8
            transition-all duration-700 delay-700
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {[
            '✓ No equipment needed from you',
            '✓ Licensed & insured professionals',
            '✓ Eco-friendly products',
            '✓ 30-minute booking guarantee',
          ].map((txt) => (
            <span key={txt} className="text-sm text-white/40 font-medium">
              {txt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
