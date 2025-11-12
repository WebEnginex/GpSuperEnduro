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
      <section id="main-content" className="relative bg-black py-8 sm:py-12 lg:py-14 pt-64 sm:pt-72 lg:pt-80">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-3 sm:mb-4 bg-red-600/20 text-red-400 border-red-600/30 text-xs sm:text-sm">
            SuperEnduro 2026
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            <span className="text-red-600">Billetterie</span> Officielle
          </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-4 sm:mb-6">
              Réservez vos billets pour le Grand Prix Super Enduro à Douai et assistez à une soirée unique. Plusieurs catégories sont disponibles.
            </p>
        </div>
      </section>

      {/* Tarifs Section avec dégradé */}
      <section className="py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid responsive optimisé : 1 col mobile, 2 cols tablette, 4 cols desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Premium */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            <Card className="hover-shadow-card hover-bg-card hover-scale-card transition-all duration-300 cursor-pointer w-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 rounded-t-2xl bg-cyan-400 z-10" />
              <CardHeader className="pb-2 sm:pb-3 pt-4 sm:pt-5 lg:pt-6 relative z-20">
                <CardTitle className="text-cyan-400 flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                  👑 Premium
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm leading-snug sm:leading-relaxed">
                  L&apos;expérience ultime avec Accès privilégié et service premium.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3">
                    À partir de <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-cyan-400">48€</span>
                  </div>
                  {/* Encadré horaire d'ouverture */}
                  <div className="mb-2 sm:mb-3">
                    <div className="w-full bg-cyan-500/20 border border-cyan-400 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-cyan-400 font-semibold text-xs text-center">
                      🚪 Ouverture à 13H00
                    </div>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5 text-gray-300 text-xs sm:text-sm">
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🚗 Parking de votre véhicule au plus proche de l&apos;entrée principale</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🏁 Accès aux essais et qualifications</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🚶 Visite exclusive du circuit</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🏍️ Accès aux stands des pilotes</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🎫 Places premium avec vue optimale</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🛍️ Accès aux stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-2 sm:pt-3">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-cyan-600 hover:bg-cyan-700 text-white transition-colors text-sm sm:text-base lg:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Catégorie 1 */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            <Card className="hover-shadow-card hover-bg-card hover-scale-card transition-all duration-300 cursor-pointer w-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 rounded-t-2xl bg-pink-400 z-10" />
              <CardHeader className="pb-2 sm:pb-3 pt-4 sm:pt-5 lg:pt-6 relative z-20">
                <CardTitle className="text-pink-400 flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                  🎫 Catégorie 1
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm leading-snug sm:leading-relaxed">
                  Places situées dans les gradins pour une excellente visibilité sur le circuit et les obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3">
                    À partir de <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-pink-400">30€</span>
                  </div>
                  {/* Encadré horaire d'ouverture */}
                  <div className="mb-2 sm:mb-3">
                    <div className="w-full bg-pink-500/20 border border-pink-400 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-pink-400 font-semibold text-xs text-center">
                      🚪 Ouverture à 17H30
                    </div>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5 text-gray-300 text-xs sm:text-sm">
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🛍️ Accès aux stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-2 sm:pt-3">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-pink-600 hover:bg-pink-700 text-white transition-colors text-sm sm:text-base lg:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Catégorie 2 */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            <Card className="hover-shadow-card hover-bg-card hover-scale-card transition-all duration-300 cursor-pointer w-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 rounded-t-2xl bg-green-400 z-10" />
              <CardHeader className="pb-2 sm:pb-3 pt-4 sm:pt-5 lg:pt-6 relative z-20">
                <CardTitle className="text-green-400 flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                  🎫 Catégorie 2
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm leading-snug sm:leading-relaxed">
                  Places situées dans la mezzanine, offrant une vue sur l&apos;ensemble du circuit et des obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3">
                    À partir de <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-green-400">24€</span>
                  </div>
                  {/* Encadré horaire d'ouverture */}
                  <div className="mb-2 sm:mb-3">
                    <div className="w-full bg-green-500/20 border border-green-400 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-green-400 font-semibold text-xs text-center">
                      🚪 Ouverture à 17H30
                    </div>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5 text-gray-300 text-xs sm:text-sm">
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🛍️ Accès aux stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-2 sm:pt-3">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-green-600 hover:bg-green-700 text-white transition-colors text-sm sm:text-base lg:text-lg font-semibold"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Catégorie 3 */}
          <Link
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073"
            target="_blank"
            rel="noopener noreferrer"
            className="flex"
          >
            <Card className="hover-shadow-card hover-bg-card hover-scale-card transition-all duration-300 cursor-pointer w-full flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 sm:h-3 rounded-t-2xl bg-yellow-400 z-10" />
              <CardHeader className="pb-2 sm:pb-3 pt-4 sm:pt-5 lg:pt-6 relative z-20">
                <CardTitle className="text-yellow-400 flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                  🎫 Catégorie 3
                </CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm leading-snug sm:leading-relaxed">
                  Places situées dans la mezzanine, offrant une vue sur l&apos;ensemble du circuit et des obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3">
                    À partir de <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-yellow-400">18€</span>
                  </div>
                  {/* Encadré horaire d'ouverture */}
                  <div className="mb-2 sm:mb-3">
                    <div className="w-full bg-yellow-500/20 border border-yellow-400 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-yellow-400 font-semibold text-xs text-center">
                      🚪 Ouverture à 17H30
                    </div>
                  </div>
                  <ul className="space-y-1 sm:space-y-1.5 text-gray-300 text-xs sm:text-sm">
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-1.5 sm:gap-2 leading-snug sm:leading-relaxed">🛍️ Accès aux stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-2 sm:pt-3">
                  <Button
                    size="lg"
                    className="w-full min-h-[44px] sm:min-h-[48px] bg-yellow-600 hover:bg-yellow-700 text-white transition-colors text-sm sm:text-base lg:text-lg font-semibold"
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
