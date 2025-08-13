'use client';

import { useState, useEffect } from 'react';

const PROBLEMATIC_BRANDS = ['honda', 'kawasaki'];

interface TestResult {
  brand: string;
  src: string;
  timestamp: string;
  fetchStatus?: number;
  fetchOk?: boolean;
  contentType?: string | null;
  contentLength?: number;
  isValidSVG?: boolean;
  fetchError?: string;
  imageLoad?: 'success' | 'failed';
  naturalWidth?: number;
  naturalHeight?: number;
  imageError?: string;
}

export function BrandTester() {
  const [results, setResults] = useState<{ [key: string]: TestResult }>({});

  const testBrand = async (brand: string) => {
    const src = `/images/marques/${brand}.svg`;
    console.log(`🧪 Testing ${brand} at ${src}`);
    
    const result: TestResult = {
      brand,
      src,
      timestamp: new Date().toLocaleTimeString()
    };

    // Test 1: Fetch API
    try {
      const response = await fetch(src);
      result.fetchStatus = response.status;
      result.fetchOk = response.ok;
      result.contentType = response.headers.get('content-type');
      
      if (response.ok) {
        const text = await response.text();
        result.contentLength = text.length;
        result.isValidSVG = text.includes('<svg');
        console.log(`✅ Fetch OK for ${brand}: ${response.status}, SVG: ${result.isValidSVG}`);
      } else {
        console.error(`❌ Fetch failed for ${brand}: ${response.status}`);
      }
    } catch (error) {
      result.fetchError = error instanceof Error ? error.message : 'Unknown error';
      console.error(`💥 Fetch error for ${brand}:`, error);
    }

    // Test 2: Image loading
    const img = new Image();
    const loadPromise = new Promise<void>((resolve, reject) => {
      img.onload = () => {
        result.imageLoad = 'success';
        result.naturalWidth = img.naturalWidth;
        result.naturalHeight = img.naturalHeight;
        console.log(`✅ Image load OK for ${brand}: ${img.naturalWidth}x${img.naturalHeight}`);
        resolve();
      };
      img.onerror = (e) => {
        result.imageLoad = 'failed';
        result.imageError = 'Load failed';
        console.error(`❌ Image load failed for ${brand}:`, e);
        reject();
      };
    });

    img.src = src;
    
    try {
      await loadPromise;
    } catch {
      // Erreur déjà loggée
    }

    setResults(prev => ({ ...prev, [brand]: result }));
  };

  useEffect(() => {
    // Test automatique au chargement
    PROBLEMATIC_BRANDS.forEach(brand => testBrand(brand));
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 bg-red-900/90 text-white p-4 rounded-lg max-w-sm">
      <h3 className="font-bold mb-2">Brand Loader Test</h3>
      
      {PROBLEMATIC_BRANDS.map(brand => {
        const result = results[brand];
        return (
          <div key={brand} className="mb-4 p-2 border border-red-600 rounded">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-red-200">{brand.toUpperCase()}</strong>
              <button
                onClick={() => testBrand(brand)}
                className="px-2 py-1 bg-red-600 rounded text-xs hover:bg-red-500"
              >
                Test
              </button>
            </div>
            
            {result && (
              <div className="text-xs space-y-1">
                <div>Fetch: {result.fetchOk ? '✅' : '❌'} ({result.fetchStatus})</div>
                <div>Image: {result.imageLoad === 'success' ? '✅' : '❌'}</div>
                {result.contentType && <div>Type: {result.contentType}</div>}
                {result.isValidSVG !== undefined && (
                  <div>Valid SVG: {result.isValidSVG ? '✅' : '❌'}</div>
                )}
                {result.naturalWidth && (
                  <div>Size: {result.naturalWidth}x{result.naturalHeight}</div>
                )}
                {result.fetchError && (
                  <div className="text-red-300">Fetch Error: {result.fetchError}</div>
                )}
                {result.imageError && (
                  <div className="text-red-300">Image Error: {result.imageError}</div>
                )}
              </div>
            )}

            {/* Test visuel direct */}
            <div className="mt-2 p-2 bg-white rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`/images/marques/${brand}.svg`} 
                alt={brand}
                className="w-16 h-8 object-contain"
                onLoad={() => console.log(`✅ Visual test OK for ${brand}`)}
                onError={() => console.error(`❌ Visual test failed for ${brand}`)}
              />
            </div>
          </div>
        );
      })}

      <div className="mt-4 text-xs text-red-300">
        Vérification Honda & Kawasaki
      </div>
    </div>
  );
}
