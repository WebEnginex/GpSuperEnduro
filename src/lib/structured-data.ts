import { faqItems } from "@/data/faq";
import { socialLinks } from "@/data/navigation";
import { siteConfig, venueConfig } from "@/data/site";
import { organizerInfo } from "@/data/contact";
import { tickets } from "@/data/tickets";
import { getSiteUrl } from "@/lib/site-url";

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: [
      "Super Enduro Paris",
      "GP SuperEnduro",
      "Paris Super Enduro",
    ],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo/logo_SuperEnduro.png`,
    },
    image: `${siteUrl}${siteConfig.ogImage}`,
    description: siteConfig.description,
    email: organizerInfo.email,
    sameAs: socialLinks.map((link) => link.href.split("?")[0]),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: organizerInfo.email,
      availableLanguage: ["French"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: venueConfig.street,
      addressLocality: venueConfig.city,
      postalCode: venueConfig.postalCode,
      addressCountry: venueConfig.country,
    },
  };
}

export function getWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    inLanguage: "fr-FR",
    description: siteConfig.description,
    publisher: {
      "@id": `${siteUrl}/#organization`,
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
    image: [
      `${siteUrl}${siteConfig.ogImage}`,
      `${siteUrl}/images/logo/logo_SuperEnduro.png`,
    ],
    url: siteUrl,
    startDate: "2027-02-27T17:30:00+01:00",
    endDate: "2027-02-27T22:30:00+01:00",
    doorTime: "2027-02-27T17:30:00+01:00",
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
      logo: `${siteUrl}/images/logo/logo_SuperEnduro.png`,
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${siteUrl}/billetterie`,
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
