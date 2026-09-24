"use client";

import { eventConfig } from "@/data/event";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Countdown } from "@/components/countdown/Countdown";

export function CountdownSection() {
  const { countdown } = eventConfig.sections;

  return (
    <section className="py-20 md:py-28 bg-background-alt relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle title={countdown.title} subtitle={countdown.subtitle} />
        <Countdown />
      </div>
    </section>
  );
}
