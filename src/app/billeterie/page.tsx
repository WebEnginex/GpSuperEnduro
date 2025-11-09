'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SEO } from "@/components/SEO";

export default function Billeterie() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Billetterie Grand Prix Super Enduro Douai - Réservez vos places"
        description="Réservez vos billets pour le Grand Prix Super Enduro le 7 mars 2026 à Douai. Plusieurs catégories disponibles : Mezzanine, Tribune, Carré Or et VIP. Billetterie disponible à partir du 6 octobre 2025."
        url="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
      />
      {/* Section noire sous le header */}
      <section id="main-content" className="relative bg-black py-16 pt-64 sm:pt-72 lg:pt-[400px]">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            SuperEnduro 2026
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Billeterie</span> Officielle
          </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Réservez vos billets pour le Grand Prix Super Enduro à Douai et assistez à une soirée unique. Plusieurs catégories disponibles.
            </p>
        </div>
      </section>

      {/* Tarifs Section avec dégradé */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid responsive optimisé : 1 col mobile, 2 cols tablette, 4 cols desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Mezzanine */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 hover-scale-card h-full"
          >
            <Card className="hover-shadow-card hover-bg-card transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-cyan-400 z-10" />
              <CardHeader className="pb-3 sm:pb-4 pt-6 sm:pt-8 relative z-20">
                <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg sm:text-xl">
                  🏟️ Mezzanine
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Une vue imprenable sur l&apos;événement depuis les hauteurs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    À partir de <span className="text-2xl sm:text-3xl lg:text-4xl text-cyan-400">25€</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start gap-2 leading-relaxed">🚪 Ouverture des portes à 18H30.</li>
                    <li className="flex items-start gap-2 leading-relaxed">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🎉 Cérémonie d&apos;ouverture à 19H30.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🛍️ Stands partenaires.</li>
                  </ul>
                </div>
                <div className="pt-3 sm:pt-4">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-cyan-600 hover:bg-cyan-700 text-white transition-colors text-base sm:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Tribune */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 hover-scale-card h-full"
          >
            <Card className="hover-shadow-card hover-bg-card transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-green-400 z-10" />
              <CardHeader className="pb-3 sm:pb-4 pt-6 sm:pt-8 relative z-20">
                <CardTitle className="text-green-400 flex items-center gap-2 text-lg sm:text-xl">
                  🪑 Tribune
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Le meilleur compromis entre confort et visibilité.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    À partir de <span className="text-2xl sm:text-3xl lg:text-4xl text-green-400">30€</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start gap-2 leading-relaxed">🚪 Ouverture des portes à 18H30.</li>
                    <li className="flex items-start gap-2 leading-relaxed">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🎉 Cérémonie d&apos;ouverture à 19H30.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🛍️ Stands partenaires.</li>
                  </ul>
                </div>
                <div className="pt-3 sm:pt-4">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-green-600 hover:bg-green-700 text-white transition-colors text-base sm:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Tribune Paddock - Carré Or */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 hover-scale-card h-full"
          >
            <Card className="hover-shadow-card hover-bg-card transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-red-400 z-10" />
              <CardHeader className="pb-3 sm:pb-4 pt-6 sm:pt-8 relative z-20">
                <CardTitle className="text-red-400 flex items-center gap-2 text-lg sm:text-xl">
                  🏅 Carré Or
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Au plus près de l&apos;action, une expérience unique.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    À partir de <span className="text-2xl sm:text-3xl lg:text-4xl text-red-400">50€</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start gap-2 leading-relaxed">🅿️ Parking au plus proche de l&apos;entrée.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🚪 Ouverture des portes à 13H30.</li>
                    <li className="flex items-start gap-2 leading-relaxed">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🏍️ Accès illimité au paddock pilotes.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🎫 Accès exclusif aux essais et qualifications.</li>
                    <li className="flex items-start gap-2 leading-relaxed">📍 Accès privilégié au circuit.</li>
                  </ul>
                </div>
                <div className="pt-3 sm:pt-4">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-red-600 hover:bg-red-700 text-white transition-colors text-base sm:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Tribune Paddock - VIP */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all duration-300 hover-scale-card h-full"
          >
            <Card className="hover-shadow-card hover-bg-card transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-red-400 z-10" />
              <CardHeader className="pb-3 sm:pb-4 pt-6 sm:pt-8 relative z-20">
                <CardTitle className="text-red-400 flex items-center gap-2 text-lg sm:text-xl">
                  👑 VIP
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  L&apos;expérience ultime avec service premium.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    À partir de <span className="text-2xl sm:text-3xl lg:text-4xl text-red-400">95€</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                    <li className="flex items-start gap-2 leading-relaxed">🅿️ Parking au plus proche de l&apos;entrée.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🚪 Ouverture des portes à 13H30.</li>
                    <li className="flex items-start gap-2 leading-relaxed">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🏍️ Accès illimité au paddock pilotes.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🎫 Accès exclusif aux essais et qualifications.</li>
                    <li className="flex items-start gap-2 leading-relaxed">📍 Accès privilégié au circuit.</li>
                    <li className="flex items-start gap-2 leading-relaxed">🍽️ Bar et buffet en espace privatisé.</li>
                  </ul>
                </div>
                <div className="pt-3 sm:pt-4">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-red-600 hover:bg-red-700 text-white transition-colors text-base sm:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
