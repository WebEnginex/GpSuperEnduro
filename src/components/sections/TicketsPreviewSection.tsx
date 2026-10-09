import { TicketCard } from "@/components/tickets/TicketCard";
import { tickets, ticketsPreviewLabels } from "@/data/tickets";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EventButton } from "@/components/ui/EventButton";

export function TicketsPreviewSection() {
  return (
    <section id="billetterie" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={ticketsPreviewLabels.title}
          subtitle={ticketsPreviewLabels.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 lg:items-stretch max-w-5xl mx-auto">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              className={
                ticket.tier === "category3"
                  ? "sm:col-span-2 sm:max-w-md sm:mx-auto lg:col-span-1 lg:max-w-none"
                  : undefined
              }
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <EventButton href="/billetterie" variant="outline" size="lg">
            {ticketsPreviewLabels.viewAll}
          </EventButton>
        </div>
      </div>
    </section>
  );
}
