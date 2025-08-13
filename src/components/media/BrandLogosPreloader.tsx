'use client';

import { useEffect } from 'react';

// Hook pour précharger les logos de marques en production mobile
export function useBrandLogosPreloader() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    // Détecter mobile/tablette
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                           window.innerWidth < 1024;
    
    if (!isMobileDevice) return;
    
    console.log('🚀 [BrandLogosPreloader] Preloading brand logos for mobile production...');
    
    // Liste des logos à précharger
    const brandLogos = [
      '/images/marques/yamaha.svg',
      '/images/marques/ktm.svg',
      '/images/marques/gasgas.svg',
      '/images/marques/honda.svg',
      '/images/marques/kawasaki.svg',
      '/images/marques/husqvarna.svg',
      '/images/marques/suzuki.svg',
      '/images/marques/stark.webp'
    ];
    
    // Précharger chaque logo
    brandLogos.forEach((logoSrc, index) => {
      setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ [BrandLogosPreloader] Preloaded: ${logoSrc}`);
        };
        img.onerror = (error) => {
          console.error(`❌ [BrandLogosPreloader] Failed to preload: ${logoSrc}`, error);
        };
        img.src = logoSrc;
      }, index * 100); // Délai progressif pour éviter la surcharge
    });
  }, []);
}

// Composant pour intégrer le preloader
export function BrandLogosPreloader() {
  useBrandLogosPreloader();
  return null; // Composant invisible
}
