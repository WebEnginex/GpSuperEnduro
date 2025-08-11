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
      
      // 2. Détection mobile/iOS qui peuvent avoir des problèmes
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      
      // 3. Détection de Safari qui peut avoir des problèmes avec IndexedDB
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      
      // 4. Vérification de la mémoire disponible (si supporté)
      const lowMemory = 'deviceMemory' in navigator && 
        (navigator as { deviceMemory?: number }).deviceMemory && 
        (navigator as { deviceMemory?: number }).deviceMemory! < 2;
      
      if (isMobile || isIOS || isSafari || lowMemory) {
        console.log('Mobile/Safari/Low memory detected, disabling cache for better compatibility');
        setShouldDisableCache(true);
      }
    };
    
    checkCacheSupport();
  }, []);

  const disableCache = options.forceDisableCache || shouldDisableCache;

  return useMediaCache(url, type, {
    ...options,
    disableCache
  });
}