"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event";
import { countdownLabels } from "@/data/ui";
import { useIsMounted } from "@/hooks/useIsMounted";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const INITIAL_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const units = [
  { key: "days" as const, label: countdownLabels.days },
  { key: "hours" as const, label: countdownLabels.hours },
  { key: "minutes" as const, label: countdownLabels.minutes },
  { key: "seconds" as const, label: countdownLabels.seconds },
];

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;

    const update = () => {
      setTimeLeft(calculateTimeLeft(eventConfig.countdownTargetDate));
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [isMounted]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
      {units.map((unit, index) => (
        <motion.div
          key={unit.key}
          initial={isMounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative bg-surface border border-line shadow-card rounded-lg p-4 md:p-6 text-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tabular-nums"
            suppressHydrationWarning
          >
            {isMounted
              ? String(timeLeft[unit.key]).padStart(2, "0")
              : "--"}
          </span>
          <p className="text-muted text-xs md:text-sm uppercase tracking-widest mt-2">
            {unit.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
