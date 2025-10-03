import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programme Grand Prix Super Enduro 2026 | 7 Mars à Douai",
  description: "Programme complet du Grand Prix Super Enduro 2026 le 7 Mars à Gayant Expo Douai. Pass Premium dès 13h, autres catégories dès 17h30. Horaires des qualifications et finales.",
  keywords: "programme, horaires, Grand Prix Super Enduro 2026, Douai, Pass Premium, qualifications, finales",
  openGraph: {
    title: "Programme Grand Prix Super Enduro 2026",
    description: "Programme du 7 Mars 2026 à Gayant Expo Douai",
    type: "website",
  },
};

export default function ProgrammeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}