import { ChevronLeft, ChevronRight } from 'lucide-react';
import { STEP_LABELS } from '../../config/bookingConfig';

export default function BookingFooter({
  currentStep,
  prevStep,
  nextStep,
  handleFinalSubmit,
  isSubmitting,
  isContinueDisabled,
}) {
  return (
    <footer className="flex-shrink-0 bg-gray-dark border-t border-border-dark">
      <div className="flex items-center justify-between h-20 px-6 sm:px-10 lg:px-16 xl:px-36 gap-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 sm:px-10 lg:px-14 py-3 rounded-2xl font-semibold text-base lg:text-lg border transition-all duration-200 h-12 lg:h-14
            ${currentStep === 1 ? 'border-white/5 text-white/20 bg-white/5 cursor-not-allowed' : 'border-blue-action/40 text-blue-action bg-blue-action/10 hover:bg-blue-action/20 hover:border-blue-action active:scale-95'}`}
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        <p className="hidden lg:block text-white/30 text-sm font-medium tracking-wide">
          {STEP_LABELS[currentStep - 1]?.label}
        </p>

        <button
          onClick={currentStep === 5 ? handleFinalSubmit : nextStep}
          disabled={isContinueDisabled || isSubmitting}
          className={`flex items-center gap-2 px-6 sm:px-10 lg:px-14 py-3 rounded-2xl font-semibold text-base lg:text-lg h-12 lg:h-14 transition-all duration-200
            ${isContinueDisabled || isSubmitting ? 'bg-blue-action/30 text-navy-deep/40 cursor-not-allowed' : 'bg-blue-action text-navy-deep hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(0,200,255,0.25)]'}`}
        >
          {isSubmitting
            ? 'Processing…'
            : currentStep === 5
              ? 'Confirm Booking'
              : 'Continue'}
          {!isSubmitting && <ChevronRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </footer>
  );
}
