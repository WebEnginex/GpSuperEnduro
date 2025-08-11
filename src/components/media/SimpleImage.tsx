'use client';

import { useState } from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  loadingBackground?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export function SimpleImage({ 
  src, 
  alt, 
  className,
  loadingBackground = 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
  onLoad,
  onError 
}: SimpleImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.('Erreur de chargement de l\'image');
  };

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      {/* Background de fallback toujours visible */}
      <div 
        className={`absolute inset-0 ${loadingBackground}`}
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Indicateur de chargement */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Message d'erreur */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-sm bg-red-600/20 px-3 py-2 rounded">
            Erreur de chargement
          </div>
        </div>
      )}
      
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: imageLoaded ? 1 : 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="eager"
      />
    </div>
  );
}
