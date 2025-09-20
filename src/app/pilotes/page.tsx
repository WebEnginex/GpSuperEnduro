'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { SmartPilotImage } from '@/components/media/SmartPilotImage';
import { useCacheCleaner } from '@/hooks/useCacheCleaner';

// Interface pour les pilotes avec marque
interface Pilote {
  numero: number;
  prenom: string;
  nom: string;
  club: string;
  image: string;
  marque?: string;
}

export default function PilotesPage() {
  // Nouvelles catégories: Junior, 125cc, Coupe d'europe, Prestige
  const [activeTab, setActiveTab] = useState('prestige');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Hook pour nettoyer le cache lors du changement de catégorie
  useCacheCleaner(activeTab);

  // Pilotes Junior (liste vide pour l'instant - en préparation)
  const pilotesJunior: Pilote[] = [];

  // Pilotes 125cc (liste vide pour l'instant)
  const pilotes125cc: Pilote[] = [];

  // Pilotes Coupe d'europe (liste vide pour l'instant)
  const pilotesCoupeEurope: Pilote[] = [];

  // Catégorie Prestige (liste fournie) — images et clubs en attente
  const pilotesPrestige: Pilote[] = [
    { numero: 57, prenom: 'Billy', nom: 'BOLT', club: '', image: 'images/pilotes_prestige/Billy-kwadrat.jpg', marque: 'ktm' },
    { numero: 22, prenom: 'Jonathan', nom: 'WALKER', club: '', image: 'images/pilotes_prestige/Jonny-kwadrat.jpg', marque: 'ktm' },
    { numero: 12, prenom: 'Mitchell', nom: 'BRIGHTMORE', club: '', image: 'images/pilotes_prestige/Mitch-kwadrat.jpg', marque: 'ktm' },
    { numero: 7, prenom: 'Ashton', nom: 'BRIGHTMORE', club: '', image: 'images/pilotes_prestige/Ash-kwadrat.jpg', marque: 'ktm' },
    { numero: 42, prenom: 'Eddie', nom: 'KARLSSON', club: '', image: 'images/pilotes_prestige/Eddie-kwadrat.jpg', marque: 'ktm' },
    { numero: 501, prenom: 'Dominik', nom: 'OLSZOWY', club: '', image: 'images/pilotes_prestige/Dominik-kwadrat.jpg', marque: 'ktm' },
    { numero: 120, prenom: 'Cooper', nom: 'ABBOTT', club: '', image: 'images/pilotes_prestige/Cooper-kwadrat.jpg', marque: 'ktm' },
    { numero: 89, prenom: 'Alfredo', nom: 'GOMEZ', club: '', image: 'images/pilotes_prestige/Alfredo-kwadrat.jpg', marque: 'ktm' },
    { numero: 96, prenom: 'Tim', nom: 'APOLLE', club: '', image: 'images/pilotes_prestige/Tim-kwadrat.jpg', marque: 'ktm' },
    { numero: 80, prenom: 'Will', nom: 'HOARE', club: '', image: 'images/pilotes_prestige/Will-kwadrat.jpg', marque: 'ktm' },
    { numero: 21, prenom: 'Diogo', nom: 'VIEIRA', club: '', image: 'images/pilotes_prestige/Diogo-kwadrat.jpg', marque: 'ktm' },
    { numero: 212, prenom: 'Toby', nom: 'MARTYN', club: '', image: 'images/pilotes_prestige/Toby-kwadrat.jpg', marque: 'ktm' },
    { numero: 16, prenom: 'Harry', nom: 'EDMONDSON', club: '', image: 'images/pilotes_prestige/Harry-kwadrat.jpg', marque: 'ktm' },
    { numero: 23, prenom: 'Jordi', nom: 'SALA', club: '', image: 'images/pilotes_prestige/Jordi-kwadrat.jpg', marque: 'ktm' },
    { numero: 83, prenom: 'Aleksander', nom: 'GOTKOWSKI', club: '', image: 'images/pilotes_prestige/Aleksander-kwadrat.jpg', marque: 'ktm' },
  ];

  const getCurrentPilotes = () => {
    switch (activeTab) {
      case 'junior':
        return pilotesJunior;
      case '125cc':
        return pilotes125cc;
      case 'coupe-europe':
        return pilotesCoupeEurope;
      case 'prestige':
        return pilotesPrestige;
      default:
        return pilotesPrestige;
    }
  };

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'junior':
        return 'from-green-600 to-green-700';
      case '125cc':
        return 'from-blue-600 to-blue-700';
      case 'coupe-europe':
        return 'from-purple-600 to-purple-700';
      case 'prestige':
        return 'from-red-600 to-red-700';
      default:
        return 'from-gray-600 to-gray-700';
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

  // Change font color of racing numbers to white
  const racingNumberStyle = { color: '#FFFFFF' }; // Define style for racing numbers

  return (
    <div className="min-h-screen bg-black text-white">
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
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 bg-black/60 backdrop-blur-sm rounded-2xl p-3 gap-3 border border-gray-700/50 shadow-2xl">
                {/* Junior */}
                <button
                  onClick={() => handleTabChange('junior')}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'junior'
                      ? `bg-gradient-to-r ${getTabColor('junior')} text-white shadow-lg transform scale-105 shadow-green-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-sm md:text-lg font-bold">Junior</div>
                  <div className="text-xs opacity-75 mt-1">Débutants</div>
                </button>

                {/* 125cc */}
                <button
                  onClick={() => handleTabChange('125cc')}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === '125cc'
                      ? `bg-gradient-to-r ${getTabColor('125cc')} text-white shadow-lg transform scale-105 shadow-blue-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-sm md:text-lg font-bold">125cc</div>
                  <div className="text-xs opacity-75 mt-1">SX 125</div>
                </button>

                {/* Coupe d'Europe */}
                <button
                  onClick={() => handleTabChange('coupe-europe')}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'coupe-europe'
                      ? `bg-gradient-to-r ${getTabColor('coupe-europe')} text-white shadow-lg transform scale-105 shadow-purple-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-sm md:text-lg font-bold">Coupe d&apos;Europe</div>
                  <div className="text-xs opacity-75 mt-1">Europe</div>
                </button>

                {/* Prestige */}
                <button
                  onClick={() => handleTabChange('prestige')}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'prestige'
                      ? `bg-gradient-to-r ${getTabColor('prestige')} text-white shadow-lg transform scale-105 shadow-red-500/25`
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600/30'
                  }`}
                >
                  <div className="text-sm md:text-lg font-bold">Prestige</div>
                  <div className="text-xs opacity-75 mt-1">Élite</div>
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
                <span className="text-white font-bold text-xs">
                  {activeTab === 'junior' && 'JUN'}
                  {activeTab === '125cc' && '125'}
                  {activeTab === 'coupe-europe' && 'EUR'}
                  {activeTab === 'prestige' && 'PRE'}
                </span>
              </div>
              <h2 className="text-3xl font-bold">
                {activeTab === 'junior' && (
                  <>Catégorie <span className="text-green-400">Junior</span></>
                )}
                {activeTab === '125cc' && (
                  <>Catégorie <span className="text-blue-400">125cc</span></>
                )}
                {activeTab === 'coupe-europe' && (
                  <>Catégorie <span className="text-purple-400">Coupe d&apos;Europe</span></>
                )}
                {activeTab === 'prestige' && (
                  <>Catégorie <span className="text-red-400">Prestige</span></>
                )}
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {activeTab === 'junior' && 'Les jeunes talents débutants qui découvrent le SuperEnduro'}
              {activeTab === '125cc' && 'Les pilotes de la catégorie 125cc SX'}
              {activeTab === 'coupe-europe' && 'Les participants à la Coupe d\'Europe SuperEnduro'}
              {activeTab === 'prestige' && "La catégorie Prestige, réunissant les meilleurs pilotes mondiaux"}
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
            {/* Message pour catégories vides */}
            {currentPilotes.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🏍️</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Catégorie en préparation
                  </h3>
                  <p className="text-gray-400">
                    Les pilotes de cette catégorie seront annoncés prochainement.
                  </p>
                </div>
              </div>
            ) : (
              <div>
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

                                  {/* Numéro en bas à droite */}
                                  <div className="absolute bottom-4 right-4">
                                    <span
                                      className="font-bold text-2xl tracking-wider drop-shadow-lg font-racing"
                                      style={{ ...racingNumberStyle, textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                                    >
                                      #{pilote.numero}
                                    </span>
                                  </div>

                                  {/* Informations en bas: nom/prénom à gauche */}
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
                                    </div>
                                  </div>

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
              <p className="text-gray-400 text-sm">Catégorie Prestige</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-4xl font-bold text-green-500 mb-2">4</div>
              <h3 className="text-lg font-semibold mb-2">Catégories</h3>
              <p className="text-gray-400 text-sm">Junior, 125cc, Coupe d&apos;Europe, Prestige</p>
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

      {/* Diagnostic temporaire - désactivé */}
      {/* Debug temporaire - désactivé pour test */}
      {/* {process.env.NODE_ENV === 'development' && <BrandDebugger />} */}
      {/* <BrandTester /> */}
      
    </div>
  );
}