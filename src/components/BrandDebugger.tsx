'use client';

import { useState } from 'react';

const BRANDS = [
  'gasgas.svg',
  'honda.svg',
  'husqvarna.svg',
  'kawasaki.svg',
  'ktm.svg',
  'stark.webp',
  'suzuki.svg',
  'yamaha.svg'
];

interface BrandDebugInfo {
  brand: string;
  src: string;
  timestamp: string;
  fetchStatus?: number;
  fetchOk?: boolean;
  contentType?: string | null;
  contentLength?: string | null;
  blobSize?: number;
  blobType?: string;
  error?: string;
  imageLoad?: 'success' | 'failed';
  naturalWidth?: number;
  naturalHeight?: number;
}

export function BrandDebugger() {
  const [debugInfo, setDebugInfo] = useState<{ [key: string]: BrandDebugInfo }>({});

  const testBrand = async (brand: string) => {
    const src = `/images/marques/${brand}`;
    const info: BrandDebugInfo = {
      brand,
      src,
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      // Test de fetch
      const response = await fetch(src);
      info.fetchStatus = response.status;
      info.fetchOk = response.ok;
      info.contentType = response.headers.get('content-type');
      info.contentLength = response.headers.get('content-length');

      if (response.ok) {
        const blob = await response.blob();
        info.blobSize = blob.size;
        info.blobType = blob.type;
      }
    } catch (error) {
      info.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test de chargement d'image
    const img = new Image();
    const loadPromise = new Promise<void>((resolve, reject) => {
      img.onload = () => {
        info.imageLoad = 'success';
        info.naturalWidth = img.naturalWidth;
        info.naturalHeight = img.naturalHeight;
        resolve();
      };
      img.onerror = () => {
        info.imageLoad = 'failed';
        reject();
      };
    });

    img.src = src;
    
    try {
      await loadPromise;
    } catch {
      // Erreur déjà capturée dans onerror
    }

    setDebugInfo(prev => ({ ...prev, [brand]: info }));
  };

  const testAllBrands = () => {
    BRANDS.forEach(brand => testBrand(brand));
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg max-w-md max-h-96 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Brand Debug</h3>
        <button
          onClick={testAllBrands}
          className="px-2 py-1 bg-blue-600 rounded text-sm hover:bg-blue-500"
        >
          Test All
        </button>
      </div>

      <div className="space-y-2">
        {BRANDS.map(brand => {
          const info = debugInfo[brand];
          return (
            <div key={brand} className="border border-gray-600 p-2 rounded text-xs">
              <div className="flex items-center justify-between mb-1">
                <strong className={brand.includes('honda') || brand.includes('kawasaki') ? 'text-red-400' : 'text-green-400'}>
                  {brand}
                </strong>
                <button
                  onClick={() => testBrand(brand)}
                  className="px-1 py-0.5 bg-gray-600 rounded text-xs hover:bg-gray-500"
                >
                  Test
                </button>
              </div>
              
              {info && (
                <div className="space-y-1 text-gray-300">
                  <div>Fetch: {info.fetchOk ? '✅' : '❌'} ({info.fetchStatus})</div>
                  <div>Image: {info.imageLoad === 'success' ? '✅' : '❌'}</div>
                  {info.contentType && <div>Type: {info.contentType}</div>}
                  {info.blobSize && <div>Size: {info.blobSize} bytes</div>}
                  {info.naturalWidth && <div>Dims: {info.naturalWidth}x{info.naturalHeight}</div>}
                  {info.error && <div className="text-red-400">Error: {info.error}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-2 border-t border-gray-600">
        <div className="text-xs text-gray-400">
          Problématiques: Honda, Kawasaki
        </div>
      </div>
    </div>
  );
}
