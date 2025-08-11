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
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; // Nouvelle prop pour objectFit
  objectPosition?: string; // Nouvelle prop pour objectPosition
  responsiveObjectFit?: boolean; // Nouvelle prop pour activer l'objectFit responsive
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
  onError,
  objectFit = 'cover', // Valeur par défaut
  objectPosition = 'center center', // Valeur par défaut
  responsiveObjectFit = false // Valeur par défaut
}: CachedImageProps) {
  const { src: cachedSrc, isLoading, error } = useAutoMediaCache(src, 'image', {
    strategy: 'cache-first',
    preload: priority
  });
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile/tablette pour l'objectFit responsive
  useEffect(() => {
    if (responsiveObjectFit) {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 1024); // lg breakpoint de Tailwind
      };
      
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
      
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, [responsiveObjectFit]);

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
    <div className={`relative ${className}`} style={width && height ? { width, height } : { width: '100%', height: '100%' }}>
      {/* Background de fallback toujours visible */}
      <div 
        className={`absolute inset-0 ${loadingBackground}`}
        style={width && height ? { width, height } : { width: '100%', height: '100%' }}
      />
      
      {/* Indicateur de chargement seulement après délai et si vraiment en cours de chargement */}
      {isLoading && showPlaceholder && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={width && height ? { width, height } : { width: '100%', height: '100%' }}
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
          className={`absolute inset-0 transition-opacity duration-500`}
          style={{
            opacity: imageLoaded ? 1 : 0,
            width: '100%',
            height: '100%',
            objectFit: responsiveObjectFit ? (isMobile ? 'cover' : 'contain') : objectFit,
            objectPosition: objectPosition
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
}
