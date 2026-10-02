import type { Metadata } from "next";
import { Mail, MapPin, User } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { organizerInfo, contactPageLabels } from "@/data/contact";
import { pageMedia } from "@/data/pageMedia";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Contactez les organisateurs du GP SuperEnduro Paris. Arena Grand Paris, Tremblay-en-France — billets, presse, partenariats et informations pratiques.`,
  path: "/contact",
  keywords: [
    ...siteConfig.keywords,
    "contact Super Enduro Paris",
    "Arena Grand Paris contact",
  ],
});

export default function ContactPage() {
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

        <div className="pt-10 md:pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={contactPageLabels.title}
            subtitle={contactPageLabels.subtitle}
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand-red/10 flex items-center justify-center shrink-0">
                  <User size={20} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">
                    {contactPageLabels.organizer}
                  </h3>
                  <p className="text-muted">{organizerInfo.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand-red/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">
                    {contactPageLabels.email}
                  </h3>
                  <p className="text-muted">{organizerInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-brand-red/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">
                    {contactPageLabels.venue}
                  </h3>
                  <p className="text-foreground font-medium mb-1">
                    {organizerInfo.venueName}
                  </p>
                  <p className="text-muted">{organizerInfo.address}</p>
                  <a
                    href={organizerInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-brand-red hover:text-brand-red-dark transition-colors"
                  >
                    {organizerInfo.mapsLabel}
                  </a>
                </div>
              </div>

              <div className="aspect-video bg-surface border border-line shadow-card rounded-lg overflow-hidden">
                <iframe
                  title={`${organizerInfo.venueName} - carte`}
                  src="https://www.google.com/maps?q=Arena+Grand+Paris,+1+Avenue+de+la+Traversi%C3%A8re,+93290+Tremblay-en-France&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="bg-surface border border-line shadow-card rounded-lg p-6 md:p-8">
              <h3 className="text-foreground font-display text-xl font-bold mb-6">
                {contactPageLabels.sendMessage}
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
