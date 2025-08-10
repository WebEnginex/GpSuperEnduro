'use client';

import { useState, useEffect } from 'react';
import { MediaCacheService } from '@/lib/cache/mediaCache';

export function CacheDebugger() {
  const [cacheInfo, setCacheInfo] = useState<{
    totalSizeMB: number;
    maxSizeMB: number;
    usagePercent: number;
    totalSize: number;
    fileCount: number;
    oldestFile: Date | null;
    newestFile: Date | null;
  } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Afficher uniquement en développement
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!isDev) return; // Ne pas exécuter en production
    
    const updateCacheInfo = async () => {
      try {
        const info = await MediaCacheService.getCacheInfo();
        setCacheInfo(info);
        
        // Log l'info
        console.log('📊 Cache Stats:', info);
        setLogs(prev => [...prev.slice(-10), `📊 Cache: ${info.fileCount} files, ${info.totalSizeMB}MB (${info.usagePercent}%)`]);
      } catch (error) {
        console.error('❌ Erreur cache debug:', error);
        setLogs(prev => [...prev.slice(-10), `❌ Erreur: ${error}`]);
      }
    };

    // Vérifier immédiatement
    updateCacheInfo();
    
    // Puis toutes les 5 secondes
    const interval = setInterval(updateCacheInfo, 5000);
    
    return () => clearInterval(interval);
  }, [isDev]);

  const clearCache = async () => {
    try {
      await MediaCacheService.clearAllCache();
      setLogs(prev => [...prev.slice(-10), '🗑️ Cache vidé']);
      window.location.reload();
    } catch (error) {
      setLogs(prev => [...prev.slice(-10), `❌ Erreur vidage: ${error}`]);
    }
  };

  // Ne pas afficher en production
  if (!isDev) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <div className="mb-2">
        <strong>🔍 Cache Debug</strong>
        <button 
          onClick={clearCache}
          className="ml-2 bg-red-600 px-2 py-1 rounded text-xs"
        >
          Clear
        </button>
      </div>
      
      {cacheInfo && (
        <div className="mb-2">
          <div>📁 Files: {cacheInfo.fileCount}</div>
          <div>💾 Size: {cacheInfo.totalSizeMB}MB / {cacheInfo.maxSizeMB}MB</div>
          <div>📊 Usage: {cacheInfo.usagePercent}%</div>
        </div>
      )}
      
      <div className="max-h-32 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i} className="text-xs opacity-80">{log}</div>
        ))}
      </div>
    </div>
  );
}
