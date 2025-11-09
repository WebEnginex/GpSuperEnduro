'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

export default function ProgrammePage() {
  const [activeTab, setActiveTab] = useState('premium');

  const renderProgramme = () => {
    const programmeContent = (
      <div className="space-y-6">
        {/* 13H00 - seulement pour Pass Premium */}
        {activeTab === 'premium' && (
          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">13H00</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Ouverture des portes
              </h3>
              <p className="text-gray-400 text-sm">
                Accès aux essais - qualifications + stands des pilotes
              </p>
            </div>
          </div>
        )}

        {/* 17H00 - seulement pour Pass Premium */}
        {activeTab === 'premium' && (
          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">17H00</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Visite du circuit
              </h3>
              
            </div>
          </div>
        )}

        {/* 17H30 */}
        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">17H30</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Ouverture des portes tickets catégorie 1, 2 et 3
            </h3>
          </div>
        </div>

        {/* 18H00 */}
        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">18H00</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Séance d&apos;autographes avec les 8 meilleurs pilotes mondiaux
            </h3>
          </div>
        </div>

        {/* 19H40 */}
        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">19H40</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Cérémonie d&apos;ouverture + présentation des pilotes
            </h3>
            
          </div>
        </div>

        {/* 20H00 */}
        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">20H00</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              SuperPole FIM World Championship
            </h3>
          </div>
        </div>

        {/* 20H20 */}
        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">20H20</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Début des compétitions du championnat du monde
            </h3>
          </div>
        </div>

        {/* 22H30 */}
        <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">22H30</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Remise des prix FIM World Championship
            </h3>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {programmeContent}
        
        {/* Section Services selon l'onglet */}
        <div className="mt-12 bg-gray-800/30 rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Services Disponibles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Services généraux */}
            <div className="space-y-4">
              {/* Parking */}
              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-2xl">🚗</div>
                <p className="text-gray-300">
                  {activeTab === 'premium' 
                    ? 'Parking au plus proche pour les Pass Premium et PMR (dans l\'enceinte de Gayant Expo)'
                    : 'Parkings périphériques pour les tickets 1, 2 et 3'
                  }
                </p>
              </div>
              
              {/* Restauration */}
              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-2xl">🍟</div>
                <p className="text-gray-300">Friterie - Sandwicherie - Crêperie - Bar</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Boutiques */}
              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-2xl">🛍️</div>
                <p className="text-gray-300">Boutique officielle du SuperEnduro World Championship</p>
              </div>
              
              {/* Magasins partenaires */}
              <div className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-2xl">🏪</div>
                <p className="text-gray-300">Magasins partenaires</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Programme – Grand Prix Super Enduro Douai"
        description="Consultez le programme complet du Grand Prix Super Enduro le 7 mars 2026 à Douai : horaires des épreuves, cérémonie d'ouverture, SuperPole et remise des prix du championnat du monde."
        url="https://www.gpsuperendurofrance.fr/programme"
      />
      {/* Section noire sous le header */}
      <section id="main-content" className="relative bg-black py-16 pt-64 sm:pt-72 lg:pt-80">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            SuperEnduro 2026
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-red-600">Programme</span> Officiel
          </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Découvrez le programme officiel du Grand Prix Super Enduro 2026 à Douai.
            </p>
        </div>
      </section>

      {/* Programme Section */}
      <section className="py-16 bg-gradient-to-b from-black via-gray-900/30 to-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Programme du 7 Mars 2026
            </h2>
            
            {/* Onglets */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-800/50 rounded-lg p-1 border border-gray-700">
                <button
                  onClick={() => setActiveTab('premium')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'premium'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  🌟 Pass Premium
                </button>
                <button
                  onClick={() => setActiveTab('standard')}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'standard'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Catégorie 1, 2 et 3
                </button>
              </div>
            </div>
            
            {/* Contenu du programme selon l'onglet */}
            {renderProgramme()}

            
          </div>
        </div>
      </section>
    </div>
  );
}
