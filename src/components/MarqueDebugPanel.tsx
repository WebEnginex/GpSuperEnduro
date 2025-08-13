'use client';

import { MARQUES } from '@/lib/data/marques';

export function MarqueDebugPanel() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/95 text-white p-4 rounded-lg max-w-sm max-h-64 overflow-auto">
      <h4 className="font-bold text-yellow-300 mb-2">Marques Config:</h4>
      <div className="text-xs space-y-1">
        {Object.entries(MARQUES).map(([key, marque]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-green-300">✓ {key}</span>
            <span className="text-gray-300">→ {marque.nom}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-600">
        <div className="text-xs text-gray-400">
          Total: {Object.keys(MARQUES).length} marques configurées
        </div>
      </div>
    </div>
  );
}
