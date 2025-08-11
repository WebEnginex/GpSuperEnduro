'use client';

import { useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';

export function BackgroundPreloader() {
  useEffect(() => {
    const preloadBackground = async () => {
      try {
        // Précharger l'image de background en priorité absolue
        await MediaCacheService.preloadMedia([
          { url: '/images/background/supercross-sxtour-bg.webp', type: 'image' }
        ]);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('🖼️ Background image preloaded successfully');
        }
      } catch (error) {
        console.warn('Failed to preload background:', error);
      }
    };

    preloadBackground();
  }, []);

  // Ce composant ne rend rien mais assure le préchargement
  return null;
}
