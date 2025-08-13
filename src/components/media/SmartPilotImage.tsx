'use client';

import { PilotImage } from './PilotImage';
import { ProductionPilotImage } from './ProductionPilotImage';

interface SmartPilotImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function SmartPilotImage({ src, alt, className = '', priority = false }: SmartPilotImageProps) {
  // En production, utiliser la version sans cache pour éviter les problèmes
  if (process.env.NODE_ENV === 'production') {
    return (
      <ProductionPilotImage
        src={src}
        alt={alt}
        className={className}
        priority={priority}
      />
    );
  }

  // En développement, utiliser la version avec cache
  return (
    <PilotImage
      src={src}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
}
