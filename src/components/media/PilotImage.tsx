'use client';

import { useState, useEffect } from 'react';
import { CachedImage } from './CachedImage';

interface PilotImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function PilotImage({ src, alt, className = '', priority = false }: PilotImageProps) {
  const [hasError, setHasError] = useState(false);
  const [directSrc, setDirectSrc] = useState<string | null>(null);

  // En production, activer le fallback plus rapidement pour les images de pilotes
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const timer = setTimeout(() => {
        if (!directSrc) {
          console.log(`🏃‍♂️ [PilotImage] Production fallback activated for: ${src}`);
          setDirectSrc(src);
        }
      }, 2000); // Fallback plus rapide pour les pilotes
      
      return () => clearTimeout(timer);
    }
  }, [src, directSrc]);

  const handleError = (error: string) => {
    console.warn(`Pilot image error: ${error}, using direct URL`);
    setHasError(true);
    setDirectSrc(src);
  };

  // En cas d'erreur ou avec fallback en production
  if (hasError || directSrc) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={directSrc || src}
          alt={alt}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          onError={() => {
            console.error(`Failed to load pilot image: ${src}`);
            setHasError(true);
          }}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  // Essayer d'abord avec le cache
  return (
    <CachedImage
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      loadingBackground="bg-gray-800"
      onError={handleError}
    />
  );
}
