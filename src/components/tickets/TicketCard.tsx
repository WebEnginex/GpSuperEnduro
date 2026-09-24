"use client";

import type { Ticket } from "@/types";
import { ticketsPageLabels } from "@/data/tickets";
import { cn } from "@/lib/cn";
import { ExternalLink } from "lucide-react";

function formatPrice(amount: number): string {
  return `${amount}\u00a0€`;
}

interface TicketCardProps {
  ticket: Ticket;
  className?: string;
}

export function TicketCard({ ticket, className }: TicketCardProps) {
  const { priceLabels, priceNotes, cta } = ticketsPageLabels;
  const isFeatured = Boolean(ticket.featured);

  const secondaryPrices = [
    {
      key: "group" as const,
      label: priceLabels.group,
      note: priceNotes.group,
      amount: ticket.prices.group,
    },
    {
      key: "child" as const,
      label: priceLabels.child,
      note: priceNotes.child,
      amount: ticket.prices.child,
    },
  ];

  const trackClick = () => {
    void fetch("/api/track/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: ticket.id,
        ticketName: ticket.name,
      }),
      keepalive: true,
    }).catch(() => undefined);
  };

  return (
    <article
      className={cn(
        "relative flex flex-col h-full rounded-lg overflow-hidden border bg-surface shadow-card",
        isFeatured ? "border-brand-red/40" : "border-line",
        className
      )}
    >
      <div
        className={cn("h-0.5 w-full", isFeatured ? "bg-brand-red" : "bg-line")}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {ticket.badge ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-red mb-3">
            {ticket.badge}
          </p>
        ) : (
          <div className="hidden md:block h-[1.125rem] mb-3" aria-hidden="true" />
        )}

        <h3 className="font-display text-2xl sm:text-[1.65rem] font-bold text-foreground tracking-tight">
          {ticket.name}
        </h3>

        <p className="mt-2 text-muted text-sm leading-relaxed">
          {ticket.description}
        </p>

        <div className="mt-6 mb-5">
          <div className="flex items-end justify-between gap-3 border-b border-line pb-4">
            <span className="text-xs uppercase tracking-widest text-subtle">
              {priceLabels.normal}
            </span>
            <span
              className={cn(
                "font-display text-3xl sm:text-4xl font-bold tabular-nums leading-none",
                isFeatured ? "text-brand-red" : "text-foreground"
              )}
            >
              {formatPrice(ticket.prices.normal)}
            </span>
          </div>

          <ul className="mt-1">
            {secondaryPrices.map((row) => (
              <li
                key={row.key}
                className="flex items-baseline justify-between gap-3 py-2.5 border-b border-line last:border-0"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-foreground/85">{row.label}</span>
                  <span className="block text-xs text-subtle mt-0.5">
                    {row.note}
                  </span>
                </span>
                <span className="font-display text-lg font-semibold text-foreground tabular-nums shrink-0">
                  {formatPrice(row.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={ticket.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick}
          className={cn(
            "mt-auto inline-flex items-center justify-center gap-2 w-full py-3 px-4 font-semibold text-sm uppercase tracking-widest rounded-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isFeatured
              ? "bg-brand-red text-white hover:bg-brand-red-dark"
              : "border border-line-strong text-foreground hover:border-foreground/50 hover:bg-foreground/[0.04]"
          )}
          aria-label={`${cta} ${ticket.name}`}
        >
          {cta}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
