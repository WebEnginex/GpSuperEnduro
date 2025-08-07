'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

export default function PilotesPage() {
  const [activeTab, setActiveTab] = useState('125');
  const [currentSlide, setCurrentSlide] = useState(0);

  const pilotes125 = [
    {
      numero: 11,
      prenom: "Liam",
      nom: "BRUNEAU",
      club: "MX Club Bretagne",
      image: "/images/pilotes_125/Bruneau_Liam.webp"
    },
    {
      numero: 12,
      prenom: "Xavier",
      nom: "CAMPS FAURIA",
      club: "Team Provence MX",
      image: "/images/pilotes_125/Camps_Fauria_Xavier.webp"
    },
    {
      numero: 13,
      prenom: "Yannis",
      nom: "LOPEZ",
      club: "Racing Club Sud",
      image: "/images/pilotes_125/Lopez_Yannis.webp"
    },
    {
      numero: 14,
      prenom: "Ilyes",
      nom: "ORTIZ",
      club: "Supercross Academy",
      image: "/images/pilotes_125/Ortiz_Ilyes.webp"
    },
    {
      numero: 15,
      prenom: "Maho",
      nom: "SIMO",
      club: "Elite Racing Team",
      image: "/images/pilotes_125/Simo_Maho.webp"
    }
  ];

  const pilotes250 = [
    {
      numero: 21,
      prenom: "Maxime",
      nom: "DESPREY",
      club: "Team Factory 250",
      image: "/images/pilotes_250/Desprey_Maxime.webp"
    },
    {
      numero: 22,
      prenom: "Calvin",
      nom: "FONVIEILLE",
      club: "Pro Racing Academy",
      image: "/images/pilotes_250/Fonvieille_Calvin.webp"
    },
    {
      numero: 23,
      prenom: "Yannis",
      nom: "IRSUTI",
      club: "MX Elite France",
      image: "/images/pilotes_250/Irsuti_Yannis.webp"
    },
    {
      numero: 24,
      prenom: "Mickaël",
      nom: "LAMARQUE",
      club: "Team Yamaha 250",
      image: "/images/pilotes_250/Lamarque_Mickaël.webp"
    },
    {
      numero: 25,
      prenom: "Charles",
      nom: "LEFRANÇOIS",
      club: "Kawasaki Racing",
      image: "/images/pilotes_250/Lefrançois_Charles.webp"
    }
  ];

  const pilotes450 = [
    {
      numero: 1,
      prenom: "Gregory",
      nom: "ARANDA",
      club: "Team Elite 450",
      image: "/images/pilotes_450/Aranda_Gregory.webp"
    },
    {
      numero: 2,
      prenom: "Anthony",
      nom: "BOURDON",
      club: "Factory Honda Racing",
      image: "/images/pilotes_450/Bourdon_Anthony.webp"
    },
    {
      numero: 3,
      prenom: "Adrien",
      nom: "ESCOFFIER",
      club: "Supercross Pro Team",
      image: "/images/pilotes_450/Escoffier_Adrien.webp"
    },
    {
      numero: 4,
      prenom: "Thomas",
      nom: "RAMETTE",
      club: "Championship Racing",
      image: "/images/pilotes_450/Ramette_Thomas.webp"
    },
    {
      numero: 5,
      prenom: "Cedric",
      nom: "SOUBEYRAS",
      club: "Pro MX France",
      image: "/images/pilotes_450/Soubeyras_Cedric.webp"
    }
  ];

  const getCurrentPilotes = () => {
    switch (activeTab) {
      case '125': return pilotes125;
      case '250': return pilotes250;
      case '450': return pilotes450;
      default: return pilotes125;
    }
  };

  const getTabColor = (tab: string) => {
    switch (tab) {
      case '125': return 'from-green-600 to-green-700';
      case '250': return 'from-blue-600 to-blue-700';
      case '450': return 'from-red-600 to-red-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  // Slider configuration
  const currentPilotes = getCurrentPilotes();
  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };
  
  // Reset slide when changing tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  const maxSlides = Math.ceil(currentPilotes.length / itemsPerPage.desktop);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getVisiblePilotes = () => {
    const startIndex = currentSlide * itemsPerPage.desktop;
    return currentPilotes.slice(startIndex, startIndex + itemsPerPage.desktop);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('/images/supercross-bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            Supercross Douai 2025
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Pilotes</span> Officiels
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez les talents exceptionnels qui s&apos;affronteront lors du championnat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-lg text-gray-400">            
          </div>
        </div>
      </section>

      {/* Onglets */}
      <section className="py-12 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row bg-gray-800/50 rounded-2xl p-2 gap-2">
            <button
              onClick={() => handleTabChange('125')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === '125'
                  ? `bg-gradient-to-r ${getTabColor('125')} text-white shadow-lg`
                  : 'bg-gray-700/30 text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <div className="text-lg font-bold">125cc</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleTabChange('250')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === '250'
                  ? `bg-gradient-to-r ${getTabColor('250')} text-white shadow-lg`
                  : 'bg-gray-700/30 text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <div className="text-lg font-bold">250cc</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleTabChange('450')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === '450'
                  ? `bg-gradient-to-r ${getTabColor('450')} text-white shadow-lg`
                  : 'bg-gray-700/30 text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <div className="text-lg font-bold">450cc</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Pilotes */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Catégorie {activeTab}cc
            </h2>
            <p className="text-gray-400 text-lg">
              {activeTab === '125' && 'Les jeunes talents qui feront le supercross de demain'}
              {activeTab === '250' && 'Les espoirs français du supercross'}
              {activeTab === '450' && "L'élite française du supercross"}
            </p>
          </div>
          
          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {maxSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Pilote précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Pilote suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Pilotes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getVisiblePilotes().map((pilote, index) => (
                <div key={index} className="group w-full">
                  <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 w-full h-auto">
                    {/* Image du pilote */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      <Image
                        src={pilote.image}
                        alt={`${pilote.prenom} ${pilote.nom}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Numéro en haut à droite */}
                    <div className="absolute top-4 right-4 text-red-500 font-bold text-2xl">
                      #{pilote.numero}
                    </div>

                    {/* Informations en bas à gauche */}
                    <div className="absolute bottom-4 left-4 space-y-1">
                      <div className="space-y-0.5">
                        <div className="text-white font-medium text-lg">
                          {pilote.prenom}
                        </div>
                        <div className="text-red-500 font-bold text-xl">
                          {pilote.nom}
                        </div>
                        <div className="text-white/80 text-sm">
                          {pilote.club}
                        </div>
                      </div>
                    </div>

                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            {maxSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: maxSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-red-500 scale-110' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Aller à la slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Statistiques du championnat</h2>
            <p className="text-gray-400 text-lg">
              Découvrez les chiffres clés de cette édition exceptionnelle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-red-500 mb-2">15</div>
              <h3 className="text-lg font-semibold mb-2">Pilotes confirmés</h3>
              <p className="text-gray-400 text-sm">Répartis sur 3 catégories</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-green-500 mb-2">3</div>
              <h3 className="text-lg font-semibold mb-2">Catégories</h3>
              <p className="text-gray-400 text-sm">125cc, 250cc et 450cc</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-blue-500 mb-2">5h30</div>
              <h3 className="text-lg font-semibold mb-2">Durée totale</h3>
              <p className="text-gray-400 text-sm">De spectacle intense</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-yellow-500 mb-2">2025</div>
              <h3 className="text-lg font-semibold mb-2">Édition</h3>
              <p className="text-gray-400 text-sm">Championnat de France</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Venez encourager vos pilotes préférés !
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Réservez dès maintenant vos places pour ne rien rater de ces affrontements épiques entre les meilleurs pilotes français.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/billeterie"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-lg"
            >
              Réserver mes billets
            </a>
            <a 
              href="/programme"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-lg"
            >
              Voir le programme
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
}
