'use client';

import { useEffect, useState } from 'react';
import { MediaOperations } from '@/lib/db/operations';

export function IndexedDBStatus() {
  const [status, setStatus] = useState<string>('Vérification...');
  const [details, setDetails] = useState<string[]>([]);

  useEffect(() => {
    const checkIndexedDB = async () => {
      const newDetails: string[] = [];
      
      try {
        // Test 1: Disponibilité d'IndexedDB
        if (!window.indexedDB) {
          setStatus('❌ IndexedDB non supporté');
          return;
        }
        newDetails.push('✅ IndexedDB disponible');

        // Test 2: Accès à la base de données
        try {
          const stats = await MediaOperations.getCacheStats();
          newDetails.push(`✅ Base de données accessible (${stats.fileCount} fichiers, ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB)`);
          
          // Test 3: Test d'écriture
          const testBlob = new Blob(['test'], { type: 'text/plain' });
          const testId = await MediaOperations.saveMedia('/test-write', testBlob, 'image');
          newDetails.push('✅ Écriture fonctionnelle');
          
          // Test 4: Test de lecture
          const readTest = await MediaOperations.getMedia('/test-write');
          if (readTest) {
            newDetails.push('✅ Lecture fonctionnelle');
            await MediaOperations.deleteMedia(testId);
            newDetails.push('✅ Suppression fonctionnelle');
          } else {
            newDetails.push('❌ Lecture échouée');
          }
          
          setStatus('✅ IndexedDB pleinement fonctionnel');
        } catch (dbError) {
          newDetails.push(`❌ Erreur base de données: ${dbError}`);
          setStatus('❌ Problème avec la base de données');
        }
      } catch (error) {
        newDetails.push(`❌ Erreur générale: ${error}`);
        setStatus('❌ Erreur de vérification');
      }
      
      setDetails(newDetails);
    };

    checkIndexedDB();
  }, []);

  // Afficher seulement en développement
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {status}
      </div>
      {details.map((detail, index) => (
        <div key={index} style={{ margin: '2px 0' }}>
          {detail}
        </div>
      ))}
    </div>
  );
}
