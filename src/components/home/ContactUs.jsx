import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children }) {
  return (
    <label className="block text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
      {children}
    </label>
  );
}

function TextInput({ type = 'text', placeholder, value, onChange, required }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="
        w-full bg-white/5 border border-white/10 rounded-xl
        px-4 py-3.5 text-white text-sm
        placeholder:text-white/25
        focus:border-[#1565C0]/70 focus:outline-none focus:bg-white/8
        transition-all duration-200
      "
    />
  );
}

// ─── Quote form ───────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function QuoteForm({ isVisible }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // placeholder
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div
      className={`
        w-full max-w-xl mx-auto
        transition-all duration-700 delay-200
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {/* Glass card */}
      <div
        className="
          relative rounded-3xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          p-7 lg:p-9
          shadow-[0_0_60px_rgba(0,0,0,0.3),0_0_30px_rgba(21,101,192,0.06)]
        "
      >
        {/* Corner accents — same pattern used in Hero and Login */}
        <div
          className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#1565C0]/30 rounded-tl-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#1565C0]/30 rounded-br-3xl pointer-events-none"
          aria-hidden
        />

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="mb-1">
              <h3
                className="text-xl font-bold text-white mb-1"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Request a Custom Quote
              </h3>
              <p className="text-xs text-white/40">
                We respond within one business day with a tailored proposal.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <FieldLabel>Full Name</FieldLabel>
              <TextInput
                placeholder="e.g. Chidi Okonkwo"
                value={form.name}
                onChange={set('name')}
                required
              />
            </div>

            {/* Email + Phone — two-column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Email Address</FieldLabel>
                <TextInput
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={set('email')}
                  required
                />
              </div>
              <div>
                <FieldLabel>Phone Number</FieldLabel>
                <TextInput
                  type="tel"
                  placeholder="080 0000 0000"
                  value={form.phone}
                  onChange={set('phone')}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <FieldLabel>Special Requirements</FieldLabel>
              <textarea
                rows={4}
                placeholder="Describe your vehicle(s), preferred schedule, any special conditions..."
                value={form.message}
                onChange={set('message')}
                className="
                  w-full bg-white/5 border border-white/10 rounded-xl
                  px-4 py-3.5 text-white text-sm resize-none
                  placeholder:text-white/25
                  focus:border-[#1565C0]/70 focus:outline-none focus:bg-white/8
                  transition-all duration-200
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                group flex items-center justify-center gap-2.5
                w-full py-4 rounded-2xl mt-1
                bg-[#1565C0] text-white font-bold text-base
                shadow-[0_6px_28px_rgba(21,101,192,0.4)]
                hover:bg-[#1251A3] hover:shadow-[0_8px_36px_rgba(21,101,192,0.55)]
                hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                transition-all duration-200 cursor-pointer
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Request Custom Quote
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-white/25 -mt-1">
              No commitment required. We'll respond within 24 hours.
            </p>
          </form>
        ) : (
          /* Success state — same card dimensions, no layout jump */
          <div
            className="flex flex-col items-center justify-center text-center py-8 gap-5
            animate-[fadeSlideUp_0.4s_ease_both]"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-green-500/15 blur-xl scale-[2]"
                aria-hidden
              />
              <div
                className="relative w-16 h-16 rounded-full bg-green-500/10 border border-green-500/25
                flex items-center justify-center"
              >
                <CheckCircle2
                  size={28}
                  className="text-green-400"
                  strokeWidth={1.75}
                />
              </div>
            </div>
            <div>
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Quote request sent!
              </h3>
              <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
                Thanks,{' '}
                <span className="text-white font-medium">
                  {form.name.split(' ')[0]}
                </span>
                . We'll review your request and reach out to{' '}
                <span className="text-[#42A5F5]">{form.email}</span> within one
                business day.
              </p>
            </div>
            <button
              onClick={() => {
                setForm(INITIAL_FORM);
                setIsSubmitted(false);
              }}
              className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 underline underline-offset-2 cursor-pointer"
            >
              Submit another request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

function ContactUs() {
  const [sectionRef, isVisible] = useInView();

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          'linear-gradient(180deg, #0D1B2A 0%, #0A1628 50%, #0D1B2A 100%)',
      }}
    >
      {/* Ambient glow — decorative, non-interactive */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background: 'radial-gradient(circle, #1565C0, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto flex items-center justify-center">
        <QuoteForm isVisible={isVisible} />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ContactUs;
