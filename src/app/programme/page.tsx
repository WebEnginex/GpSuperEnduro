'use client';

import { useState } from 'react';
import { Clock, Calendar, Trophy, Users, Crown, Target, Award } from 'lucide-react';
// Type pour les items du programme
type ProgrammeItem = {
  time: string;
  endTime?: string;
  duration?: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
};
import { Badge } from "@/components/ui/badge";

export default function ProgrammePage() {
  const [activeTab, setActiveTab] = useState('mezzanine');


  const programmePaddock: ProgrammeItem[] = [
    { time: "14:00", endTime: "14:10", duration: "0:10", title: "Essais libres SX2", description: "Première session d'essais libres catégorie SX2", icon: Clock, category: "SX2" },
    { time: "14:10", endTime: "14:20", duration: "0:10", title: "Essais libres SX2", description: "Deuxième session d'essais libres catégorie SX2", icon: Clock, category: "SX2" },
    { time: "14:20", endTime: "14:30", duration: "0:10", title: "Essais libres SX1", description: "Première session d'essais libres catégorie SX1", icon: Clock, category: "SX1" },
    { time: "14:30", endTime: "14:40", duration: "0:10", title: "Essais libres SX1", description: "Deuxième session d'essais libres catégorie SX1", icon: Clock, category: "SX1" },
    { time: "14:40", endTime: "14:50", duration: "0:10", title: "Essais libres SX JUNIOR", description: "Session d'essais libres catégorie SX JUNIOR", icon: Clock, category: "SX JUNIOR" },
    { time: "15:00", endTime: "15:15", duration: "0:15", title: "Essais chronos SX2", description: "Première session d'essais chronométrés SX2", icon: Target, category: "SX2" },
    { time: "15:15", endTime: "15:30", duration: "0:15", title: "Essais chronos SX2", description: "Deuxième session d'essais chronométrés SX2", icon: Target, category: "SX2" },
    { time: "15:30", endTime: "15:45", duration: "0:15", title: "Essais chronos SX1", description: "Première session d'essais chronométrés SX1", icon: Target, category: "SX1" },
    { time: "15:45", endTime: "16:00", duration: "0:15", title: "Essais chronos SX1", description: "Deuxième session d'essais chronométrés SX1", icon: Target, category: "SX1" },
    { time: "16:00", endTime: "16:15", duration: "0:15", title: "Essais chronos SX JUNIOR", description: "Session d'essais chronométrés SX JUNIOR", icon: Target, category: "SX JUNIOR" },
    { time: "20:00", endTime: "20:20", duration: "0:20", title: "Cérémonie d'ouverture", description: "Cérémonie d'ouverture du Supercross", icon: Users, category: "Cérémonie" },
    { time: "20:20", endTime: "20:30", duration: "0:10", title: "SX2 Demi-finale 1", description: "7 min + 1 tour", icon: Trophy, category: "SX2" },
    { time: "20:30", endTime: "20:40", duration: "0:10", title: "SX2 Demi-finale 2", description: "7 min + 1 tour", icon: Trophy, category: "SX2" },
    { time: "20:40", endTime: "20:50", duration: "0:10", title: "SX1 Demi-finale 1", description: "7 min + 1 tour", icon: Trophy, category: "SX1" },
    { time: "20:50", endTime: "21:00", duration: "0:10", title: "SX1 Demi-finale 2", description: "7 min + 1 tour", icon: Trophy, category: "SX1" },
    { time: "21:15", endTime: "21:35", duration: "0:20", title: "Finale SX JUNIOR", description: "8 min + 1 tour + 1 tour reco + podium", icon: Award, category: "SX JUNIOR" },
    { time: "21:35", endTime: "21:40", duration: "0:05", title: "Repechage SX2", description: "4 min + 1 tour", icon: Trophy, category: "SX2" },
    { time: "21:45", endTime: "21:50", duration: "0:05", title: "Repechage SX1", description: "4 min + 1 tour", icon: Trophy, category: "SX1" },
    { time: "22:00", endTime: "22:20", duration: "0:20", title: "Finale SX2", description: "9 min + 1 tour + tour reco + podium", icon: Award, category: "SX2" },
    { time: "22:20", endTime: "22:40", duration: "0:20", title: "Finale SX1", description: "9 min + 1 tour + tour reco + podium", icon: Award, category: "SX1" }
  ];

  // Pour Mezzanine & Tribune, on affiche le programme paddock à partir de la cérémonie d'ouverture
  const programmeMezzanineFiltered = programmePaddock.filter(item => {
    // On garde les items à partir de 20:00 inclus
    return item.time >= "20:00";
  });
  const currentProgramme = activeTab === 'mezzanine' ? programmeMezzanineFiltered : programmePaddock;

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
            <span className="text-red-600">Programme</span> Officiel
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez le programme détaillé selon votre placement dans l&apos;enceinte
          </p>
        </div>
      </section>

      {/* Onglets */}
      <section className="py-12 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row bg-gray-800/50 rounded-2xl p-2 gap-2">
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
          
          <div className="space-y-4">
            {currentProgramme.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="group">
                  <div className="flex gap-6 p-6 bg-gray-900/30 border border-gray-800 rounded-xl hover:bg-gray-900/50 hover:border-red-600/30 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        item.category === 'VIP' || item.category === 'Exclusif'
                          ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                          : item.category === 'SX1'
                            ? 'bg-gradient-to-br from-red-600 to-red-700'
                            : item.category === 'SX2'
                              ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                              : item.category === 'SX JUNIOR'
                                ? 'bg-gradient-to-br from-green-600 to-green-700'
                                : 'bg-gradient-to-br from-purple-600 to-purple-700'
                      }`}>
                        <IconComponent className="w-7 h-7 text-white" />
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
                          {item.category && (
                            <span className="inline-block mt-2 px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className="text-2xl font-bold text-red-500 font-mono">
                            {item.time}
                          </span>
                          {item.endTime && (
                            <div className="flex flex-col text-xs text-gray-400">
                              <span>Fin: {item.endTime}</span>
                              {item.duration && <span>Durée: {item.duration}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Informations complémentaires */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Informations pratiques</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Clock className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Durée</h3>
              <p className="text-gray-400">5h30 de spectacle</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Users className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Pilotes</h3>
              <p className="text-gray-400">Plus de 25 riders</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Trophy className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Catégories</h3>
              <p className="text-gray-400">SX1, SX2, SXF</p>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Format</h3>
              <p className="text-gray-400">Qualifs + Finales</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
