import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { organizerInfo } from "@/data/contact";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité du site ${siteConfig.name}.`,
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Confidentialité", path: "/confidentialite" },
        ])}
      />
      <div className="bg-background min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <SectionTitle
            title="Confidentialité"
            subtitle="Données personnelles"
            align="left"
          />

          <div className="space-y-10 text-sm leading-relaxed text-muted sm:text-[15px]">
            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Responsable du traitement
              </h3>
              <p>
                Dans le cadre du site {siteConfig.name}, le responsable du
                traitement peut être contacté à l’adresse{" "}
                <span className="text-foreground">{organizerInfo.email}</span>.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Données collectées
              </h3>
              <p>Selon votre navigation, peuvent être traités :</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  des données de fréquentation anonymisées ou pseudonymisées
                  (pages vues, clics billetterie) à des fins de statistiques
                  d’audience ;
                </li>
                <li>
                  des données techniques liées à l’hébergement et à la sécurité
                  du site ;
                </li>
                <li>
                  si vous nous écrivez par e-mail : votre adresse e-mail et le
                  contenu de votre message.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Finalités
              </h3>
              <p>Ces données sont utilisées pour :</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>assurer le fonctionnement et la sécurité du site ;</li>
                <li>mesurer l’audience et améliorer l’expérience ;</li>
                <li>répondre à vos demandes de contact.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Destinataires et sous-traitants
              </h3>
              <p>
                Les données peuvent être traitées par des prestataires
                techniques nécessaires au service (hébergement Netlify, base de
                données / authentification Supabase, envoi d’e-mails
                transactionnels le cas échéant). La billetterie est opérée par
                un prestataire externe soumis à ses propres conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Durée de conservation
              </h3>
              <p>
                Les données sont conservées pour la durée nécessaire aux
                finalités ci-dessus, puis archivées ou supprimées conformément
                aux obligations légales applicables.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Vos droits
              </h3>
              <p>
                Conformément au RGPD, vous disposez d’un droit d’accès, de
                rectification, d’effacement, de limitation, d’opposition et de
                portabilité lorsque cela s’applique. Pour les exercer, contactez{" "}
                <span className="text-foreground">{organizerInfo.email}</span>.
                Vous pouvez également introduire une réclamation auprès de la
                CNIL (
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-red hover:text-brand-red-dark"
                >
                  www.cnil.fr
                </a>
                ).
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display text-lg font-bold text-foreground">
                Cookies
              </h3>
              <p>
                Le site peut utiliser des cookies ou stockage local strictement
                nécessaires au fonctionnement (session, préférences techniques).
                Aucune publicité comportementale tierce n’est déployée depuis
                cette interface.
              </p>
            </section>

            <p className="pt-2">
              Voir aussi les{" "}
              <Link
                href="/mentions-legales"
                className="font-medium text-brand-red hover:text-brand-red-dark"
              >
                mentions légales
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
