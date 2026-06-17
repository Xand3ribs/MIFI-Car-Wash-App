// components/home/Services.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const SERVICES = [
  {
    name: 'Basic Wash',
    price: 25,
    duration: '20 min',
    tagline: 'Everyday clean, done fast.',
    features: [
      'Full exterior rinse',
      'Foam wash & rinse',
      'Hand dry with microfibre',
      'Window wipe-down',
    ],
    featured: false,
  },
  {
    name: 'Premium Wash',
    price: 45,
    duration: '45 min',
    tagline: 'Our most popular service.',
    features: [
      'Everything in Basic',
      'Interior vacuum & wipe',
      'Tyre shine treatment',
      'Dashboard polish',
      'Air freshener finish',
    ],
    featured: true,
  },
  {
    name: 'Deluxe Detail',
    price: 65,
    duration: '60 min',
    tagline: 'Showroom condition, at your door.',
    features: [
      'Everything in Premium',
      'Deep seat cleaning',
      'Engine bay rinse',
      'Clay bar exterior',
      'Wax & paint protection',
    ],
    featured: false,
  },
];

// ─── Single service card ──────────────────────────────────────────────────────
function ServiceCard({ service, index, isVisible }) {
  const { name, price, duration, tagline, features, featured } = service;

  return (
    <div
      className={`
        relative flex flex-col rounded-3xl border p-7 lg:p-8
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${
          featured
            ? // Featured card: elevated, glowing, slightly larger
              'bg-[#1565C0]/15 border-[#1565C0]/50 shadow-[0_0_48px_rgba(21,101,192,0.2)] lg:scale-[1.04] lg:-translate-y-2 z-10'
            : 'bg-white/4 border-white/10 hover:border-white/20'
        }
      `}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
            bg-[#1565C0] text-white text-xs font-bold tracking-wide uppercase
            shadow-[0_4px_14px_rgba(21,101,192,0.5)]"
          >
            <Sparkles size={10} />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3
          className="text-xl font-bold text-white mb-1"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {name}
        </h3>
        <p className="text-sm text-white/50">{tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <div className="flex items-end gap-1">
          <span
            className="text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            ₦{price}
          </span>
          <span className="text-white/40 text-sm mb-1.5">/ wash</span>
        </div>
        <p className="text-xs text-white/40 mt-1">⏱ Approx. {duration}</p>
      </div>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/70">
            <Check
              size={14}
              className={`shrink-0 mt-0.5 ${featured ? 'text-[#42A5F5]' : 'text-white/40'}`}
              strokeWidth={2.5}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/booking"
        className={`
          group flex items-center justify-center gap-2
          w-full py-3.5 rounded-2xl text-sm font-bold
          transition-all duration-200 active:scale-[0.97]
          ${
            featured
              ? 'bg-[#1565C0] text-white shadow-[0_4px_20px_rgba(21,101,192,0.4)] hover:brightness-110'
              : 'bg-white/8 text-white hover:bg-white/14 border border-white/10'
          }
        `}
      >
        Book Now
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  const [sectionRef, isVisible] = useInView();

  return (
    <div
      className="w-full bg-[#0D1B2A] py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
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
            Our Services
          </p>
          <h2
            className="text-[2.2rem] lg:text-[3rem] font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Pick your level of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565C0] to-[#42A5F5]">
              clean
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto leading-relaxed">
            Every tier includes our licensed, insured professionals arriving at
            your location.
          </p>
        </div>

        {/* Cards — 3-column on large, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-white/60 text-xs mt-10">
          All prices are per vehicle. SUV/Truck pricing may vary slightly —
          confirm at booking.
        </p>
      </div>
    </div>
  );
}

export default Services;
