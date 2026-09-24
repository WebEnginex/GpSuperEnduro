import { TicketCard } from "@/components/tickets/TicketCard";
import { tickets, ticketsPageLabels } from "@/data/tickets";
import { pageMedia } from "@/data/pageMedia";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageBanner } from "@/components/ui/PageBanner";

export function BilleterieContent() {
  return (
    <div className="bg-background min-h-[100dvh]">
      <PageBanner {...pageMedia.billeterie} />

      <div className="pt-10 md:pt-12 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={ticketsPageLabels.title}
          subtitle={ticketsPageLabels.subtitle}
          description={ticketsPageLabels.description}
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

        <div className="mt-10 md:mt-12 max-w-2xl mx-auto text-center space-y-4">
          <p className="text-xs sm:text-sm text-subtle tracking-wide">
            {ticketsPageLabels.trustItems.join(" · ")}
          </p>
          <p className="text-subtle text-sm leading-relaxed px-2">
            {ticketsPageLabels.externalNote}
          </p>
        </div>
      </div>
    </div>
  );
}
