'use client';

import { useState } from 'react';
import { CacheDebugger } from './CacheDebugger';
import { IndexedDBStatus } from './IndexedDBStatus';
import { DeviceDebugger } from './DeviceDebugger';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);

  // Uniquement visible en développement
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Bouton pour ouvrir/fermer le panel */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 mb-2"
        title="Toggle Debug Panel"
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          )}
        </svg>
      </button>

      {/* Panel de debug */}
      <div 
        className={`bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen 
            ? 'opacity-100 scale-100 max-h-[80vh] w-80' 
            : 'opacity-0 scale-95 max-h-0 w-0'
        }`}
      >
        {isOpen && (
          <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Debug Panel</h3>
              <span className="text-xs text-gray-400 bg-yellow-600/20 px-2 py-1 rounded">DEV</span>
            </div>
            
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <h4 className="text-gray-300 text-sm font-medium mb-2">Cache System</h4>
                <CacheDebugger />
              </div>
              
              <div className="border-b border-gray-700 pb-4">
                <h4 className="text-gray-300 text-sm font-medium mb-2">IndexedDB Status</h4>
                <IndexedDBStatus />
              </div>
              
              <div>
                <h4 className="text-gray-300 text-sm font-medium mb-2">Device Info</h4>
                <DeviceDebugger />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
