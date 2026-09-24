"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRidersByCategory, riderCategories, ridersPageLabels } from "@/data/riders";
import { pageMedia } from "@/data/pageMedia";
import type { RiderCategory } from "@/types";
import { RiderCard } from "@/components/riders/RiderCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { cn } from "@/lib/cn";
import { useIsMounted } from "@/hooks/useIsMounted";

export function RidersPageContent() {
  const [activeCategory, setActiveCategory] = useState<RiderCategory>("prestige");
  const isMounted = useIsMounted();

  const visibleRiders = useMemo(
    () => getRidersByCategory(activeCategory),
    [activeCategory]
  );

  const featuredRiders = visibleRiders.slice(0, 3);
  const gridRiders = visibleRiders.slice(3);

  return (
    <div className="bg-background min-h-[100dvh]">
      <PageBanner {...pageMedia.pilotes} />

      <div className="relative pt-10 md:pt-12 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={ridersPageLabels.title}
          subtitle={ridersPageLabels.subtitle}
        />

        <div
          className="flex justify-center mb-8 sm:mb-10 md:mb-14"
          role="tablist"
          aria-label="Catégories de pilotes"
        >
          <div className="inline-flex w-full max-w-md sm:w-auto sm:max-w-none p-1 border border-line bg-surface shadow-card">
            {riderCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "relative flex-1 sm:flex-none min-w-0 sm:min-w-[8rem] px-4 sm:px-6 py-2.5 sm:py-3",
                    "text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-colors",
                    isActive ? "text-white" : "text-subtle hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="rider-category-pill"
                      className="absolute inset-0 bg-brand-red"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {visibleRiders.length === 0 ? (
          <p className="text-center text-muted py-16">
            {ridersPageLabels.emptyState}
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={isMounted ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-2 sm:space-y-2.5 md:space-y-3"
            >
              <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
                <div
                  className={cn(
                    "group/grid flex gap-2 sm:grid sm:grid-cols-3 sm:gap-2.5 md:gap-3",
                    "overflow-x-auto snap-x snap-mandatory sm:overflow-visible",
                    "pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  )}
                >
                  {featuredRiders.map((rider, index) => (
                    <RiderCard
                      key={rider.id}
                      rider={rider}
                      index={index}
                      featured
                      priority
                      className="w-[78%] max-w-[20rem] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
                    />
                  ))}
                </div>
              </div>

              {gridRiders.length > 0 && (
                <div className="group/grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3">
                  {gridRiders.map((rider, index) => (
                    <RiderCard
                      key={rider.id}
                      rider={rider}
                      index={index + featuredRiders.length}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
