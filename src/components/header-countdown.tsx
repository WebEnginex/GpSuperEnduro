'use client';

import { useState, useEffect } from 'react';

export function HeaderCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-10-04T13:30:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <p className="text-white/90 text-xs mb-2 font-medium">
        Début de l&apos;événement dans :
      </p>
      <div className="flex space-x-3">
        <div className="bg-black/30 backdrop-blur-sm rounded px-3 py-2 min-w-[60px]">
          <div className="text-lg font-bold text-white">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] text-white/70 uppercase">Jours</div>
        </div>
        <div className="bg-black/30 backdrop-blur-sm rounded px-3 py-2 min-w-[60px]">
          <div className="text-lg font-bold text-white">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] text-white/70 uppercase">Heures</div>
        </div>
        <div className="bg-black/30 backdrop-blur-sm rounded px-3 py-2 min-w-[60px]">
          <div className="text-lg font-bold text-white">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] text-white/70 uppercase">Minutes</div>
        </div>
      </div>
    </div>
  );
}
