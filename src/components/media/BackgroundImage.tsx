'use client';

import { useState, useEffect } from 'react';
import { CachedImage } from './CachedImage';

interface BackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundImage({ src, alt, className = '', children }: BackgroundImageProps) {
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempts, setFallbackAttempts] = useState(0);
  const [finalSrc, setFinalSrc] = useState(src);

  // Gestion des fallbacks multiples
  useEffect(() => {
    if (imageError && fallbackAttempts === 0) {
      console.log('🔄 [BackgroundImage] First fallback: removing version parameter');
      setFinalSrc(src.split('?')[0]); // Enlever les paramètres de version
      setFallbackAttempts(1);
      setImageError(false);
    } else if (imageError && fallbackAttempts === 1) {
      console.log('🔄 [BackgroundImage] Second fallback: using direct browser load');
      setFallbackAttempts(2);
    }
  }, [imageError, fallbackAttempts, src]);

  const handleImageError = (error: string) => {
    console.error('❌ [BackgroundImage] Image failed to load:', error);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ [BackgroundImage] Image loaded successfully');
    setImageError(false);
  };

  // Si tous les fallbacks ont échoué, utiliser une image CSS en background
  if (fallbackAttempts >= 2 && imageError) {
    return (
      <div className={`relative ${className}`}>
        {/* Background en CSS */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${src.split('?')[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            background: 'linear-gradient(to bottom right, rgb(17, 24, 39), rgb(30, 41, 59), rgb(17, 24, 39))'
          }}
        />
        
        {/* Contenu par-dessus */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Image de background en position absolue */}
      <div className="absolute inset-0 z-0">
        <CachedImage
          src={finalSrc}
          alt={alt}
          className="w-full h-full"
          priority={true}
          loadingBackground="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          objectFit="cover"
          responsiveObjectFit={false}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      
      {/* Contenu par-dessus l'image */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
