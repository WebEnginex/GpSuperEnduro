import { eventConfig } from "@/data/event";
import { partners } from "@/data/partners";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerLogo } from "@/components/partners/PartnerLogo";

export function PartnersSection() {
  const { partners: partnersSection } = eventConfig.sections;

  return (
    <section className="theme-dark pb-20 md:pb-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 border-t border-line">
        <SectionTitle title={partnersSection.title} subtitle={partnersSection.subtitle} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <PartnerLogo
              key={partner.id}
              name={partner.name}
              logoSrc={partner.logoSrc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
