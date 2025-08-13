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

  // Fallback immédiat pour les logos de marques en production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // En production, utiliser directement l'URL avec un petit délai pour laisser le cache essayer
      const timer = setTimeout(() => {
        if (!directSrc) {
          setDirectSrc(src);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [src, directSrc]);

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
