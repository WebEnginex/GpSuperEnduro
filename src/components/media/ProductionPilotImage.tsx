'use client';

import { useState, useEffect } from 'react';

interface ProductionPilotImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ProductionPilotImage({ src, alt, className = '', priority = false }: ProductionPilotImageProps) {
  const [imageKey, setImageKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Forcer le rechargement de l'image quand la source change
  useEffect(() => {
    setImageKey(prev => prev + 1);
    setIsLoaded(false);
    console.log(`🔄 [ProductionPilotImage] New image loading: ${src}`);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    console.log(`✅ [ProductionPilotImage] Image loaded: ${src}`);
  };

  const handleError = () => {
    console.error(`❌ [ProductionPilotImage] Failed to load: ${src}`);
    // Retry avec un nouveau key
    setTimeout(() => {
      setImageKey(prev => prev + 1);
    }, 1000);
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Placeholder pendant le chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Image principale */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`pilot-img-${imageKey}`}
        src={`${src}?v=${imageKey}`} // Ajouter un paramètre de version pour forcer le rechargement
        alt={alt}
        className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
