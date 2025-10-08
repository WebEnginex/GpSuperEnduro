import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billeterie Grand Prix Super Enduro 2026 | 7 Mars à Douai",
  description: "Réservez vos places pour le Grand Prix Super Enduro 2026 le 7 Mars à Gayant Expo Douai. Pass Premium (13h), Catégories 1, 2 et 3 (17h30). Billeterie officielle.",
  keywords: "billeterie, tickets, Grand Prix Super Enduro 2026, Douai, Gayant Expo, Pass Premium, réservation",
  openGraph: {
    title: "Billeterie Grand Prix Super Enduro 2026",
    description: "Réservez vos places pour le 7 Mars 2026 à Gayant Expo Douai",
    type: "website",
  },
};

export default function Billeterie() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section noire sous le header */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            SuperEnduro 2026
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Billeterie</span> Officielle
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Réservez dès maintenant vos places pour le Championnat du Monde SuperEnduro 2026 !
          </p>
        </div>
      </section>

      {/* Tarifs Section avec dégradé */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Premium */}
          <Link 
            href="https://www.ticketmaster.fr/fr/manifestation/championnat-du-monde-de-superenduro-2026-billet/idmanif/637073" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl" style={{ backgroundColor: 'rgb(0, 192, 192)' }} />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle style={{ color: 'rgb(0, 192, 192)' }} className="flex items-center gap-2">
                  👑 Premium
                </CardTitle>
                <CardDescription className="text-gray-300">
                  L&apos;expérience ultime avec accès privilégié et service premium.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl" style={{ color: 'rgb(0, 192, 192)' }}>48€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">🚗 Parking de votre véhicule au plus proche de l&apos;entrée principale</li>
                    <li className="flex items-start gap-2">🏁 Accès aux essais et qualifications</li>
                    <li className="flex items-start gap-2">🚶‍♂️ Visite exclusive du circuit</li>
                    <li className="flex items-start gap-2">🏍️ Accès aux stands des pilotes</li>
                    <li className="flex items-start gap-2">🎫 Places premium avec vue optimale</li>
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-2">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-2">🛍️ Accès stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full text-white transition-colors" style={{ backgroundColor: 'rgb(0, 192, 192)' }}>
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
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl" style={{ backgroundColor: 'rgb(233, 86, 119)' }} />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle style={{ color: 'rgb(233, 86, 119)' }} className="flex items-center gap-2">
                  🏟️ Catégorie 1
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Places situées dans les gradins pour une excellente visibilité sur le circuit et les obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl" style={{ color: 'rgb(233, 86, 119)' }}>30€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-2">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-2">🛍️ Accès stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full text-white transition-colors" style={{ backgroundColor: 'rgb(233, 86, 119)' }}>
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
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl" style={{ backgroundColor: 'rgb(0, 215, 0)' }} />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle style={{ color: 'rgb(0, 215, 0)' }} className="flex items-center gap-2">
                  🪑 Catégorie 2
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Places situées dans la mezzanine, offrant une vue sur l&apos;ensemble du circuit et des obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl" style={{ color: 'rgb(0, 215, 0)' }}>24€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-2">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-2">🛍️ Accès stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full text-black transition-colors" style={{ backgroundColor: 'rgb(0, 215, 0)' }}>
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
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl" style={{ backgroundColor: 'rgb(255, 255, 0)' }} />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle style={{ color: 'rgb(255, 255, 0)' }} className="flex items-center gap-2">
                  🎫 Catégorie 3
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Places situées dans la mezzanine, offrant une vue sur l&apos;ensemble du circuit et des obstacles.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl" style={{ color: 'rgb(255, 255, 0)' }}>18€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces</li>
                    <li className="flex items-start gap-2">🎉 Cérémonie d&apos;ouverture</li>
                    <li className="flex items-start gap-2">🛍️ Accès stands partenaires</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full text-black transition-colors" style={{ backgroundColor: 'rgb(255, 255, 0)' }}>
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