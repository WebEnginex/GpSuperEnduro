'use client';

interface SmartBrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export function SmartBrandLogo({ src, alt, className = '' }: SmartBrandLogoProps) {
  // Utiliser la même logique simple qui fonctionne en développement
  
  return (
    <div className={`w-12 h-8 relative ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onLoad={() => console.log(`✅ [SmartBrandLogo] Loaded: ${src}`)}
        onError={() => console.error(`❌ [SmartBrandLogo] Failed: ${src}`)}
      />
    </div>
  );
}
