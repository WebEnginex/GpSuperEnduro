'use client';

import { useState, useEffect } from 'react';

export function SimpleCountdown() {
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
      <p className="text-white/90 text-lg mb-3 font-medium">
        Début de l&apos;événement dans :
      </p>
      <div className="flex justify-center items-center gap-4">
        {/* Jours */}
        <div className="text-center">
          <div className="text-red-600 text-4xl md:text-5xl font-bold">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-white/70 text-sm mt-1 tracking-wider">
            Jours
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="text-white text-3xl md:text-4xl font-bold mx-2">·</div>
        
        {/* Heures */}
        <div className="text-center">
          <div className="text-red-600 text-4xl md:text-5xl font-bold">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-white/70 text-sm mt-1 tracking-wider">
            Heures
          </div>
        </div>
        
        {/* Séparateur */}
        <div className="text-white text-3xl md:text-4xl font-bold mx-2">·</div>
        
        {/* Minutes */}
        <div className="text-center">
          <div className="text-red-600 text-4xl md:text-5xl font-bold">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-white/70 text-sm mt-1 tracking-wider">
            Minutes
          </div>
        </div>
      </div>
    </div>
  );
}
