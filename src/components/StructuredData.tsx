'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Créer ou mettre à jour le script JSON-LD
    const scriptId = 'structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(data);
    
    return () => {
      // Nettoyage optionnel si le composant est démonté
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [data]);

  return null;
}
