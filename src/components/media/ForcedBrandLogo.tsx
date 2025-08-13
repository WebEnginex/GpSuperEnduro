'use client';

import { useState, useEffect } from 'react';

interface ForcedBrandLogoProps {
  marque: string;
  alt: string;
  className?: string;
}

export function ForcedBrandLogo({ marque, alt, className = '' }: ForcedBrandLogoProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Liste des marques problématiques
  const isProblematic = ['honda', 'kawasaki'].includes(marque.toLowerCase());
  
  // Pour les marques problématiques, utiliser un timestamp pour forcer le rechargement
  const src = isProblematic 
    ? `/images/marques/${marque}.svg?t=${Date.now()}&retry=${retryCount}`
    : `/images/marques/${marque}.svg`;

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [marque, retryCount]);

  const handleError = () => {
    console.error(`❌ [ForcedBrandLogo] Failed to load ${marque}: ${src}`);
    setError(true);
    
    // Retry pour les marques problématiques
    if (isProblematic && retryCount < 3) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        console.log(`🔄 [ForcedBrandLogo] Retrying ${marque} (attempt ${retryCount + 2})`);
      }, 1000);
    }
  };

  const handleLoad = () => {
    console.log(`✅ [ForcedBrandLogo] Successfully loaded ${marque}`);
    setLoaded(true);
    setError(false);
  };

  // Affichage d'erreur pour les marques qui ne se chargent pas
  if (error && retryCount >= 3) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
          <span className="text-xs text-white font-bold">
            {marque.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {/* Indicateur de chargement */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`forced-brand-${marque}-${retryCount}`}
        src={src}
        alt={alt}
        className={`brand-logo transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
