'use client';

import { useEffect, useState } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  cacheSupported: boolean;
  cacheRestricted: boolean;
}

export function DeviceDebugger() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const detectDevice = async () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|iphone|ipod|blackberry|windows phone/.test(userAgent);
      const isTablet = /ipad|android(?!.*mobile)/.test(userAgent);
      const isDesktop = !isMobile && !isTablet;

      // Test du cache IndexedDB
      let cacheSupported = false;
      let cacheRestricted = false;

      try {
        if (window.indexedDB) {
          cacheSupported = true;
          
          // Test d'accès
          const testRequest = indexedDB.open('test-device-check', 1);
          testRequest.onerror = () => {
            cacheRestricted = true;
          };
          testRequest.onsuccess = () => {
            indexedDB.deleteDatabase('test-device-check');
          };
        }
      } catch {
        cacheRestricted = true;
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        userAgent,
        cacheSupported,
        cacheRestricted
      });
    };

    detectDevice();
  }, []);

  // Afficher seulement en développement
  if (process.env.NODE_ENV !== 'development' || !deviceInfo) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      maxWidth: '250px',
      fontFamily: 'monospace'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#00ff00' }}>
        📱 Device Info
      </div>
      <div>Type: {deviceInfo.isMobile ? '📱 Mobile' : deviceInfo.isTablet ? '📋 Tablet' : '💻 Desktop'}</div>
      <div>Cache: {deviceInfo.cacheSupported ? '✅' : '❌'} IndexedDB</div>
      <div>Access: {deviceInfo.cacheRestricted ? '🚫 Restricted' : '✅ OK'}</div>
      <div style={{ fontSize: '9px', marginTop: '5px', opacity: 0.7 }}>
        UA: {deviceInfo.userAgent.substring(0, 30)}...
      </div>
    </div>
  );
}
