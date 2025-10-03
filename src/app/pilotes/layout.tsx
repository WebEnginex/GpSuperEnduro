import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilotes Grand Prix Super Enduro 2026 | Les participants",
  description: "Découvrez les pilotes du Grand Prix Super Enduro 2026 à Douai le 7 Mars. Profils des meilleurs pilotes internationaux de SuperEnduro indoor avec leurs équipes.",
  keywords: "pilotes, Grand Prix Super Enduro 2026, participants, équipes, indoor, Douai",
  openGraph: {
    title: "Pilotes Grand Prix Super Enduro 2026",
    description: "Les pilotes du Grand Prix à Gayant Expo Douai le 7 Mars 2026",
    type: "website",
  },
};

export default function PilotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}