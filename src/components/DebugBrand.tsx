'use client';

import { MARQUES } from '@/lib/data/marques';

interface DebugBrandProps {
  marque: string;
  numero: number;
}

export function DebugBrand({ marque, numero }: DebugBrandProps) {
  const marqueData = MARQUES[marque];
  
  return (
    <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs p-2 rounded z-30">
      <div>Pilote #{numero}</div>
      <div>Marque: {marque}</div>
      <div>Data: {marqueData ? '✅' : '❌'}</div>
      {marqueData && <div>Logo: {marqueData.logo}</div>}
    </div>
  );
}
