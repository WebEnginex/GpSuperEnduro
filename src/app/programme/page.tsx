'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, Trophy, Users, Crown } from 'lucide-react';
// Type pour les items du programme
type ProgrammeItem = {
  time: string;
  endTime?: string;
  duration?: string;
  title: string;
  description: string;
  category: string;
};
import { Badge } from "@/components/ui/badge";

export default function ProgrammePage() {
  const [activeTab, setActiveTab] = useState('mezzanine');
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);

  // Réinitialiser les filtres quand on change d'onglet
  useEffect(() => {
    setActiveFilters(['all']);
  }, [activeTab]);


  const programmePaddock: ProgrammeItem[] = [
    { time: "14:00", endTime: "14:10", duration: "0:10", title: "Essais libres SX 250", description: "Première session d'essais libres catégorie SX 250", category: "SX 250" },
    { time: "14:10", endTime: "14:20", duration: "0:10", title: "Essais libres SX 250", description: "Deuxième session d'essais libres catégorie SX 250", category: "SX 250" },
    { time: "14:20", endTime: "14:30", duration: "0:10", title: "Essais libres SX 450", description: "Première session d'essais libres catégorie SX 450", category: "SX 450" },
    { time: "14:30", endTime: "14:40", duration: "0:10", title: "Essais libres SX 450", description: "Deuxième session d'essais libres catégorie SX 450", category: "SX 450" },
    { time: "14:40", endTime: "14:50", duration: "0:10", title: "Essais libres SX JUNIOR", description: "Session d'essais libres catégorie SX JUNIOR", category: "SX JUNIOR" },
    { time: "15:00", endTime: "15:15", duration: "0:15", title: "Essais chronos SX 250", description: "Première session d'essais chronométrés SX 250", category: "SX 250" },
    { time: "15:15", endTime: "15:30", duration: "0:15", title: "Essais chronos SX 250", description: "Deuxième session d'essais chronométrés SX 250", category: "SX 250" },
    { time: "15:30", endTime: "15:45", duration: "0:15", title: "Essais chronos SX 450", description: "Première session d'essais chronométrés SX 450", category: "SX 450" },
    { time: "15:45", endTime: "16:00", duration: "0:15", title: "Essais chronos SX 450", description: "Deuxième session d'essais chronométrés SX 450", category: "SX 450" },
    { time: "16:00", endTime: "16:15", duration: "0:15", title: "Essais chronos SX JUNIOR", description: "Session d'essais chronométrés SX JUNIOR", category: "SX JUNIOR" },
    { time: "20:00", endTime: "20:20", duration: "0:20", title: "Cérémonie d'ouverture", description: "Cérémonie d'ouverture du Supercross", category: "Cérémonie" },
    { time: "20:20", endTime: "20:30", duration: "0:10", title: "SX 250 Demi-finale 1", description: "7 min + 1 tour", category: "SX 250" },
    { time: "20:30", endTime: "20:40", duration: "0:10", title: "SX 250 Demi-finale 2", description: "7 min + 1 tour", category: "SX 250" },
    { time: "20:40", endTime: "20:50", duration: "0:10", title: "SX 450 Demi-finale 1", description: "7 min + 1 tour", category: "SX 450" },
    { time: "20:50", endTime: "21:00", duration: "0:10", title: "SX 450 Demi-finale 2", description: "7 min + 1 tour", category: "SX 450" },
    { time: "21:15", endTime: "21:35", duration: "0:20", title: "Finale SX JUNIOR", description: "8 min + 1 tour + 1 tour reco + podium", category: "SX JUNIOR" },
    { time: "21:35", endTime: "21:40", duration: "0:05", title: "Repêchage SX 250", description: "4 min + 1 tour", category: "SX 250" },
    { time: "21:45", endTime: "21:50", duration: "0:05", title: "Repêchage SX 450", description: "4 min + 1 tour", category: "SX 450" },
    { time: "22:00", endTime: "22:20", duration: "0:20", title: "Finale SX 250", description: "9 min + 1 tour + tour reco + podium", category: "SX 250" },
    { time: "22:20", endTime: "22:40", duration: "0:20", title: "Finale SX 450", description: "9 min + 1 tour + tour reco + podium", category: "SX 450" }
  ];

  // Programme spécifique pour Mezzanine & Tribune basé sur le screen fourni
  const programmeMezzanine: ProgrammeItem[] = [
    { time: "20:00", endTime: "20:20", duration: "0:20", title: "Cérémonie d'ouverture", description: "Cérémonie d'ouverture du Supercross", category: "Cérémonie" },
    { time: "20:20", endTime: "20:30", duration: "0:10", title: "SX 250 Demi-finale 1", description: "7 min + 1 tour", category: "SX 250" },
    { time: "20:30", endTime: "20:40", duration: "0:10", title: "SX 250 Demi-finale 2", description: "7 min + 1 tour", category: "SX 250" },
    { time: "20:40", endTime: "20:50", duration: "0:10", title: "SX 450 Demi-finale 1", description: "7 min + 1 tour", category: "SX 450" },
    { time: "20:50", endTime: "21:00", duration: "0:10", title: "SX 450 Demi-finale 2", description: "7 min + 1 tour", category: "SX 450" },
    { time: "21:15", endTime: "21:35", duration: "0:20", title: "Finale SX JUNIOR", description: "8 min + 1 tour + 1 tour reco + podium", category: "SX JUNIOR" },
    { time: "21:35", endTime: "21:40", duration: "0:05", title: "Repêchage SX 250", description: "4 min + 1 tour", category: "SX 250" },
    { time: "21:45", endTime: "21:50", duration: "0:05", title: "Repêchage SX 450", description: "4 min + 1 tour", category: "SX 450" },
    { time: "22:00", endTime: "22:20", duration: "0:20", title: "Finale SX 250", description: "9 min + 1 tour + tour reco + podium", category: "SX 250" },
    { time: "22:20", endTime: "22:40", duration: "0:20", title: "Finale SX 450", description: "9 min + 1 tour + tour reco + podium", category: "SX 450" }
  ];

  const currentProgramme = activeTab === 'mezzanine' ? programmeMezzanine : programmePaddock;

  // Fonction pour gérer les filtres
  const toggleFilter = (filter: string) => {
    if (filter === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.includes('all') 
        ? [filter] 
        : activeFilters.includes(filter)
          ? activeFilters.filter(f => f !== filter)
          : [...activeFilters.filter(f => f !== 'all'), filter];
      
      setActiveFilters(newFilters.length === 0 ? ['all'] : newFilters);
    }
  };

  // Fonction pour convertir la durée au format "X minutes"
  const formatDuration = (duration: string): string => {
    const parts = duration.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[1]);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return duration;
  };

  // Mapper les catégories aux cylindrées
  const getCategoryCC = (category: string): string => {
    switch (category) {
      case 'SX 250': return '250cc';
      case 'SX 450': return '450cc';
      case 'SX JUNIOR': return '125cc';
      default: return 'other';
    }
  };

  // Filtrer le programme
  const filteredProgramme = activeFilters.includes('all') 
    ? currentProgramme 
    : currentProgramme.filter(item => {
        const categoryCC = getCategoryCC(item.category);
        // Afficher uniquement les catégories sélectionnées (exclure les cérémonies et autres)
        return activeFilters.includes(categoryCC);
      });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section noire sous le header */}
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            Supercross Douai 2025
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Programme</span> Officiel
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez le programme détaillé selon votre placement dans l&apos;enceinte
          </p>
        </div>
      </section>

      {/* Programme détaillé */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {activeTab === 'mezzanine' ? 'Programme Mezzanine & Tribune' : 'Programme VIP & Carré Or'}
            </h2>
            <p className="text-gray-400 text-lg">
              {activeTab === 'mezzanine' 
                ? 'Vivez l\'événement avec le programme standard'
                : 'Profitez d\'une expérience premium avec des avantages exclusifs'
              }
            </p>
          </div>

          {/* Sélection du type de programme */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row bg-gray-800/50 rounded-2xl p-2 gap-2 max-w-3xl mx-auto">
              <button
                onClick={() => setActiveTab('mezzanine')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'mezzanine'
                    ? 'animate-border-flow-mezzanine text-white animate-active-glow-mezzanine'
                    : 'bg-gray-700/30 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <Users className="w-5 h-5" />
                  <div>
                    <div className="text-lg font-bold">Mezzanine & Tribune</div>
                    <div className="text-sm opacity-80">Programme standard</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('paddock')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'paddock'
                    ? 'animate-border-flow-paddock text-white animate-active-glow-paddock'
                    : 'bg-gray-700/30 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <Crown className="w-5 h-5" />
                  <div>
                    <div className="text-lg font-bold">Tribune Paddock - Carré Or & VIP</div>
                    <div className="text-sm opacity-80">Expérience premium</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Système de filtres */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => toggleFilter('all')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeFilters.includes('all')
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Toutes les courses
              </button>
              <button
                onClick={() => toggleFilter('125cc')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeFilters.includes('125cc')
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">125cc (SX JUNIOR)</span>
                <span className="sm:hidden">125cc</span>
              </button>
              <button
                onClick={() => toggleFilter('250cc')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeFilters.includes('250cc')
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                250cc
              </button>
              <button
                onClick={() => toggleFilter('450cc')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeFilters.includes('450cc')
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                450cc
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredProgramme.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucune course trouvée</h3>
                <p className="text-gray-500">Aucun événement ne correspond aux filtres sélectionnés.</p>
              </div>
            ) : (
              filteredProgramme.map((item, index) => {
                return (
                  <div key={index} className="group">
                    <div className="flex gap-6 p-6 bg-gray-900/30 border border-gray-800 rounded-xl hover:bg-gray-900/50 hover:border-red-600/30 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          item.category === 'VIP' || item.category === 'Exclusif'
                            ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                            : item.category === 'SX 450'
                              ? 'bg-gradient-to-br from-red-600 to-red-700'
                              : item.category === 'SX 250'
                                ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                                : item.category === 'SX JUNIOR'
                                  ? 'bg-gradient-to-br from-green-600 to-green-700'
                                  : 'bg-gradient-to-br from-purple-600 to-purple-700'
                        }`}>
                          <span className="text-white font-bold text-lg">
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            {item.endTime && (
                              <div className="flex flex-col text-sm text-gray-400">
                                <span className="font-mono">Fin: {item.endTime}</span>
                                {item.duration && (
                                  <div className="flex items-center gap-1 font-mono">
                                    <Clock className="w-3 h-3 text-red-500" />
                                    <span>{formatDuration(item.duration)}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Informations complémentaires */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Informations pratiques</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Clock className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Durée</h3>
              <p className="text-gray-400">6h00 de spectacle</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Users className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Pilotes</h3>
              <p className="text-gray-400">Plus de 60 pilotes</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Trophy className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Catégories</h3>
              <p className="text-gray-400">SX 450, SX 250, SX JUNIOR</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Restauration</h3>
              <div className="text-gray-400 space-y-1">
                <p>🍺 Bar</p>
                <p>🥤 Boissons</p>
                <p>🍟 Friterie</p>
                <p>🥪 Snack</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
