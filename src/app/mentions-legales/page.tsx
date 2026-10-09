import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig, venueConfig } from "@/data/site";
import { organizerInfo } from "@/data/contact";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name}.`,
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ])}
      />
      <div className="bg-background min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <SectionTitle
            title="Mentions légales"
            subtitle="Informations légales"
            align="left"
          />

          <div className="space-y-10 text-sm leading-relaxed text-muted sm:text-[15px]">
            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Éditeur du site
              </h3>
              <p>
                Le site <strong className="text-foreground">{siteConfig.url.replace(/^https?:\/\//, "")}</strong>{" "}
                est édité dans le cadre de l’organisation de l’événement{" "}
                <strong className="text-foreground">{siteConfig.name}</strong>.
              </p>
              <p>
                Contact :{" "}
                <span className="text-foreground">{organizerInfo.email}</span>
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Hébergement
              </h3>
              <p>
                Le site est hébergé par Netlify, Inc., 44 Montgomery Street,
                Suite 300, San Francisco, California 94104, États-Unis.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Objet du site
              </h3>
              <p>
                Ce site présente l’événement {siteConfig.name} prévu le 27
                février 2027 à {venueConfig.name} ({venueConfig.fullAddress}).
                Il permet notamment de consulter le programme, les pilotes, les
                informations pratiques et d’accéder à la billetterie via un
                prestataire externe.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Propriété intellectuelle
              </h3>
              <p>
                L’ensemble des contenus présents sur ce site (textes, images,
                logos, vidéos, éléments graphiques) est protégé par le droit de
                la propriété intellectuelle. Toute reproduction, représentation
                ou diffusion, totale ou partielle, sans autorisation préalable,
                est interdite.
              </p>
              <p>
                Les marques, logos et dénominations des partenaires, pilotes et
                institutions appartiennent à leurs détenteurs respectifs.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Limitation de responsabilité
              </h3>
              <p>
                Les informations publiées le sont à titre indicatif et peuvent
                être modifiées. L’éditeur s’efforce d’assurer l’exactitude des
                contenus, sans garantie d’exhaustivité. La billetterie et les
                paiements sont gérés par des plateformes tierces ; leurs
                conditions s’appliquent.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Données personnelles
              </h3>
              <p>
                Pour plus d’informations sur le traitement des données
                personnelles, consultez la{" "}
                <Link
                  href="/confidentialite"
                  className="font-medium text-brand-red hover:text-brand-red-dark"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
