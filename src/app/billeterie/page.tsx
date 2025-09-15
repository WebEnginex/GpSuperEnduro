import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Billeterie() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section noire sous le header */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            Supercross Douai 2025
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Billeterie</span> Officielle
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Les places et tarifs seront disponible à partir du 6 Octobre 2025!
          </p>
        </div>
      </section>

      {/* Tarifs Section avec dégradé */}
      {/* <section className="py-16 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50"> */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">{/* Mezzanine */}
          {/* <Link 
            href="https://www.billetweb.fr/championnat-de-france-de-supercross-2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-cyan-400 z-10" />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  🏟️ Mezzanine
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Une vue imprenable sur l&apos;événement depuis les hauteurs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl text-cyan-400">25€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">🚪 Ouverture des portes à 18H30.</li>
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2">🎉 Cérémonie d&apos;ouverture à 19H30.</li>
                    <li className="flex items-start gap-2">🛍️ Stands partenaires.</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white transition-colors">
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link> */}

          {/* Tribune */}
          {/* <Link 
            href="https://www.billetweb.fr/championnat-de-france-de-supercross-2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-green-400 z-10" />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle className="text-green-400 flex items-center gap-2">
                  🪑 Tribune
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Le meilleur compromis entre confort et visibilité.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl text-green-400">30€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">🚪 Ouverture des portes à 18H30.</li>
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2">🎉 Cérémonie d&apos;ouverture à 19H30.</li>
                    <li className="flex items-start gap-2">🛍️ Stands partenaires.</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link> */}

          {/* Tribune Paddock - Carré Or */}
          {/* <Link 
            href="https://www.billetweb.fr/championnat-de-france-de-supercross-2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-red-400 z-10" />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle className="text-red-400 flex items-center gap-2">
                  🏅 Carré Or
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Au plus près de l&apos;action, une expérience unique.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl text-red-400">50€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">🅿️ Parking au plus proche de l&apos;entrée.</li>
                    <li className="flex items-start gap-2">🚪 Ouverture des portes à 13H30.</li>
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2">🏍️ Accès illimité au paddock pilotes.</li>
                    <li className="flex items-start gap-2">🎫 Accès exclusif aux essais et qualifications.</li>
                    <li className="flex items-start gap-2">📍 Accès privilégié au circuit.</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link> */}

          {/* Tribune Paddock - VIP */}
          {/* <Link 
            href="https://www.billetweb.fr/championnat-de-france-de-supercross-2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transform transition-all duration-300 hover:scale-105 h-full"
          >
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-3 rounded-t-2xl bg-red-400 z-10" />
              <CardHeader className="pb-4 pt-8 relative z-20">
                <CardTitle className="text-red-400 flex items-center gap-2">
                  👑 VIP
                </CardTitle>
                <CardDescription className="text-gray-300">
                  L&apos;expérience ultime avec service premium.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    À partir de <span className="text-3xl text-red-400">95€</span>
                  </div>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">🅿️ Parking au plus proche de l&apos;entrée.</li>
                    <li className="flex items-start gap-2">🚪 Ouverture des portes à 13H30.</li>
                    <li className="flex items-start gap-2">✍️ Séance de dédicaces à 19H.</li>
                    <li className="flex items-start gap-2">🏍️ Accès illimité au paddock pilotes.</li>
                    <li className="flex items-start gap-2">🎫 Accès exclusif aux essais et qualifications.</li>
                    <li className="flex items-start gap-2">📍 Accès privilégié au circuit.</li>
                    <li className="flex items-start gap-2">🍽️ Bar et buffet en espace privatisé.</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link> */}
          </div>
        </div>
      {/* </section> */}
    </div>
  );
}
