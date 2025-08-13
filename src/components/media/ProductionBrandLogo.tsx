'use client';

import { useState, useEffect } from 'react';

interface ProductionBrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductionBrandLogo({ src, alt, className = '' }: ProductionBrandLogoProps) {
  const [imageKey, setImageKey] = useState(0);

  // Forcer le rechargement de l'image quand la source change
  useEffect(() => {
    setImageKey(prev => prev + 1);
    console.log(`🔄 [ProductionBrandLogo] New logo loading: ${src}`);
  }, [src]);

  const handleError = () => {
    console.error(`❌ [ProductionBrandLogo] Failed to load: ${src}`);
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`brand-logo-${imageKey}`}
        src={`${src}?v=${imageKey}`} // Ajouter un paramètre de version pour forcer le rechargement
        alt={alt}
        className="brand-logo"
        onError={handleError}
      />
    </div>
  );
}
