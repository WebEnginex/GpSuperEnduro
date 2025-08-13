'use client';

import { useState, useEffect } from 'react';
import { CachedImage } from './CachedImage';

interface PiloteImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  loadingBackground?: string;
  width?: number;
  height?: number;
}

export function PiloteImage({ 
  src, 
  alt, 
  className, 
  priority = false, 
  loadingBackground = 'bg-gray-800',
  width,
  height 
}: PiloteImageProps) {
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempts, setFallbackAttempts] = useState(0);
  const [finalSrc, setFinalSrc] = useState(src);

  // Gestion des fallbacks multiples
  useEffect(() => {
    if (imageError && fallbackAttempts === 0) {
      console.log('🔄 [PiloteImage] First fallback: removing version parameter');
      setFinalSrc(src.split('?')[0]); // Enlever les paramètres de version
      setFallbackAttempts(1);
      setImageError(false);
    } else if (imageError && fallbackAttempts === 1) {
      console.log('🔄 [PiloteImage] Second fallback: force direct load');
      setFallbackAttempts(2);
    }
  }, [imageError, fallbackAttempts, src]);

  const handleImageError = (error: string) => {
    console.error('❌ [PiloteImage] Image failed to load:', error, 'for:', src);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ [PiloteImage] Image loaded successfully:', src);
    setImageError(false);
  };

  // Si tous les fallbacks ont échoué, afficher une image placeholder
  if (fallbackAttempts >= 2 && imageError) {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center`}
        style={width && height ? { width, height } : {}}
      >
        <div className="text-white/50 text-center p-4">
          <div className="text-lg">🏍️</div>
          <div className="text-xs mt-1">Image indisponible</div>
        </div>
      </div>
    );
  }

  return (
    <CachedImage
      src={finalSrc}
      alt={alt}
      className={className}
      priority={priority}
      loadingBackground={loadingBackground}
      width={width}
      height={height}
      onLoad={handleImageLoad}
      onError={handleImageError}
      // Force object-fit pour les images de pilotes
      objectFit="cover"
      responsiveObjectFit={false}
    />
  );
}
