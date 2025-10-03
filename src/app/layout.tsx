import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Racing_Sans_One } from "next/font/google";
import "./globals.css";
import { ConditionalHeader } from "@/components/conditional-header";
import { Footer } from "@/components/footer";
import { CacheInitializer } from "@/components/CacheInitializer";
import { AutoCacheProvider } from "@/components/AutoCacheProvider";
import { BackgroundPreloader } from "@/components/BackgroundPreloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const racingSansOne = Racing_Sans_One({
  variable: "--font-racing-sans-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Grand Prix Super Enduro 2026 | 7 Mars 2026 à Douai",
  description: "Grand Prix Super Enduro 2026 en intérieur le 7 Mars 2026 à Gayant Expo Douai. Spectacle exceptionnel avec les meilleurs pilotes internationaux de SuperEnduro.",
  keywords: "Grand Prix Super Enduro, Douai, 2026, indoor, enduro, pilotes internationaux, Gayant Expo, sport moto",
  authors: [{ name: "GP Super Enduro France" }],
  openGraph: {
    title: "Grand Prix Super Enduro 2026 - 7 Mars à Douai",
    description: "Grand Prix Super Enduro 2026 en intérieur à Gayant Expo Douai le 7 Mars 2026",
    type: "website",
    locale: "fr_FR",
    siteName: "GP Super Enduro France",
    url: "https://www.gpsuperendurofrance.fr/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Prix Super Enduro 2026",
    description: "7 Mars 2026 à Gayant Expo Douai - Grand Prix Super Enduro en intérieur",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [
      { rel: "android-chrome", url: "/icons/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/icons/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsEvent",
              "name": "Grand Prix Super Enduro 2026",
              "description": "Grand Prix Super Enduro 2026 en intérieur à Gayant Expo Douai",
              "startDate": "2026-03-07T17:30:00+01:00",
              "endDate": "2026-03-07T23:00:00+01:00",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Gayant Expo Concerts",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Rives de Gayant",
                  "addressLocality": "Douai",
                  "postalCode": "59500",
                  "addressCountry": "FR"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Douai Gayant Expo",
                "url": "https://www.gpsuperendurofrance.fr/"
              },
              "sport": "SuperEnduro",
              "url": "https://www.gpsuperendurofrance.fr/",
              "image": "https://www.gpsuperendurofrance.fr/images/logos/SuperEnduro-logo.png",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "url": "https://www.gpsuperendurofrance.fr/billeterie",
                "validFrom": "2025-10-06"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${racingSansOne.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
        style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh' }}
      >
        <CacheInitializer />
        <BackgroundPreloader />
        <AutoCacheProvider />
        <ConditionalHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
