'use client';

import { useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';
import { getMediaType } from '@/lib/utils/fileUtils';
import { DevLogger } from '@/lib/utils/logger';

export function useAutoCache() {
  useEffect(() => {
    const replaceMediaElements = async () => {
      // Remplacer automatiquement toutes les images
      const images = document.querySelectorAll('img[src^="/images/"], img[src^="/videos/"]');
      DevLogger.info(`Détection de ${images.length} images à traiter`);
      
      for (const img of images) {
        const imgElement = img as HTMLImageElement;
        const originalSrc = imgElement.src;
        
        if (originalSrc.includes('/images/') || originalSrc.includes('/videos/')) {
          try {
            const mediaType = getMediaType(originalSrc);
            if (mediaType !== 'unknown') {
              const cachedSrc = await MediaCacheService.getOrFetchMedia(originalSrc, mediaType);
              imgElement.src = cachedSrc;
              DevLogger.cache('AUTO-REPLACE IMG', originalSrc);
            }
          } catch (error) {
            DevLogger.warn('Cache auto failed for:', originalSrc, error);
          }
        }
      }

      // Remplacer automatiquement toutes les vidéos
      const videos = document.querySelectorAll('video[src^="/videos/"]');
      DevLogger.info(`Détection de ${videos.length} vidéos à traiter`);
      
      for (const video of videos) {
        const videoElement = video as HTMLVideoElement;
        const originalSrc = videoElement.src;
        
        if (originalSrc.includes('/videos/')) {
          try {
            const cachedSrc = await MediaCacheService.getOrFetchMedia(originalSrc, 'video');
            videoElement.src = cachedSrc;
            DevLogger.cache('AUTO-REPLACE VIDEO', originalSrc);
          } catch (error) {
            DevLogger.warn('Cache auto failed for:', originalSrc, error);
          }
        }
      }
    };

    // Observer pour détecter les nouveaux éléments ajoutés dynamiquement
    const observer = new MutationObserver((mutations) => {
      let hasNewMedia = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Vérifier si des médias ont été ajoutés
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'IMG' || element.tagName === 'VIDEO' || 
                  element.querySelector('img, video')) {
                hasNewMedia = true;
                break;
              }
            }
          }
        }
      });
      
      if (hasNewMedia) {
        DevLogger.info('Nouveaux éléments média détectés, traitement...');
        replaceMediaElements();
      }
    });

    // Démarrer l'observation
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Remplacer les éléments existants
    DevLogger.info('Démarrage du cache automatique...');
    replaceMediaElements();

    return () => observer.disconnect();
  }, []);
}
