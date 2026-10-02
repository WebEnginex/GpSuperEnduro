import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { BilleterieContent } from "./BilleterieContent";

export const metadata: Metadata = createMetadata({
  title: "Billetterie",
  description: `Réservez vos billets pour le GP SuperEnduro Paris 2027 à l'Arena Grand Paris. Catégories 1, 2 et 3 — tarifs Normal, Groupe et Enfant. Places limitées.`,
  path: "/billeterie",
  keywords: [
    ...siteConfig.keywords,
    "billets Super Enduro Paris",
    "tarifs Arena Grand Paris",
  ],
});

export default function BilleteriePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Billetterie", path: "/billeterie" },
        ])}
      />
      <BilleterieContent />
    </>
  );
}
