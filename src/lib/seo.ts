import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

interface PageSEO {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
  keywords?: readonly string[];
}

export function createMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  ogImage,
  keywords,
}: PageSEO): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const fullTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const imagePath = ogImage ?? siteConfig.ogImage;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteUrl}${imagePath}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    applicationName: siteConfig.name,
    keywords: [...(keywords ?? siteConfig.keywords)],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "sports",
    alternates: {
      canonical: url,
      languages: {
        "fr-FR": url,
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false, noimageindex: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.ogImageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
