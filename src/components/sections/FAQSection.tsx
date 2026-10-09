"use client";

import { eventConfig } from "@/data/event";
import { faqItems } from "@/data/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FAQ } from "@/components/faq/FAQ";

export function FAQSection() {
  const { faq } = eventConfig.sections;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title={faq.title} subtitle={faq.subtitle} />
        <FAQ items={faqItems} />
      </div>
    </section>
  );
}
