'use client';

import { useState, useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';
import { MediaType } from '@/lib/db/models';
import { BlobURLManager } from '@/lib/cache/blobManager';

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
      
      // Logs pour tous les environnements si c'est l'image de background
      const isBackground = url.includes('background');
      if (isBackground || process.env.NODE_ENV === 'development') {
        console.log(`🔄 [useMediaCache] Loading: ${url}, cache disabled: ${disableCache}`);
      }
      
      setError(null);

      try {
        let mediaSrc: string;

        // Si le cache est désactivé ou en cas de problème, utiliser directement l'URL
        if (disableCache) {
          if (isBackground || process.env.NODE_ENV === 'development') {
            console.log(`🚫 [useMediaCache] Cache disabled for: ${url}`);
          }
          mediaSrc = url;
          if (mounted) {
            setSrc(mediaSrc);
            setIsLoading(false);
          }
        } else {
          // Pour les images critiques (pilotes, marques), ajouter un timeout plus court
          const isPiloteImage = url.includes('/images/pilotes_');
          const isMarqueImage = url.includes('/images/marques/');
          const isCriticalImage = isPiloteImage || isMarqueImage || isBackground;
          
          // Essayer de récupérer depuis le cache
          try {
            if (isBackground || process.env.NODE_ENV === 'development') {
              console.log(`📦 [useMediaCache] Trying cache for: ${url}`);
            }
            
            // Promise avec timeout pour les images critiques
            const cachePromise = MediaCacheService.getOrFetchMedia(url, type);
            const timeoutPromise = new Promise<never>((_, reject) => {
              setTimeout(() => reject(new Error('Cache timeout')), isCriticalImage ? 3000 : 10000);
            });
            
            const cachedMedia = await Promise.race([cachePromise, timeoutPromise]);
            
            if (mounted) {
              mediaSrc = cachedMedia;
              if (isBackground || process.env.NODE_ENV === 'development') {
                console.log(`✅ [useMediaCache] Got media for ${url}:`, cachedMedia.startsWith('blob:') ? 'CACHED (blob)' : 'DIRECT URL');
              }
              setSrc(mediaSrc);
              setIsLoading(false);
            }
          } catch (cacheError) {
            console.warn(`⚠️ [useMediaCache] Cache failed for ${url}, fallback to direct URL:`, cacheError);
            if (mounted) {
              mediaSrc = url; // Fallback vers l'URL directe
              setSrc(mediaSrc);
              setIsLoading(false);
            }
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erreur de chargement');
          setSrc(url); // Fallback vers l'URL originale
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
        BlobURLManager.releaseBlobURL(url);
      }
    };
  }, [src, url]);

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
