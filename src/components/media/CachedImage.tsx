'use client';

import { useAutoMediaCache } from '@/hooks/useAutoCache';
import { useState, useEffect } from 'react';
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
  loadingBackground = 'bg-transparent', // Fond transparent par défaut
  onLoad,
  onError 
}: CachedImageProps) {
  const { src: cachedSrc, isLoading, error } = useAutoMediaCache(src, 'image', {
    strategy: 'cache-first',
    preload: priority
  });
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  // Afficher le placeholder seulement après un délai
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowPlaceholder(true);
      }, 200); // Attendre 200ms avant d'afficher le placeholder
      
      return () => clearTimeout(timer);
    } else {
      setShowPlaceholder(false);
    }
  }, [isLoading]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setShowPlaceholder(false);
    onLoad?.();
  };

  const handleImageError = () => {
    const errorMsg = error || 'Erreur de chargement de l\'image';
    setShowPlaceholder(false);
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
      {/* Indicateur de chargement seulement après délai et si vraiment en cours de chargement */}
      {isLoading && showPlaceholder && (
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
