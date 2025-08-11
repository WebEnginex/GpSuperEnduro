import { MediaCacheService } from '../lib/cache/mediaCache';
import { MediaOperations } from '../lib/db/operations';

export async function testIndexedDBCache() {
  console.log('🔍 Test du système de cache IndexedDB...');
  
  try {
    // Test 1: Vérifier que IndexedDB est disponible
    if (!window.indexedDB) {
      throw new Error('IndexedDB non supporté');
    }
    console.log('✅ IndexedDB supporté');
    
    // Test 2: Vérifier les opérations de base
    const testBlob = new Blob(['test data'], { type: 'text/plain' });
    const testUrl = '/test-image.png';
    
    // Sauvegarder
    await MediaOperations.saveMedia(testUrl, testBlob, 'image');
    console.log('✅ Sauvegarde dans IndexedDB réussie');
    
    // Récupérer
    const retrievedMedia = await MediaOperations.getMedia(testUrl);
    if (!retrievedMedia) {
      throw new Error('Impossible de récupérer le média');
    }
    console.log('✅ Récupération depuis IndexedDB réussie');
    
    // Test 3: Vérifier les stats
    const stats = await MediaOperations.getCacheStats();
    console.log('✅ Stats du cache:', stats);
    
    // Test 4: Vérifier le service de cache
    const cachedUrl = await MediaCacheService.getOrFetchMedia('/images/flags/france.svg', 'image');
    console.log('✅ Service de cache fonctionnel:', cachedUrl.startsWith('blob:') ? 'CACHED' : 'DIRECT');
    
    // Nettoyer le test
    await MediaOperations.deleteMedia(retrievedMedia.id!);
    console.log('✅ Nettoyage effectué');
    
    console.log('🎉 Tous les tests de cache IndexedDB sont passés !');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur dans le test de cache:', error);
    return false;
  }
}

// Exposer globalement pour debug
if (typeof window !== 'undefined') {
  (window as Window & { 
    testCache?: () => Promise<boolean>;
    MediaOperations?: typeof MediaOperations;
    MediaCacheService?: typeof MediaCacheService;
    BlobURLManager?: unknown;
  }).testCache = testIndexedDBCache;
  
  // Exposer les services pour les tests
  (window as Window & { MediaOperations?: typeof MediaOperations }).MediaOperations = MediaOperations;
  (window as Window & { MediaCacheService?: typeof MediaCacheService }).MediaCacheService = MediaCacheService;
  
  // Importer BlobURLManager et l'exposer
  import('@/lib/cache/blobManager').then(({ BlobURLManager }) => {
    (window as Window & { BlobURLManager?: unknown }).BlobURLManager = BlobURLManager;
  });
}
