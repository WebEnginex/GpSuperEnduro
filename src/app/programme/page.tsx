'use client';

import { useState, useEffect } from 'react';
// import { Clock, Calendar, Trophy, Users, Crown } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
          Supercross Douai 2025
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="text-red-600">Programme</span> Officiel
        </h1>
        <h2>Le programme Officiel sera affiché à partir du 5 Octobre 2025</h2>
      </div>
      {/*
      <section className="relative bg-black py-16 pt-56 sm:pt-60 lg:pt-64">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          ...
        </div>
      </section>

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
          ...
        </div>
      </section>
      */}
    </div>
  );
}
