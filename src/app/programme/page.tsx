import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { ProgrammePageContent } from "./ProgrammePageContent";

export const metadata: Metadata = createMetadata({
  title: "Programme",
  description: `Programme du GP SuperEnduro Paris — Championnat du monde 2027. Horaires de la soirée du 27 février à l'Arena Grand Paris : dédicaces, SuperPole, courses et finales.`,
  path: "/programme",
  keywords: [
    ...siteConfig.keywords,
    "programme Super Enduro",
    "horaires GP SuperEnduro Paris",
  ],
});

export default function ProgrammePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Programme", path: "/programme" },
        ])}
      />
      <ProgrammePageContent />
    </>
  );
}
