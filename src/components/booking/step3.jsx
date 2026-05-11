import React from 'react';

function Step3({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) {

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <div className="flex flex-col">

      <div className="mb-8 lg:mb-10">

        <h1 className="text-[2rem] lg:text-[3rem] text-white">
          When works for you?
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          Pick your perfect time
        </p>

      </div>

      {/* date and time selection */}
      <div className="flex flex-col gap-6 
      [&>div]:flex [&>div]:flex-col [&>div]:gap-3
      [&_label]:flex [&_label]:items-center [&_label]:gap-2 [&_label]:text-text-secondary [&_label]:text-lg">
        
        {/* Date Selection */}
        <div>
          <label>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            Date
          </label>

          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input w-full bg-gray-dark border border-border-dark rounded-2xl p-4 text-white focus:border-blue-action 
                outline-none transition-colors" 
          />
        </div>

        {/* Time Selection */}
        <div>
          <label>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            Time Slot
          </label>

          <div className="grid grid-cols-3 gap-3">

            {timeSlots.map((time) => {

              const isSelected = selectedTime === time;

              return (

                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`
                    flex items-center justify-center p-4 rounded-2xl border text-lg transition-all duration-200
                    ${isSelected 
                      
                        ? 'bg-blue-action text-navy-deep border-blue-action'
                        : 'bg-gray-dark text-white border-border-dark hover:border-blue-action active:scale-95'
                    }
                  `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3;