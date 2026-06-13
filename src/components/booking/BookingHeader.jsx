import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { STEP_LABELS } from '../../config/bookingConfig';

function StepDot({ step, currentStep, label }) {
  const isDone   = currentStep > step;
  const isActive = currentStep === step;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold transition-all duration-300
        ${isDone ? 'bg-blue-action border-blue-action text-navy-deep' : isActive ? 'bg-transparent border-blue-action text-blue-action scale-110' : 'bg-transparent border-white/20 text-white/30'}`}
      >
        {isDone ? <CheckCircle2 size={14} strokeWidth={3} /> : step}
      </div>
      <span className={`hidden sm:block text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300
        ${isActive ? 'text-blue-action' : isDone ? 'text-white/60' : 'text-white/25'}`}>
        {label}
      </span>
    </div>
  );
}

function StepConnector({ filled }) {
  return (
    <div className="flex-1 h-px mx-1 mt-[-14px] sm:mt-[-18px] relative">
      <div className="absolute inset-0 bg-white/10 rounded-full" />
      <div className={`absolute inset-0 bg-blue-action rounded-full transition-all duration-500 origin-left ${filled ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
}

export default function BookingHeader({ currentStep, isLoggedIn }) {
  return (
    <header className="relative flex-shrink-0 bg-gray-dark border-b border-border-dark">
      <div className="flex items-center h-20 px-5 lg:px-10 gap-6">
        <Link
          to={isLoggedIn ? "/account/dashboard" : "/"}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-200 shrink-0"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center w-full max-w-sm sm:max-w-md">
            {STEP_LABELS.map(({ step, label }, idx) => {
              const adjustedLabel = step === 4 && isLoggedIn ? "Account Secured" : label;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <StepDot step={step} currentStep={currentStep} label={adjustedLabel} />
                  {idx < STEP_LABELS.length - 1 && <StepConnector filled={currentStep > step} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-xs font-semibold text-white/40 tracking-widest uppercase">Step</span>
          <p className="text-white font-bold text-lg leading-none">
            {currentStep}<span className="text-white/30 font-normal text-sm">/5</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div className="h-full bg-blue-action transition-all duration-500 ease-out" style={{ width: `${(currentStep / 5) * 100}%` }} />
      </div>
    </header>
  );
}