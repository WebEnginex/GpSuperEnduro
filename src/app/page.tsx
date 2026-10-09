import { AboutSection, EventInfoSection } from "@/components/sections/AboutSection";
import { TicketsPreviewSection } from "@/components/sections/TicketsPreviewSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqJsonLd, getSportsEventJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={getSportsEventJsonLd()} />
      <JsonLd data={getFaqJsonLd()} />
      <Hero />
      <AboutSection />
      <EventInfoSection />
      <TicketsPreviewSection />
      <CountdownSection />
      <PartnersSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
