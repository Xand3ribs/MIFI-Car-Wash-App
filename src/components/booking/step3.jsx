import { useMemo } from 'react';
import { Calendar, Clock, Ban } from 'lucide-react';

const TIME_SLOTS = [
  { label: '9:00 AM', hour: 9 },
  { label: '10:00 AM', hour: 10 },
  { label: '11:00 AM', hour: 11 },
  { label: '12:00 PM', hour: 12 },
  { label: '1:00 PM', hour: 13 },
  { label: '2:00 PM', hour: 14 },
  { label: '3:00 PM', hour: 15 },
  { label: '4:00 PM', hour: 16 },
  { label: '5:00 PM', hour: 17 },
];

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function Step3({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) {
  const today = getTodayString();
  const minDate = today;

  const slotStates = useMemo(() => {
    const isToday = selectedDate === today;
    const currentHour = new Date().getHours();

    return TIME_SLOTS.map((slot) => {
      // Corrected logical state matching
      const isPast = isToday && slot.hour <= currentHour;
      return {
        ...slot,
        disabled: isPast,
      };
    });
  }, [selectedDate, today]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    if (newDate === today && selectedTime) {
      const slot = TIME_SLOTS.find((s) => s.label === selectedTime);
      const currentHour = new Date().getHours();
      if (slot && slot.hour <= currentHour) {
        setSelectedTime(null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-tight">
          When works for you?
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          Pick your perfect date and time slot
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Date picker */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/60 uppercase tracking-widest">
            <Calendar size={13} />
            Date
          </label>

          <input
            type="date"
            min={minDate}
            value={selectedDate ?? ''}
            onChange={handleDateChange}
            className="w-full bg-gray-dark border border-border-dark rounded-2xl
              px-4 py-4 text-white text-base
              focus:border-blue-action/70 focus:outline-none
              transition-colors duration-200
              [color-scheme:dark]"
          />

          {selectedDate === today && (
            <p className="flex items-center gap-1.5 text-xs text-amber-400/80 pl-1 animate-[fadeIn_0.2s_ease_both]">
              <Clock size={11} />
              Showing today — past time slots are unavailable
            </p>
          )}
        </div>

        {/* Time slot grid */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-white/60 uppercase tracking-widest">
            <Clock size={13} />
            Time Slot
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slotStates.map(({ label, disabled }) => {
              const isSelected = selectedTime === label;

              return (
                <button
                  key={label}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setSelectedTime(label)}
                  className={`
                    relative flex items-center justify-center gap-2
                    px-4 py-4 rounded-2xl border text-base font-medium
                    transition-all duration-200
                    ${
                      disabled
                        ? // FIXED: Proper arbitrary Tailwind transparency syntax and global pointer block
                          'bg-white/[0.02] border-white/5 text-white/20 opacity-40 cursor-not-allowed pointer-events-none'
                        : isSelected
                          ? 'bg-blue-action border-blue-action text-navy-deep font-bold shadow-[0_0_18px_rgba(0,200,255,0.25)]'
                          : 'bg-gray-dark border-border-dark text-white hover:border-blue-action/60 hover:bg-white/5 active:scale-95 cursor-pointer'
                    }
                  `}
                >
                  {disabled && (
                    <Ban size={12} className="text-white/40 shrink-0" />
                  )}
                  <span
                    className={
                      disabled ? 'line-through decoration-white/20' : ''
                    }
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedDate === today && slotStates.every((s) => s.disabled) && (
            <div className="flex items-center gap-3 px-4 py-3.5 mt-1 rounded-2xl bg-amber-500/10 border border-amber-500/20 animate-[fadeIn_0.25s_ease_both]">
              <Ban size={15} className="text-amber-400 shrink-0" />
              <p className="text-sm text-amber-400/80">
                No slots remain for today. Please select a future date.
              </p>
            </div>
          )}
        </div>

        {selectedDate && selectedTime && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-blue-action/10 border border-blue-action/30 animate-[fadeIn_0.25s_ease_both]">
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold text-blue-action uppercase tracking-wider">
                Appointment Scheduled
              </p>
              <p className="text-white font-semibold">
                {selectedDate} &nbsp;·&nbsp; {selectedTime}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step3;
