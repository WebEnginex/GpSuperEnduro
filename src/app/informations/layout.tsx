import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infos pratiques Grand Prix Super Enduro 2026 | Gayant Expo Douai",
  description: "Informations pratiques pour le Grand Prix Super Enduro 2026 le 7 Mars à Gayant Expo Douai : accès, parking, horaires, restauration et FAQ.",
  keywords: "informations pratiques, Gayant Expo Douai, accès, parking, FAQ, Grand Prix Super Enduro 2026",
  openGraph: {
    title: "Infos pratiques Grand Prix Super Enduro 2026",
    description: "Guide pour le 7 Mars 2026 à Gayant Expo Douai",
    type: "website",
  },
};

export default function InformationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}