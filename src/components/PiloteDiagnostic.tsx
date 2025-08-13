'use client';

import { MARQUES } from '@/lib/data/marques';

interface Pilote {
  numero: number;
  prenom: string;
  nom: string;
  club: string;
  image: string;
  marque: string;
}

interface DiagnosticReport {
  piloteNumber: number;
  piloteName: string;
  marqueValue: string;
  marqueExists: boolean;
  logoPath?: string;
  category: string;
}

interface PiloteDiagnosticProps {
  pilotes125: Pilote[];
  pilotes250: Pilote[];
  pilotes450: Pilote[];
}

export function PiloteDiagnostic({ pilotes125, pilotes250, pilotes450 }: PiloteDiagnosticProps) {
  const allPilotes = [
    ...pilotes125.map(p => ({ ...p, category: '125cc' })),
    ...pilotes250.map(p => ({ ...p, category: '250cc' })),
    ...pilotes450.map(p => ({ ...p, category: '450cc' }))
  ];

  const diagnostics: DiagnosticReport[] = allPilotes.map(pilote => {
    const marqueExists = Boolean(pilote.marque && MARQUES[pilote.marque]);
    return {
      piloteNumber: pilote.numero,
      piloteName: `${pilote.prenom} ${pilote.nom}`,
      marqueValue: pilote.marque || 'UNDEFINED',
      marqueExists,
      logoPath: marqueExists ? MARQUES[pilote.marque].logo : undefined,
      category: pilote.category
    };
  });

  const problematicPilotes = diagnostics.filter(d => !d.marqueExists);

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/95 text-white p-4 rounded-lg max-w-lg max-h-96 overflow-auto">
      <h3 className="font-bold text-lg mb-4 text-red-400">Diagnostic Marques Pilotes</h3>
      
      <div className="mb-4">
        <div className="text-green-400">✅ Total pilotes: {diagnostics.length}</div>
        <div className="text-red-400">❌ Problèmes: {problematicPilotes.length}</div>
      </div>

      {problematicPilotes.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-red-300 mb-2">Pilotes problématiques:</h4>
          {problematicPilotes.map(p => (
            <div key={p.piloteNumber} className="bg-red-900/50 p-2 rounded mb-2 text-sm">
              <div className="font-semibold">#{p.piloteNumber} - {p.piloteName}</div>
              <div className="text-red-300">Catégorie: {p.category}</div>
              <div className="text-red-300">Marque: &quot;{p.marqueValue}&quot;</div>
              <div className="text-red-300">Existe: {p.marqueExists ? 'OUI' : 'NON'}</div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1">
        <h4 className="font-semibold text-blue-300">Marques disponibles:</h4>
        <div className="text-xs grid grid-cols-2 gap-1">
          {Object.keys(MARQUES).map(marque => (
            <div key={marque} className="text-green-300">✓ {marque}</div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h4 className="font-semibold text-yellow-300">Par catégorie:</h4>
        {['125cc', '250cc', '450cc'].map(cat => {
          const catPilotes = diagnostics.filter(d => d.category === cat);
          const catProblems = catPilotes.filter(d => !d.marqueExists);
          return (
            <div key={cat} className="text-xs">
              {cat}: {catProblems.length}/{catPilotes.length} problèmes
            </div>
          );
        })}
      </div>
    </div>
  );
}
