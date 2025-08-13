'use client';

import { useState, useEffect } from 'react';

interface ProductionBrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductionBrandLogo({ src, alt, className = '' }: ProductionBrandLogoProps) {
  const [imageKey, setImageKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const maxRetries = 3;

  // Forcer le rechargement de l'image quand la source change
  useEffect(() => {
    setImageKey(prev => prev + 1);
    setHasError(false);
    setRetryCount(0);
    setIsLoaded(false);
    console.log(`🔄 [ProductionBrandLogo] New logo loading: ${src}`);
  }, [src]);

  const handleError = () => {
    console.error(`❌ [ProductionBrandLogo] Failed to load: ${src} (attempt ${retryCount + 1})`);
    
    if (retryCount < maxRetries) {
      // Retry avec un délai progressif
      const delay = (retryCount + 1) * 500;
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageKey(prev => prev + 1);
        console.log(`🔄 [ProductionBrandLogo] Retrying ${src} (attempt ${retryCount + 2})`);
      }, delay);
    } else {
      setHasError(true);
      console.error(`💥 [ProductionBrandLogo] Max retries reached for: ${src}`);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    console.log(`✅ [ProductionBrandLogo] Successfully loaded: ${src}`);
  };

  // Afficher un placeholder en cas d'erreur définitive
  if (hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
          <span className="text-xs text-white font-bold">
            {alt.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {/* Indicateur de chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`brand-logo-${imageKey}-${retryCount}`}
        src={retryCount === 0 ? `${src}?v=${imageKey}` : src} // Premier essai avec paramètre, puis sans
        alt={alt}
        className={`brand-logo transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
