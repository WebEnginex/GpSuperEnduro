import { faqItems } from "@/data/faq";
import { siteConfig, venueConfig } from "@/data/site";
import { tickets } from "@/data/tickets";
import { getSiteUrl } from "@/lib/site-url";

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/images/logo/logo_SuperEnduro.png`,
    description: siteConfig.description,
  };
}

export function getWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    inLanguage: "fr-FR",
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function getSportsEventJsonLd() {
  const siteUrl = getSiteUrl();
  const lowestPrice = Math.min(...tickets.map((ticket) => ticket.prices.child));
  const highestPrice = Math.max(
    ...tickets.map((ticket) => ticket.prices.normal)
  );

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "GP SuperEnduro Paris — Championnat du monde 2027",
    description: siteConfig.description,
    image: [`${siteUrl}${siteConfig.ogImage}`],
    url: siteUrl,
    startDate: "2027-02-27T17:30:00+01:00",
    endDate: "2027-02-27T22:30:00+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: false,
    inLanguage: "fr-FR",
    sport: "Super Enduro",
    location: {
      "@type": "Place",
      name: venueConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venueConfig.street,
        addressLocality: venueConfig.city,
        postalCode: venueConfig.postalCode,
        addressCountry: venueConfig.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${siteUrl}/billeterie`,
      priceCurrency: "EUR",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
