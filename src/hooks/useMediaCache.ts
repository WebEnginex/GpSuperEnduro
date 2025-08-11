'use client';

import { useState, useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';
import { MediaType } from '@/lib/db/models';

interface UseMediaCacheOptions {
  strategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  preload?: boolean;
  disableCache?: boolean; // Nouvelle option pour désactiver le cache
}

export function useMediaCache(url: string, type: MediaType, options: UseMediaCacheOptions = {}) {
  const [src, setSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { strategy = 'cache-first', preload = false, disableCache = false } = options;

  useEffect(() => {
    let mounted = true;

    const loadMedia = async () => {
      if (!url) return;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 [useMediaCache] Loading: ${url}`);
      }
      setIsLoading(true);
      setError(null);

      try {
        let mediaSrc: string;

        // Si le cache est désactivé ou en cas de problème, utiliser directement l'URL
        if (disableCache) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`🚫 [useMediaCache] Cache disabled for: ${url}`);
          }
          mediaSrc = url;
        } else {
          switch (strategy) {
            case 'cache-first':
            default:
              if (process.env.NODE_ENV === 'development') {
                console.log(`📱 [useMediaCache] Cache-first strategy for: ${url}`);
              }
              // Timeout de 10 secondes pour le cache
              const cachePromise = MediaCacheService.getOrFetchMedia(url, type);
              const timeoutPromise = new Promise<string>((_, reject) => 
                setTimeout(() => reject(new Error('Cache timeout')), 10000)
              );
              
              try {
                mediaSrc = await Promise.race([cachePromise, timeoutPromise]);
                if (process.env.NODE_ENV === 'development') {
                  console.log(`✅ [useMediaCache] Got src for ${url}:`, mediaSrc.startsWith('blob:') ? 'BLOB (cached)' : 'ORIGINAL URL');
                }
              } catch (cacheError) {
                console.warn(`⚠️ [useMediaCache] Cache failed for ${url}, fallback to direct URL:`, cacheError);
                mediaSrc = url; // Fallback vers l'URL directe
              }
              break;
            // Autres stratégies peuvent être ajoutées ici
          }
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
  }, [url, type, strategy, preload, disableCache]);

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
