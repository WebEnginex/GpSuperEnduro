import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Grand Prix Super Enduro 2026 | Organisation Douai",
  description: "Contactez l'organisation du Grand Prix Super Enduro 2026 à Douai. Questions sur l'événement du 7 Mars à Gayant Expo, billeterie et informations pratiques.",
  keywords: "contact, organisation, Grand Prix Super Enduro 2026, Douai, Gayant Expo, questions",
  openGraph: {
    title: "Contact Grand Prix Super Enduro 2026",
    description: "Contactez l'organisation pour l'événement du 7 Mars à Douai",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}