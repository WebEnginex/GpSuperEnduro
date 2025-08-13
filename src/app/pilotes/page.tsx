'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { SmartBrandLogo } from '@/components/media/SmartBrandLogo';
import { SmartPilotImage } from '@/components/media/SmartPilotImage';
import { BrandLogosPreloader } from '@/components/media/BrandLogosPreloader';
import { PiloteDiagnostic } from '@/components/PiloteDiagnostic';
import { DebugOverlay } from '@/components/DebugOverlay';
import { MarqueDebugPanel } from '@/components/MarqueDebugPanel';
import { useCacheCleaner } from '@/hooks/useCacheCleaner';
import { MARQUES, type MarqueId } from '@/lib/data/marques';

// Interface pour les pilotes avec marque
interface Pilote {
  numero: number;
  prenom: string;
  nom: string;
  club: string;
  image: string;
  marque: MarqueId;
}

export default function PilotesPage() {
  const [activeTab, setActiveTab] = useState('125');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Hook pour nettoyer le cache lors du changement de catégorie
  useCacheCleaner(activeTab);

  const pilotes125: Pilote[] = [
    {
      numero: 301,
      prenom: "Liam",
      nom: "BRUNEAU",
      club: "",
      image: "/images/pilotes_125/Bruneau_Liam.webp",
      marque: "ktm"
    },
    {
      numero: 370,
      prenom: "Xavier",
      nom: "CAMPS FAURIA",
      club: "",
      image: "/images/pilotes_125/Camps_Fauria_Xavier.webp",
      marque: "gasgas"
    },
    {
      numero: 321,
      prenom: "Maho",
      nom: "SIMO",
      club: "",
      image: "/images/pilotes_125/Simo_Maho.webp",
      marque: "yamaha"
    },
    {
      numero: 188,
      prenom: "Ilyes",
      nom: "ORTIZ",
      club: "",
      image: "/images/pilotes_125/Ortiz_Ilyes.webp",
      marque: "ktm"
    },
    {
      numero: 66,
      prenom: "Yannis",
      nom: "LOPEZ",
      club: "",
      image: "/images/pilotes_125/Lopez_Yannis.webp",
      marque: "husqvarna"
    },
  ];

  const pilotes250: Pilote[] = [
    {
      numero: 141,
      prenom: "Maxime",
      nom: "DESPREY",
      club: "Union Motocycliste Doloise",
      image: "/images/pilotes_250/Desprey_Maxime.webp",
      marque: "yamaha"
    },
    {
      numero: 11,
      prenom: "Calvin",
      nom: "FONVIEILLE",
      club: "A.G.S. Puech Rampant",
      image: "/images/pilotes_250/Fonvieille_Calvin.webp",
      marque: "ktm"
    },
    {
      numero: 225,
      prenom: "Charles",
      nom: "LEFRANÇOIS",
      club: "Moto Club La Bosse de Bretagne",
      image: "/images/pilotes_250/Lefrançois_Charles.webp",
      marque: "honda"
    },
    {
      numero: 170,
      prenom: "Yannis",
      nom: "IRSUTI",
      club: "MC Chateauneuf les Martigues",
      image: "/images/pilotes_250/Irsuti_Yannis.webp",
      marque: "stark"
    },
    {
      numero: 22,
      prenom: "Mickaël",
      nom: "LAMARQUE",
      club: "Moto Club Montendrais",
      image: "/images/pilotes_250/Lamarque_Mickaël.webp",
      marque: "ktm"
    },
  ];

  const pilotes450: Pilote[] = [
    {
      numero: 85,
      prenom: "Cedric",
      nom: "SOUBEYRAS",
      club: "MC Chateauneuf les Martigues",
      image: "/images/pilotes_450/Soubeyras_Cedric.webp",
      marque: "kawasaki"
    },
    {
      numero: 20,
      prenom: "Gregory",
      nom: "ARANDA",
      club: "Moto Club des Costieres",
      image: "/images/pilotes_450/Aranda_Gregory.webp",
      marque: "yamaha"
    },
    {
      numero: 945,
      prenom: "Anthony",
      nom: "BOURDON",
      club: "Moto Club Langonnais",
      image: "/images/pilotes_450/Bourdon_Anthony.webp",
      marque: "kawasaki"
    },
    {
      numero: 137,
      prenom: "Adrien",
      nom: "ESCOFFIER",
      club: "Moto Club Pertuis Durance Lubéron",
      image: "/images/pilotes_450/Escoffier_Adrien.webp",
      marque: "yamaha"
    },
    {
      numero: 6,
      prenom: "Thomas",
      nom: "RAMETTE",
      club: "MC Brienon",
      image: "/images/pilotes_450/Ramette_Thomas.webp",
      marque: "suzuki"
    },
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

  // Slider configuration responsive
  const currentPilotes = getCurrentPilotes();
  
  // Fonction pour déterminer le nombre d'éléments par page selon la taille d'écran
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 3; // SSR fallback
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile: 1 pilote
    if (width < 1024) return 2; // tablet: 2 pilotes
    return 3; // desktop: 3 pilotes
  };

  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Écouter les changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    
    // Initialiser
    handleResize();
    
    // Écouter les redimensionnements
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Reset slide when changing tab or itemsPerPage changes
  useEffect(() => {
    setCurrentSlide(0);
    console.log(`🔄 [PilotesPage] Category changed to: ${activeTab}`);
  }, [activeTab, itemsPerPage]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentSlide(0);
  };

  const maxSlides = Math.ceil(currentPilotes.length / itemsPerPage);
  
  // S'assurer que currentSlide est dans les limites
  useEffect(() => {
    if (currentSlide >= maxSlides && maxSlides > 0) {
      setCurrentSlide(0);
    }
  }, [currentSlide, maxSlides]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = (prev + 1) % maxSlides;
      console.log(`Next slide: ${prev} -> ${newSlide} (max: ${maxSlides}, items: ${itemsPerPage})`);
      return newSlide;
    });
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = (prev - 1 + maxSlides) % maxSlides;
      console.log(`Prev slide: ${prev} -> ${newSlide} (max: ${maxSlides}, items: ${itemsPerPage})`);
      return newSlide;
    });
  };

  // Support tactile pour le swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && maxSlides > 1) {
      nextSlide();
    }
    if (isRightSwipe && maxSlides > 1) {
      prevSlide();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <BrandLogosPreloader />
      {/* Section noire sous le header */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
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
        </div>
      </section>

      {/* Section de transition avec dégradé */}
      <section className="relative py-12 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sélecteur de catégories avec design amélioré */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-300">
              Choisissez la <span className="text-red-400">catégorie</span>
            </h2>
            
            <div className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row bg-black/60 backdrop-blur-sm rounded-2xl p-3 gap-3 border border-gray-700/50 shadow-2xl">
                <button
                
                  onClick={() => handleTabChange('125')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === '125'
                      ? `bg-gradient-to-r ${getTabColor('125')} text-white shadow-lg transform scale-105 shadow-green-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-lg font-bold">125cc</div>
                  <div className="text-xs opacity-75 mt-1">Junior</div>
                </button>
                
                <button
                  onClick={() => handleTabChange('250')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === '250'
                      ? `bg-gradient-to-r ${getTabColor('250')} text-white shadow-lg transform scale-105 shadow-blue-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-lg font-bold">250cc</div>
                  <div className="text-xs opacity-75 mt-1">SX 250</div>
                </button>

                <button
                  onClick={() => handleTabChange('450')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === '450'
                      ? `bg-gradient-to-r ${getTabColor('450')} text-white shadow-lg transform scale-105 shadow-red-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-lg font-bold">450cc</div>
                  <div className="text-xs opacity-75 mt-1">SX 450</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilotes */}
      <section className="py-16 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de la catégorie active */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getTabColor(activeTab)} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">{activeTab}cc</span>
              </div>
              <h2 className="text-3xl font-bold">
                {activeTab === '125' && (
                  <>Catégorie <span className="text-green-400">Junior</span></>
                )}
                {activeTab === '250' && (
                  <>Catégorie <span className="text-blue-400">SX 250</span></>
                )}
                {activeTab === '450' && (
                  <>Catégorie <span className="text-red-400">SX 450</span></>
                )}
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {activeTab === '125' && 'Les jeunes talents de la catégorie Junior qui représentent l\'avenir du supercross'}
              {activeTab === '250' && 'La catégorie SX2, la voie vers l\'élite du supercross français'}
              {activeTab === '450' && "La catégorie SX1, l'élite absolue du supercross français"}
            </p>
            
            {/* Indication de navigation pour mobile */}
            <div className="mt-4 md:hidden">
              <p className="text-gray-500 text-sm">
                👈 Glissez pour naviguer entre les pilotes 👉
              </p>
            </div>
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

            {/* Pilotes Carousel */}
            <div 
              key={`carousel-${activeTab}`}
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                key={`slider-${activeTab}`}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {Array.from({ length: maxSlides }).map((_, slideIndex) => {
                  const slideStartIndex = slideIndex * itemsPerPage;
                  const slidePilotes = currentPilotes.slice(slideStartIndex, slideStartIndex + itemsPerPage);
                  
                  return (
                    <div 
                      key={`${activeTab}-slide-${slideIndex}`} 
                      className="w-full flex-shrink-0 min-w-full"
                    >
                      <div className={`grid gap-6 lg:gap-8 px-2 ${
                        itemsPerPage === 1 ? 'grid-cols-1' :
                        itemsPerPage === 2 ? 'grid-cols-2' :
                        'grid-cols-3'
                      }`}>
                        {slidePilotes.map((pilote, index) => (
                          <div key={`${activeTab}-${pilote.numero}-${slideStartIndex + index}`} className="group w-full">
                            <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 w-full h-auto border border-gray-800 hover:border-red-500/50">
                              {/* Image du pilote */}
                              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                                <SmartPilotImage
                                  key={`pilot-${activeTab}-${pilote.numero}`}
                                  src={pilote.image}
                                  alt={`${pilote.prenom} ${pilote.nom}`}
                                  className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full"
                                  priority={slideStartIndex + index < 6}
                                />
                                {/* Gradient overlay pour améliorer la lisibilité */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                              </div>

                              {/* Logo de la marque en haut à gauche */}
                              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                                <div className="brand-logo-container">
                                  {pilote.marque && MARQUES[pilote.marque] ? (
                                    <SmartBrandLogo
                                      key={`brand-${activeTab}-${pilote.numero}`}
                                      src={MARQUES[pilote.marque].logo}
                                      alt={MARQUES[pilote.marque].nom}
                                      className="brand-logo"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                                      <span className="text-xs text-white font-bold">
                                        ?
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Numéro style motocross en haut à droite */}
                              <div className="absolute top-4 right-4">
                                <span className="text-white font-bold text-2xl tracking-wider drop-shadow-lg font-racing" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                                  {pilote.numero}
                                </span>
                              </div>

                              {/* Informations organisées en bas */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 to-transparent">
                                <div className="space-y-2">
                                  {/* Nom et prénom avec police Racing */}
                                  <div>
                                    <div className="text-white font-bold text-lg leading-tight tracking-wide drop-shadow-lg font-racing" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                      {pilote.prenom}
                                    </div>
                                    <div className="text-red-400 font-bold text-xl leading-tight tracking-wide drop-shadow-lg font-racing" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                      {pilote.nom}
                                    </div>
                                  </div>
                                  
                                  {/* Club */}
                                  {pilote.club && (
                                    <div className="text-gray-300 text-sm font-medium">
                                      {pilote.club}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Debug overlay temporaire - uniquement en développement */}
                              {process.env.NODE_ENV === 'development' && (
                                <DebugOverlay pilote={pilote} />
                              )}

                              {/* Debug en développement - désactivé */}
                              {/* {process.env.NODE_ENV === 'development' && (
                                <DebugBrand marque={pilote.marque} numero={pilote.numero} />
                              )} */}

                              {/* Overlay au hover */}
                              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Indicators avec compteur */}
            {maxSlides > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                {/* Compteur sur mobile */}
                <div className="md:hidden text-gray-400 text-sm">
                  {currentSlide + 1} / {maxSlides}
                </div>
                
                {/* Points indicateurs */}
                <div className="flex space-x-2">
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
              <div className="text-4xl font-bold text-red-500 mb-2">60+</div>
              <h3 className="text-lg font-semibold mb-2">Pilotes confirmés</h3>
              <p className="text-gray-400 text-sm">Répartis sur 3 catégories</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-green-500 mb-2">3</div>
              <h3 className="text-lg font-semibold mb-2">Catégories</h3>
              <p className="text-gray-400 text-sm">125cc, 250cc et 450cc</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-blue-500 mb-2">6h</div>
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

      {/* Diagnostic temporaire - uniquement en développement */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <PiloteDiagnostic 
            pilotes125={pilotes125}
            pilotes250={pilotes250}
            pilotes450={pilotes450}
          />
          <MarqueDebugPanel />
        </>
      )}

      {/* Debug temporaire - désactivé pour test */}
      {/* {process.env.NODE_ENV === 'development' && <BrandDebugger />} */}
      {/* <BrandTester /> */}
      
    </div>
  );
}
