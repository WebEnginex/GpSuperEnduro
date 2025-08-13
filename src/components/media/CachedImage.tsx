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
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

  // Réinitialiser l'état quand la source change
  useEffect(() => {
    setImageLoaded(false);
    setShowPlaceholder(false);
    setFallbackSrc(null);
  }, [src]);

  // Fallback pour l'image de background si le cache échoue
  useEffect(() => {
    if (error && src.includes('background') && !fallbackSrc) {
      console.log(`🔄 [CachedImage] Background cache failed, trying direct URL`);
      setFallbackSrc(src.split('?')[0]); // URL sans paramètres de version
    }
  }, [error, src, fallbackSrc]);

  // Pour l'image de background, toujours utiliser 'cover' pour remplir l'écran
  const isBackgroundImage = src.includes('background');
  const finalObjectFit = isBackgroundImage ? 'cover' : (responsiveObjectFit ? (isMobile ? 'cover' : 'contain') : objectFit);

  // Force l'affichage direct pour les images de background sur mobile si le cache échoue
  useEffect(() => {
    if (isBackgroundImage && !cachedSrc && !fallbackSrc && isMobile) {
      console.log(`📱 [CachedImage] Mobile background: forcing direct URL fallback`);
      setFallbackSrc(src.split('?')[0]); // URL sans paramètres de version
    }
  }, [isBackgroundImage, cachedSrc, fallbackSrc, isMobile, src]);

  // Fallback pour les images de pilotes et marques si le cache échoue
  useEffect(() => {
    const isPiloteImage = src.includes('/images/pilotes_');
    const isMarqueImage = src.includes('/images/marques/');
    
    // Activer le fallback immédiatement si pas de cache ou en cas d'erreur
    if ((isPiloteImage || isMarqueImage) && (!cachedSrc || error) && !fallbackSrc) {
      console.log(`🔄 [CachedImage] ${isPiloteImage ? 'Pilote' : 'Marque'} image fallback activated:`, src);
      setFallbackSrc(src.split('?')[0]); // URL sans paramètres de version
    }
  }, [src, cachedSrc, fallbackSrc, error]);

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

  // Logs pour debug uniquement pour les images de background
  useEffect(() => {
    if (isBackgroundImage) {
      console.log(`🖼️ [CachedImage] Background image state:`, {
        cachedSrc: !!cachedSrc,
        fallbackSrc: !!fallbackSrc,
        error,
        isLoading,
        finalSrc: cachedSrc || fallbackSrc,
        priority,
        isMobile,
        url: src
      });
    }
  }, [cachedSrc, fallbackSrc, error, isLoading, src, priority, isMobile, isBackgroundImage]);

  // Logs pour debug des images de pilotes et marques
  useEffect(() => {
    const isPiloteImage = src.includes('/images/pilotes_');
    const isMarqueImage = src.includes('/images/marques/');
    
    if (isPiloteImage || isMarqueImage) {
      console.log(`👤 [CachedImage] Pilote/Marque image state:`, {
        type: isPiloteImage ? 'pilote' : 'marque',
        cachedSrc: !!cachedSrc,
        fallbackSrc: !!fallbackSrc,
        error,
        isLoading,
        finalSrc: cachedSrc || fallbackSrc,
        url: src
      });
    }
  }, [cachedSrc, fallbackSrc, error, isLoading, src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setShowPlaceholder(false);
    onLoad?.();
    
    // Log pour le background
    if (src.includes('background')) {
      console.log(`🖼️ [CachedImage] Background image loaded successfully`);
    }
  };

  const handleImageError = () => {
    const errorMsg = error || 'Erreur de chargement de l\'image';
    setShowPlaceholder(false);
    
    // Si pas de fallback et que c'est une image importante, forcer le fallback
    const isPiloteImage = src.includes('/images/pilotes_');
    const isMarqueImage = src.includes('/images/marques/');
    
    if ((isPiloteImage || isMarqueImage) && !fallbackSrc) {
      console.log(`🚨 [CachedImage] Image error, forcing fallback:`, src);
      setFallbackSrc(src.split('?')[0]);
      return; // Ne pas déclencher onError encore
    }
    
    // Log pour le background
    if (src.includes('background')) {
      console.error(`❌ [CachedImage] Background image failed to load:`, errorMsg);
    }
    
    onError?.(errorMsg);
  };

  if (error && !cachedSrc && !fallbackSrc) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Erreur de chargement</span>
      </div>
    );
  }

  // Utiliser cachedSrc en priorité, sinon fallbackSrc
  const finalSrc = cachedSrc || fallbackSrc;

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
      {finalSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finalSrc}
          alt={alt}
          className={`absolute inset-0 transition-opacity duration-500`}
          style={{
            opacity: imageLoaded ? 1 : 0,
            width: '100%',
            height: '100%',
            objectFit: finalObjectFit,
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
