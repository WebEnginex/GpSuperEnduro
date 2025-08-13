'use client';

import { useEffect } from 'react';

export function useCacheCleaner(activeTab: string) {
  useEffect(() => {
    // En production, nettoyer le cache lors du changement de catégorie
    if (process.env.NODE_ENV === 'production') {
      console.log(`🧹 [CacheCleaner] Cleaning cache for category change: ${activeTab}`);
      
      // Nettoyer les URLs blob existantes
      const cleanBlobUrls = () => {
        if (typeof window !== 'undefined' && window.URL && window.URL.revokeObjectURL) {
          // Cette technique n'est pas parfaite mais force le navigateur à reconsidérer les ressources
          const images = document.querySelectorAll('img[src^="blob:"]');
          images.forEach((img) => {
            if (img instanceof HTMLImageElement) {
              const blobUrl = img.src;
              setTimeout(() => {
                try {
                  window.URL.revokeObjectURL(blobUrl);
                } catch {
                  // Ignorer les erreurs de nettoyage
                }
              }, 100);
            }
          });
        }
      };

      // Forcer le garbage collection des images
      const forceImageRefresh = () => {
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          if (img instanceof HTMLImageElement) {
            // Forcer le rechargement en ajoutant un paramètre de temps
            const src = img.src;
            if (src && (src.includes('pilotes_') || src.includes('marques/'))) {
              const separator = src.includes('?') ? '&' : '?';
              img.src = `${src}${separator}refresh=${Date.now()}`;
            }
          }
        });
      };

      // Nettoyer après un court délai
      const timer = setTimeout(() => {
        cleanBlobUrls();
        forceImageRefresh();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [activeTab]);
}
