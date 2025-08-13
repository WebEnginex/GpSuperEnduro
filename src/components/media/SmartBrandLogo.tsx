'use client';

import { BrandLogo } from './BrandLogo';
import { ProductionBrandLogo } from './ProductionBrandLogo';

interface SmartBrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export function SmartBrandLogo({ src, alt, className = '' }: SmartBrandLogoProps) {
  // En production, utiliser la version sans cache pour éviter les problèmes
  if (process.env.NODE_ENV === 'production') {
    return (
      <ProductionBrandLogo
        src={src}
        alt={alt}
        className={className}
      />
    );
  }

  // En développement, utiliser la version avec cache
  return (
    <BrandLogo
      src={src}
      alt={alt}
      className={className}
    />
  );
}
