"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/data/event";
import { faqItems } from "@/data/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FAQ } from "@/components/faq/FAQ";
import { EventButton } from "@/components/ui/EventButton";
import { useIsMounted } from "@/hooks/useIsMounted";

export function FAQSection() {
  const { faq } = eventConfig.sections;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={faq.title} subtitle={faq.subtitle} />
        <FAQ items={faqItems} />
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { newsletter } = eventConfig.sections;
  const isMounted = useIsMounted();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email });
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28 bg-background-alt">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle title={newsletter.title} subtitle={newsletter.subtitle} />
        <p className="text-muted mb-8 -mt-8">{newsletter.description}</p>
        <motion.form
          initial={isMounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            className="flex-1 bg-surface border border-line-strong rounded-sm px-4 py-3 text-foreground placeholder:text-subtle focus:outline-none focus:border-brand-red/50"
            required
          />
          <EventButton type="submit" size="md">
            {newsletter.button}
          </EventButton>
        </motion.form>
      </div>
    </section>
  );
}
