"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { ScheduleItem } from "@/types";
import { cn } from "@/lib/cn";
import { useIsMounted } from "@/hooks/useIsMounted";

interface ScheduleTimelineProps {
  items: ScheduleItem[];
}

export function ScheduleTimeline({ items }: ScheduleTimelineProps) {
  const isMounted = useIsMounted();

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-line-strong" />

      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            initial={isMounted ? { opacity: 0, x: -20 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="relative pl-16 md:pl-20"
          >
            <div
              className={cn(
                "absolute left-3 md:left-5 top-6 w-6 h-6 rounded-full border-2 flex items-center justify-center",
                item.highlight
                  ? "border-brand-red bg-brand-red/20"
                  : "border-line-strong bg-surface"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  item.highlight ? "bg-brand-red" : "bg-foreground/40"
                )}
              />
            </div>

            <div
              className={cn(
                "bg-surface border rounded-lg p-5 md:p-6 transition-colors",
                item.highlight
                  ? "border-brand-red/30 shadow-lg shadow-brand-red/10"
                  : "border-line shadow-card hover:border-line-strong"
              )}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold uppercase tracking-widest">
                  <Clock size={14} aria-hidden="true" />
                  {item.time}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
