import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { BilletterieContent } from "./BilletterieContent";

export const metadata: Metadata = createMetadata({
  title: "Billetterie",
  description: `Réservez vos billets pour le GP SuperEnduro Paris 2027 à l'Arena Grand Paris. Catégories 1, 2 et 3 — tarifs Normal, Groupe et Enfant. Places limitées.`,
  path: "/billetterie",
  keywords: [
    ...siteConfig.keywords,
    "billets Super Enduro Paris",
    "tarifs Arena Grand Paris",
  ],
});

export default function BilletteriePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Billetterie", path: "/billetterie" },
        ])}
      />
      <BilletterieContent />
    </>
  );
}
