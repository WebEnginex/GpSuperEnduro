"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { eventConfig } from "@/data/event";
import { EventButton } from "@/components/ui/EventButton";
import { useIsMounted } from "@/hooks/useIsMounted";

export function Hero() {
  const { hero } = eventConfig;
  const isMounted = useIsMounted();

  return (
    <section className="theme-dark relative min-h-screen min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={hero.posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={hero.videoSrc} type="video/webm" />
          <source src={hero.videoSrcMp4} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <motion.div
          initial={isMounted ? { opacity: 0, y: 40 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl w-full"
        >
          <p className="text-brand-red text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-4">
            {hero.subtitle}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-3">
            {hero.title}
          </h1>
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-brand-red tracking-wide leading-none mb-6">
            {hero.titleAccent}
          </p>
          <p className="text-zinc-300 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EventButton href={hero.primaryButton.href} size="lg">
              {hero.primaryButton.label}
            </EventButton>
            <EventButton href={hero.secondaryButton.href} variant="outline" size="lg">
              {hero.secondaryButton.label}
            </EventButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={isMounted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-zinc-400 text-xs uppercase tracking-widest">
            {hero.scrollLabel}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-white/60" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
