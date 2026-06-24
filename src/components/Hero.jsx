import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Droplets } from 'lucide-react';
import heroBg from '/src/assets/hero-bg.webp';

function Hero() {
  return (
    <section
      className="relative min-h-screen w-full flex overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        className="relative z-10 flex flex-col justify-center
          w-full lg:w-[52%]
          px-6 sm:px-10 lg:px-16 xl:px-24
          pt-28 pb-16 lg:pt-24 lg:pb-20
          bg-[#0D1B2A]"
      >
        {/* Subtle top accent line */}
        <div className="w-10 h-[3px] rounded-full bg-[#1565C0] mb-8 animate-[fadeIn_0.5s_ease_both]" />

        {/* Eyebrow */}
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-[#42A5F5] mb-4
            animate-[slideUp_0.5s_ease_both_0.1s]"
          style={{ opacity: 0, animation: 'slideUp 0.55s ease forwards 0.1s' }}
        >
          Mobile Car Wash · Come to You
        </p>

        {/* Headline */}
        <h1
          className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem]
            font-extrabold leading-[1.1] tracking-tight text-white mb-6"
          style={{
            fontFamily: "'Sora', 'Inter', sans-serif",
            opacity: 0,
            animation: 'slideUp 0.6s ease forwards 0.2s',
          }}
        >
          Your Car,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565C0] to-[#42A5F5]">
            Spotless.
          </span>
          <br />
          At Your Door.
        </h1>

        {/* Sub-copy */}
        <p
          className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-sm mb-10"
          style={{ opacity: 0, animation: 'slideUp 0.6s ease forwards 0.32s' }}
        >
          Professional mobile detailing delivered to your home, office, or
          wherever life takes you. No queues. No hassle.
        </p>

        {/* CTA group */}
        <div
          className="flex flex-col xl:flex-row items-start xl:items-center gap-6"
          style={{ opacity: 0, animation: 'slideUp 0.6s ease forwards 0.44s' }}
        >
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2
              px-7 py-4 rounded-2xl
              bg-[#1565C0] text-white font-semibold text-base
              shadow-[0_6px_28px_rgba(21,101,192,0.45)]
              hover:bg-[#1251A3]
              hover:shadow-[0_8px_36px_rgba(21,101,192,0.65)]
              hover:scale-[1.04] active:scale-[0.98]
              transition-all duration-200"
          >
            Book a Wash
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400
              hover:text-white transition-colors duration-200"
          >
            See our services
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Diagonal mask for the split (desktop only) — purely decorative */}
        <div
          className="hidden lg:block absolute top-0 right-0 h-full w-24 z-20"
          style={{
            background:
              'linear-gradient(to bottom-right, #0D1B2A 49%, transparent 51%)',
            transform: 'translateX(100%)',
          }}
        />
      </div>

      {/* ── RIGHT PANEL (photo) ── */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-[52%] z-0"
        aria-hidden="true"
      >
        {/* Photo */}
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Left-edge gradient blending into navy panel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0D1B2A 0%, #0D1B2A 8%, rgba(13,27,42,0.5) 30%, transparent 60%)',
          }}
        />
        {/* General darkening */}
        <div className="absolute inset-0 bg-[#0D1B2A]/25" />
      </div>

      {/* ── MOBILE full-bleed background ── */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0D1B2A]/80" />
      </div>
    </section>
  );
}

export default Hero;
