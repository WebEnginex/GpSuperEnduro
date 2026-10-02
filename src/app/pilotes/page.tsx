import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { RidersPageContent } from "../riders/RidersPageContent";

export const metadata: Metadata = createMetadata({
  title: "Pilotes",
  description: `Découvrez le plateau Prestige du GP SuperEnduro Paris 2027 : Billy Bolt et les meilleurs pilotes du Championnat du monde de Super Enduro.`,
  path: "/pilotes",
  keywords: [
    ...siteConfig.keywords,
    "pilotes Super Enduro",
    "Billy Bolt",
    "plateau Prestige",
  ],
});

export default function PilotesPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Pilotes", path: "/pilotes" },
        ])}
      />
      <RidersPageContent />
    </>
  );
}
