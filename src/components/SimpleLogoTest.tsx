'use client';

import { MARQUES } from '@/lib/data/marques';

interface SimpleLogoTestProps {
  marque: string;
  piloteName: string;
}

export function SimpleLogoTest({ marque, piloteName }: SimpleLogoTestProps) {
  const marqueData = MARQUES[marque];
  
  if (!marqueData) {
    return (
      <div className="w-12 h-8 bg-red-600 text-white text-xs flex items-center justify-center rounded">
        X
      </div>
    );
  }

  return (
    <div className="w-12 h-8 relative">
      {/* Test 1: Image simple */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={marqueData.logo}
        alt={marqueData.nom}
        className="w-full h-full object-contain"
        onLoad={() => console.log(`✅ [SimpleTest] ${marque} loaded for ${piloteName}`)}
        onError={() => console.error(`❌ [SimpleTest] ${marque} failed for ${piloteName}`)}
      />
    </div>
  );
}
