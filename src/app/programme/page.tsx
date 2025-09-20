'use client';

// import { useState, useEffect } from 'react';
// import { Clock, Calendar, Trophy, Users, Crown } from 'lucide-react';
// Type pour les items du programme
// type ProgrammeItem = {
//   time: string;
//   endTime?: string;
//   duration?: string;
//   title: string;
//   description: string;
//   category: string;
// };
import { Badge } from "@/components/ui/badge";

export default function ProgrammePage() {
  // Tout le code du programme est commenté pour n'afficher que le titre principal
  /*
  const [activeTab, setActiveTab] = useState('mezzanine');
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  useEffect(() => { setActiveFilters(['all']); }, [activeTab]);
  const programmePaddock: ProgrammeItem[] = [ ... ];
  const programmeMezzanine: ProgrammeItem[] = [ ... ];
  const currentProgramme = activeTab === 'mezzanine' ? programmeMezzanine : programmePaddock;
  const toggleFilter = (filter: string) => { ... };
  const formatDuration = (duration: string): string => { ... };
  const getCategoryCC = (category: string): string => { ... };
  const filteredProgramme = activeFilters.includes('all') ? currentProgramme : currentProgramme.filter(item => { ... });
  */

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
            Programme provisoire - Le programme définitif sera publié le 5 Octobre 2025
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
            
            <div className="space-y-6">
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
                  <p className="text-gray-400 text-sm">
                    Ouverture officielle de l&apos;événement avec la présentation de tous les pilotes
                  </p>
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

            {/* Note importante */}
            <div className="mt-8 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm text-center">
                ⚠️ Programme provisoire susceptible de modifications. 
                Le programme définitif sera publié le 5 Octobre 2025.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
