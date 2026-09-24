"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  List,
  Car,
  Star,
  Utensils,
  ShoppingBag,
} from "lucide-react";
import { eventConfig, eventInfoCards } from "@/data/event";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useIsMounted } from "@/hooks/useIsMounted";

const iconMap = {
  calendar: Calendar,
  "map-pin": MapPin,
  clock: Clock,
  list: List,
  car: Car,
  star: Star,
  utensils: Utensils,
  "shopping-bag": ShoppingBag,
};

export function AboutSection() {
  const { about } = eventConfig;
  const isMounted = useIsMounted();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={about.title} subtitle={about.subtitle} />

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          <motion.div
            initial={isMounted ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            <div className="space-y-5 sm:space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted leading-relaxed text-sm sm:text-base md:text-[1.05rem] md:leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative w-full overflow-hidden rounded-sm bg-surface ring-1 ring-line shadow-card aspect-[16/11] sm:aspect-[16/10]">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {about.stats.map((stat, index) => {
              const details =
                "details" in stat && Array.isArray(stat.details)
                  ? stat.details
                  : null;
              const isWide = Boolean(details) || stat.value.includes("→");

              return (
                <motion.div
                  key={stat.label}
                  initial={isMounted ? { opacity: 0, y: 20 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={isWide ? "sm:col-span-2" : undefined}
                >
                  <SurfaceCard className="text-center h-full flex flex-col justify-center p-4 sm:p-6 md:p-8">
                    <p
                      className={
                        isWide
                          ? "font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-red mb-2 leading-tight"
                          : "font-display text-2xl md:text-3xl font-bold text-brand-red mb-1"
                      }
                    >
                      {stat.value}
                    </p>
                    {details ? (
                      <ul className="mt-1 space-y-1.5 sm:space-y-2">
                        {details.map((detail) => (
                          <li
                            key={detail}
                            className="text-muted text-xs sm:text-sm leading-snug px-1"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted text-xs sm:text-sm uppercase tracking-widest">
                        {stat.label}
                      </p>
                    )}
                  </SurfaceCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventInfoSection() {
  const isMounted = useIsMounted();

  return (
    <section id="informations" className="py-20 md:py-28 bg-background-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={eventConfig.sections.eventInfo.title}
          subtitle={eventConfig.sections.eventInfo.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {eventInfoCards.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={card.id}
                initial={isMounted ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <SurfaceCard className="h-full">
                  <div className="w-10 h-10 rounded-sm bg-brand-red/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-brand-red" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">{card.title}</h3>
                  <p className="text-foreground text-lg font-display mb-2">
                    {card.value}
                  </p>
                  <p className="text-subtle text-sm">{card.description}</p>
                </SurfaceCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
