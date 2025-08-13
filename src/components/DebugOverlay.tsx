'use client';

import { MARQUES } from '@/lib/data/marques';

interface DebugOverlayProps {
  pilote: {
    numero: number;
    prenom: string;
    nom: string;
    marque: string;
  };
}

export function DebugOverlay({ pilote }: DebugOverlayProps) {
  const marqueExists = pilote.marque && MARQUES[pilote.marque];
  const hasIssue = !marqueExists;

  if (!hasIssue) return null;

  return (
    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs p-1 rounded z-30">
      <div>#{pilote.numero}</div>
      <div>Marque: &quot;{pilote.marque}&quot;</div>
      <div>Status: {marqueExists ? 'OK' : 'MISSING'}</div>
    </div>
  );
}
