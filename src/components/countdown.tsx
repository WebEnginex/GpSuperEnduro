'use client';

import { useState, useEffect } from 'react';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
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
      <p className="text-white/90 text-sm mb-6 font-medium">
        Début de l&apos;événement dans :
      </p>
      <div className="flex justify-center items-end space-x-8">
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-white/80 font-medium uppercase tracking-wider">
            Jours
          </div>
        </div>
        
        <div className="text-white/60 text-3xl font-light mb-4">:</div>
        
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-white/80 font-medium uppercase tracking-wider">
            Heures
          </div>
        </div>
        
        <div className="text-white/60 text-3xl font-light mb-4">:</div>
        
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-white/80 font-medium uppercase tracking-wider">
            Minutes
          </div>
        </div>
      </div>
    </div>
  );
}
