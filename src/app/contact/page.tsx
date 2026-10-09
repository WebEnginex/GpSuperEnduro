import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, User } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { organizerInfo, contactPageLabels } from "@/data/contact";
import { pageMedia } from "@/data/pageMedia";
import { eventConfig } from "@/data/event";
import { faqItems } from "@/data/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { FAQ } from "@/components/faq/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Coordonnées et FAQ du GP SuperEnduro Paris. Arena Grand Paris, Tremblay-en-France — billets, accès et informations pratiques.`,
  path: "/contact",
  keywords: [
    ...siteConfig.keywords,
    "contact Super Enduro Paris",
    "Arena Grand Paris contact",
    "FAQ Super Enduro Paris",
  ],
});

export default function ContactPage() {
  const { faq } = eventConfig.sections;

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <div className="bg-background min-h-screen">
        <PageBanner {...pageMedia.contact} />

        <div className="pt-10 md:pt-14 pb-16 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={contactPageLabels.title}
            subtitle={contactPageLabels.subtitle}
            description={contactPageLabels.description}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="flex items-start gap-4 rounded-xl border border-line bg-surface p-4 sm:p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                    {contactPageLabels.email}
                  </p>
                  <p className="mt-1 break-all text-base font-medium text-foreground sm:text-lg">
                    {organizerInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-line bg-surface p-4 sm:p-5 shadow-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                    {contactPageLabels.organizer}
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground sm:text-lg">
                    {organizerInfo.name}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-surface p-4 sm:p-5 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                    <MapPin size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                      {contactPageLabels.venue}
                    </p>
                    <p className="mt-1 text-base font-medium text-foreground sm:text-lg">
                      {organizerInfo.venueName}
                    </p>
                    <div className="mt-2 space-y-0.5 text-sm leading-relaxed text-muted">
                      {organizerInfo.addressLines
                        .filter((line) => line !== organizerInfo.venueName)
                        .map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                    </div>
                    <a
                      href={organizerInfo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
                    >
                      {organizerInfo.mapsLabel}
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
                <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                  <p className="text-sm font-medium text-foreground">
                    {contactPageLabels.mapTitle}
                  </p>
                  <a
                    href={organizerInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden text-xs font-semibold uppercase tracking-wider text-brand-red transition-colors hover:text-brand-red-dark sm:inline-flex sm:items-center sm:gap-1"
                  >
                    Ouvrir
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
                <div className="aspect-[4/3] sm:aspect-video lg:aspect-[16/11] min-h-[240px]">
                  <iframe
                    title={`${organizerInfo.venueName} - carte`}
                    src="https://www.google.com/maps?q=Arena+Grand+Paris,+1+Avenue+de+la+Traversi%C3%A8re,+93290+Tremblay-en-France&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-line bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle title={faq.title} subtitle={faq.subtitle} />
            <FAQ items={faqItems} />
          </div>
        </section>
      </div>
    </>
  );
}
