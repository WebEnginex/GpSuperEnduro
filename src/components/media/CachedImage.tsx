'use client';

import { useMediaCache } from '@/hooks/useMediaCache';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CachedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loadingBackground?: string; // Nouvelle prop pour personnaliser le fond de chargement
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export function CachedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  priority = false,
  loadingBackground = 'bg-gray-100', // Valeur par défaut
  onLoad,
  onError 
}: CachedImageProps) {
  const { src: cachedSrc, isLoading, error } = useMediaCache(src, 'image', {
    strategy: 'cache-first',
    preload: priority
  });
  
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    const errorMsg = error || 'Erreur de chargement de l\'image';
    onError?.(errorMsg);
  };

  if (error && !cachedSrc) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Erreur de chargement</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Indicateur de chargement */}
      {(isLoading || !imageLoaded) && (
        <div 
          className={`absolute inset-0 flex items-center justify-center ${loadingBackground} ${className}`}
          style={{ width, height }}
        >
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}
      
      {/* Image */}
      {cachedSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cachedSrc}
          alt={alt}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
}
