'use client';

import { useState, useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';
import { MediaType } from '@/lib/db/models';

interface UseMediaCacheOptions {
  strategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  preload?: boolean;
}

export function useMediaCache(url: string, type: MediaType, options: UseMediaCacheOptions = {}) {
  const [src, setSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { strategy = 'cache-first', preload = false } = options;

  useEffect(() => {
    let mounted = true;

    const loadMedia = async () => {
      if (!url) return;
      
      setIsLoading(true);
      setError(null);

      try {
        let mediaSrc: string;

        switch (strategy) {
          case 'cache-first':
          default:
            mediaSrc = await MediaCacheService.getOrFetchMedia(url, type);
            break;
          // Autres stratégies peuvent être ajoutées ici
        }

        if (mounted) {
          setSrc(mediaSrc);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erreur de chargement');
          setSrc(url); // Fallback vers l'URL originale
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Préchargement si demandé
    if (preload && url) {
      MediaCacheService.preloadMedia([{ url, type }]);
    }

    loadMedia();

    return () => {
      mounted = false;
    };
  }, [url, type, strategy, preload]);

  // Nettoyer l'URL quand le composant se démonte
  useEffect(() => {
    return () => {
      if (src && src.startsWith('blob:')) {
        URL.revokeObjectURL(src);
      }
    };
  }, [src]);

  return {
    src,
    isLoading,
    error,
    // Fonctions utilitaires
    refresh: () => {
      setIsLoading(true);
      MediaCacheService.getOrFetchMedia(url, type).then(setSrc).finally(() => setIsLoading(false));
    }
  };
}
