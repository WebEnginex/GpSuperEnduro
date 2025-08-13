'use client';

import { useState, useEffect } from 'react';
import { CachedImage } from './CachedImage';

interface BrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export function BrandLogo({ src, alt, className = '' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [directSrc, setDirectSrc] = useState<string | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Réinitialiser l'état quand la source change
  useEffect(() => {
    setHasError(false);
    setDirectSrc(null);
    
    // En production, forcer l'utilisation directe pour éviter les problèmes de cache
    if (process.env.NODE_ENV === 'production') {
      console.log(`🏷️ [BrandLogo] Production: forcing direct URL for: ${src}`);
      setDirectSrc(src);
    }
  }, [src]);

  // Détecter le type d'appareil
  useEffect(() => {
    const checkMobileDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobileDevice(isMobile || isSmallScreen);
    };
    
    checkMobileDevice();
    window.addEventListener('resize', checkMobileDevice);
    return () => window.removeEventListener('resize', checkMobileDevice);
  }, []);

  // Fallback immédiat pour certaines marques problématiques en production mobile
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && isMobileDevice) {
      // Marques qui ont des problèmes de cache sur mobile
      const problematicBrands = ['gasgas', 'stark', 'husqvarna'];
      const isProblematicBrand = problematicBrands.some(brand => src.includes(brand));
      
      if (isProblematicBrand && !directSrc) {
        console.log(`🚨 [BrandLogo] Immediate fallback for problematic brand on mobile: ${src}`);
        setDirectSrc(src);
      }
    }
  }, [src, isMobileDevice, directSrc]);

  // Fallback immédiat pour les logos de marques en production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (isMobileDevice) {
        // Sur mobile/tablette en production, utiliser directement l'URL avec un délai très court
        const timer = setTimeout(() => {
          if (!directSrc) {
            console.log(`📱 [BrandLogo] Mobile/Tablet production fallback for: ${src}`);
            setDirectSrc(src);
          }
        }, 500); // Délai très court pour mobile
        
        return () => clearTimeout(timer);
      } else {
        // Sur desktop, délai plus long pour laisser le cache essayer
        const timer = setTimeout(() => {
          if (!directSrc) {
            console.log(`💻 [BrandLogo] Desktop production fallback for: ${src}`);
            setDirectSrc(src);
          }
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [src, directSrc, isMobileDevice]);

  const handleError = (error: string) => {
    console.warn(`Brand logo error: ${error}, using direct URL`);
    setHasError(true);
    setDirectSrc(src);
  };

  // En cas d'erreur ou en production avec fallback, utiliser l'image directe
  if (hasError || directSrc) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={directSrc || src}
          alt={alt}
          className="brand-logo"
          onError={() => console.error(`Failed to load brand logo: ${src}`)}
        />
      </div>
    );
  }

  // Essayer d'abord avec le cache
  return (
    <CachedImage
      src={src}
      alt={alt}
      className={`brand-logo ${className}`}
      loadingBackground="bg-transparent"
      onError={handleError}
      priority={true}
      objectFit="contain"
    />
  );
}
