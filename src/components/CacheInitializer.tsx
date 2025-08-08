'use client';

import { useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';
import { CACHE_CONFIG } from '@/lib/cache/config';
import { DevLogger } from '@/lib/utils/logger';

export function CacheInitializer() {
  useEffect(() => {
    const initializeCache = async () => {
      try {
        DevLogger.info('Initialisation du cache de médias...');
        
        // Nettoyer les fichiers expirés au démarrage
        await MediaCacheService.cleanExpiredFiles();
        
        // Afficher les stats actuelles
        const initialStats = await MediaCacheService.getCacheInfo();
        DevLogger.stats(initialStats);
        
        // Précharger les médias critiques depuis la config
        await MediaCacheService.preloadMedia(CACHE_CONFIG.CRITICAL_MEDIA);
        
        // Afficher les stats finales
        const finalStats = await MediaCacheService.getCacheInfo();
        DevLogger.stats(finalStats);
        
        DevLogger.success('Cache de médias initialisé avec succès');
      } catch (error) {
        DevLogger.error('Erreur initialisation cache:', error);
      }
    };

    initializeCache();

    // Nettoyer périodiquement (toutes les 30 minutes)
    const cleanupInterval = setInterval(async () => {
      DevLogger.info('Nettoyage périodique du cache...');
      await MediaCacheService.cleanExpiredFiles();
      
      // Afficher les stats après nettoyage
      const stats = await MediaCacheService.getCacheInfo();
      DevLogger.stats(stats);
    }, 30 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  return null; // Ce composant ne rend rien
}
