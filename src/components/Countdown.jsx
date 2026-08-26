import React, { useState, useEffect } from 'react';

export const Countdown = () => {
  const targetDate = new Date('2026-09-19T09:00:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num) => {
    return num.toString().padStart(2, '0');
  };

  const units = [
    { label: 'DAYS', value: formatDigit(timeLeft.days) },
    { label: 'HOURS', value: formatDigit(timeLeft.hours) },
    { label: 'MINUTES', value: formatDigit(timeLeft.minutes) },
    { label: 'SECONDS', value: formatDigit(timeLeft.seconds) },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 my-6">
      {units.map((unit, idx) => (
        <React.Fragment key={unit.label}>
          {/* Stone Tablet Unit Container */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              {/* LEGO top studs overlay on tablet top */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                <div className="w-2.5 h-1.5 bg-[#3A3049] rounded-t-sm border-t border-x border-[#4A3E5C]"></div>
                <div className="w-2.5 h-1.5 bg-[#3A3049] rounded-t-sm border-t border-x border-[#4A3E5C]"></div>
              </div>

              <div className="w-16 sm:w-20 md:w-24 h-20 sm:h-24 md:h-28 bg-[#181222]/90 border border-[#3A3049] rounded-xl flex items-center justify-center shadow-xl shadow-black/60 group-hover:border-[#7C3AED]/60 transition-colors">
                <span className="font-mono font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-widest drop-shadow-[0_2px_10px_rgba(124,58,237,0.4)]">
                  {unit.value}
                </span>
              </div>
            </div>
            <span className="mt-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
              {unit.label}
            </span>
          </div>

          {/* Separator dots */}
          {idx < units.length - 1 && (
            <div className="flex flex-col gap-1 text-[#7C3AED] font-bold text-xl sm:text-2xl pb-6">
              <span className="animate-pulse">:</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
