'use client';

import { useState } from 'react';
import { Clock, Calendar, Trophy, Users, MapPin, Crown, Target, Award } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function ProgrammePage() {
  const [activeTab, setActiveTab] = useState('mezzanine');

  const programmeMezzanine = [
    {
      time: "13:00",
      title: "Ouverture des portes",
      description: "Accueil du public et installation",
      icon: Users,
      category: "Accueil"
    },
    {
      time: "13:30",
      title: "Essais libres",
      description: "Sessions d'essais pour toutes les catégories",
      icon: Clock,
      category: "Essais"
    },
    {
      time: "14:30",
      title: "Qualifications SX1",
      description: "Qualifications de la catégorie Elite",
      icon: Target,
      category: "SX1"
    },
    {
      time: "15:00",
      title: "Qualifications SX2",
      description: "Qualifications catégorie nationale",
      icon: Target,
      category: "SX2"
    },
    {
      time: "15:30",
      title: "Qualifications SXF",
      description: "Qualifications catégorie féminine",
      icon: Target,
      category: "SXF"
    },
    {
      time: "16:30",
      title: "Finale SXF",
      description: "Finale de la catégorie Féminin",
      icon: Trophy,
      category: "SXF"
    },
    {
      time: "17:00",
      title: "Finale SX2",
      description: "Finale de la catégorie SX2",
      icon: Trophy,
      category: "SX2"
    },
    {
      time: "17:30",
      title: "Finale SX1",
      description: "Grande finale Elite",
      icon: Trophy,
      category: "SX1"
    },
    {
      time: "18:00",
      title: "Remise des prix",
      description: "Cérémonie de remise des prix",
      icon: Award,
      category: "Cérémonie"
    }
  ];

  const programmePaddock = [
    {
      time: "12:30",
      title: "Accueil VIP",
      description: "Accueil privilégié et installation en tribune Paddock",
      icon: Crown,
      category: "VIP"
    },
    {
      time: "13:00",
      title: "Visite des stands",
      description: "Accès exclusif aux stands et zone paddock",
      icon: MapPin,
      category: "Exclusif"
    },
    {
      time: "13:30",
      title: "Essais libres",
      description: "Vue privilégiée sur les essais depuis le paddock",
      icon: Clock,
      category: "Essais"
    },
    {
      time: "14:00",
      title: "Rencontre pilotes",
      description: "Session de dédicaces et photos avec les pilotes",
      icon: Users,
      category: "VIP"
    },
    {
      time: "14:30",
      title: "Qualifications SX1",
      description: "Vue imprenable sur les qualifications Elite",
      icon: Target,
      category: "SX1"
    },
    {
      time: "15:00",
      title: "Qualifications SX2",
      description: "Suivi des qualifications depuis la tribune privilégiée",
      icon: Target,
      category: "SX2"
    },
    {
      time: "15:30",
      title: "Qualifications SXF",
      description: "Qualifications féminines avec commentaires privés",
      icon: Target,
      category: "SXF"
    },
    {
      time: "16:00",
      title: "Cocktail VIP",
      description: "Pause rafraîchissements en zone exclusive",
      icon: Crown,
      category: "VIP"
    },
    {
      time: "16:30",
      title: "Finale SXF",
      description: "Finale féminine avec accès privilégié",
      icon: Trophy,
      category: "SXF"
    },
    {
      time: "17:00",
      title: "Finale SX2",
      description: "Finale SX2 depuis les meilleures places",
      icon: Trophy,
      category: "SX2"
    },
    {
      time: "17:30",
      title: "Finale SX1",
      description: "Grande finale Elite avec vue exceptionnelle",
      icon: Trophy,
      category: "SX1"
    },
    {
      time: "18:00",
      title: "Cérémonie VIP",
      description: "Accès privilégié à la remise des prix",
      icon: Award,
      category: "VIP"
    }
  ];

  const currentProgramme = activeTab === 'mezzanine' ? programmeMezzanine : programmePaddock;

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-lg text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Samedi 4 Octobre 2025</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>13H00 - 18H30</span>
            </div>
          </div>
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
                          : 'bg-gradient-to-br from-red-600 to-red-700'
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
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className="text-2xl font-bold text-red-500 font-mono">
                            {item.time}
                          </span>
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
