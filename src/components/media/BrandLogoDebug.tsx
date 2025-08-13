'use client';

import { useEffect, useState } from 'react';

interface BrandLogoDebugProps {
  src: string;
  alt: string;
  pilotName: string;
}

export function BrandLogoDebug({ src, alt, pilotName }: BrandLogoDebugProps) {
  const [debugInfo, setDebugInfo] = useState<{
    loadStatus: 'loading' | 'success' | 'error';
    loadTime: number;
    cacheUsed: boolean;
    errorDetails?: string;
  }>({
    loadStatus: 'loading',
    loadTime: 0,
    cacheUsed: false
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    const startTime = Date.now();
    console.log(`🐛 [BrandLogoDebug] Testing logo for ${pilotName}: ${src}`);
    
    const img = new Image();
    
    img.onload = () => {
      const loadTime = Date.now() - startTime;
      setDebugInfo({
        loadStatus: 'success',
        loadTime,
        cacheUsed: false // Assumons que c'est direct en production
      });
      console.log(`✅ [BrandLogoDebug] Logo loaded for ${pilotName} in ${loadTime}ms`);
    };
    
    img.onerror = (error) => {
      const loadTime = Date.now() - startTime;
      setDebugInfo({
        loadStatus: 'error',
        loadTime,
        cacheUsed: false,
        errorDetails: `Failed to load after ${loadTime}ms`
      });
      console.error(`❌ [BrandLogoDebug] Logo failed for ${pilotName}:`, error);
    };
    
    img.src = src;
    
    // Timeout après 5 secondes
    const timeout = setTimeout(() => {
      if (debugInfo.loadStatus === 'loading') {
        setDebugInfo(prev => ({
          ...prev,
          loadStatus: 'error',
          loadTime: 5000,
          errorDetails: 'Timeout after 5s'
        }));
        console.warn(`⏰ [BrandLogoDebug] Logo timeout for ${pilotName}`);
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [src, pilotName, debugInfo.loadStatus]);

  // N'afficher le debug qu'en production pour les marques problématiques
  if (process.env.NODE_ENV !== 'production') return null;
  
  const isProblematicBrand = ['gasgas', 'stark', 'husqvarna'].some(brand => src.includes(brand));
  if (!isProblematicBrand) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-1 opacity-75">
      <div>Brand: {alt}</div>
      <div>Status: {debugInfo.loadStatus}</div>
      <div>Time: {debugInfo.loadTime}ms</div>
      {debugInfo.errorDetails && <div>Error: {debugInfo.errorDetails}</div>}
    </div>
  );
}
