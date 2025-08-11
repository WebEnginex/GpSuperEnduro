'use client';

import { useMediaCache } from './useMediaCache';
import { MediaType } from '@/lib/db/models';
import { useEffect, useState } from 'react';

interface UseAutoMediaCacheOptions {
  strategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  preload?: boolean;
  forceDisableCache?: boolean;
}

export function useAutoMediaCache(url: string, type: MediaType, options: UseAutoMediaCacheOptions = {}) {
  const [shouldDisableCache, setShouldDisableCache] = useState(false);
  
  useEffect(() => {
    // Détection des conditions qui nécessitent de désactiver le cache
    const checkCacheSupport = () => {
      // 1. Vérification du support IndexedDB
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, disabling cache');
        setShouldDisableCache(true);
        return;
      }
      
      // 2. Test d'accès à IndexedDB pour détecter les restrictions
      const testIndexedDB = () => {
        try {
          const testRequest = indexedDB.open('test-db', 1);
          testRequest.onerror = () => {
            console.warn('IndexedDB access restricted, disabling cache');
            setShouldDisableCache(true);
          };
          testRequest.onsuccess = () => {
            indexedDB.deleteDatabase('test-db');
            // IndexedDB fonctionne, gardons le cache activé
          };
        } catch (error) {
          console.warn('IndexedDB test failed, disabling cache:', error);
          setShouldDisableCache(true);
        }
      };
      
      // 3. Vérification de la mémoire disponible uniquement si très faible
      const lowMemory = 'deviceMemory' in navigator && 
        (navigator as { deviceMemory?: number }).deviceMemory && 
        (navigator as { deviceMemory?: number }).deviceMemory! < 1; // Seuil plus restrictif
      
      // 4. Détection du mode privé/incognito
      const isPrivateMode = () => {
        try {
          // Test spécifique pour Safari en mode privé
          if ('webkitRequestFileSystem' in window) {
            (window as Window & { webkitRequestFileSystem?: (type: number, size: number, successCallback: () => void, errorCallback: () => void) => void }).webkitRequestFileSystem?.(0, 1, 
              () => {}, 
              () => {
                console.warn('Private mode detected, disabling cache');
                setShouldDisableCache(true);
              }
            );
          }
        } catch {
          // Ignorer les erreurs de détection du mode privé
        }
      };
      
      if (lowMemory) {
        console.log('Very low memory detected, disabling cache');
        setShouldDisableCache(true);
      } else {
        // Tester IndexedDB seulement si pas de mémoire faible
        testIndexedDB();
        isPrivateMode();
      }
    };
    
    checkCacheSupport();
  }, []);

  const disableCache = options.forceDisableCache || shouldDisableCache;

  // Images critiques qui doivent toujours essayer le cache même sur mobile
  const criticalImages = [
    '/images/background/supercross-sxtour-bg.webp?v=2025011',
    '/images/background/supercross-sxtour-bg.webp', // Fallback pour l'ancienne version
    '/images/partners/FFMOTO_LOGO.png',
    '/images/partners/Supercross_Championnat_FR.png',
    '/images/flags/france.svg'
  ];

  // Vérifier si l'URL correspond à une image critique (même avec paramètres de version)
  const isCriticalImage = criticalImages.some(criticalUrl => {
    // Comparaison exacte ou comparaison sans paramètres de version
    return url === criticalUrl || 
           (url.includes('?v=') && criticalUrl.includes('?v=') && 
            url.split('?')[0] === criticalUrl.split('?')[0]);
  });
  const finalDisableCache = disableCache && !isCriticalImage;

  return useMediaCache(url, type, {
    ...options,
    disableCache: finalDisableCache
  });
}