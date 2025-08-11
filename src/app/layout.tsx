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
  title: "Supercross de Douai",
  description: "L'événement incontournable de supercross en France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
