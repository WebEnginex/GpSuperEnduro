/**
 * Test complet du système de cache IndexedDB
 * Exécuter dans la console du navigateur : window.runCompleteIndexedDBTest()
 */

async function runCompleteIndexedDBTest() {
  console.log('🔍 === TEST COMPLET DU SYSTÈME INDEXEDDB ===');
  let testsPassed = 0;
  let testsFailed = 0;
  
  const logTest = (name, success, details = '') => {
    if (success) {
      console.log(`✅ ${name}${details ? ` - ${details}` : ''}`);
      testsPassed++;
    } else {
      console.error(`❌ ${name}${details ? ` - ${details}` : ''}`);
      testsFailed++;
    }
  };

  try {
    // Test 1: Vérification du support IndexedDB
    console.log('\n📋 1. Vérification du support IndexedDB');
    const indexedDBSupported = !!window.indexedDB;
    logTest('Support IndexedDB', indexedDBSupported);

    if (!indexedDBSupported) {
      throw new Error('IndexedDB non supporté, arrêt des tests');
    }

    // Test 2: Vérification de l'existence des classes et services
    console.log('\n📋 2. Vérification des composants du cache');
    const hasMediaOperations = typeof window.MediaOperations !== 'undefined';
    const hasMediaCacheService = typeof window.MediaCacheService !== 'undefined';
    const hasBlobURLManager = typeof window.BlobURLManager !== 'undefined';
    
    logTest('MediaOperations disponible', hasMediaOperations);
    logTest('MediaCacheService disponible', hasMediaCacheService);
    logTest('BlobURLManager disponible', hasBlobURLManager);

    // Test 3: Test des opérations de base IndexedDB
    console.log('\n📋 3. Test des opérations IndexedDB de base');
    
    // Créer un blob de test
    const testBlob = new Blob(['Test data for IndexedDB'], { type: 'text/plain' });
    const testUrl = '/test-cache-' + Date.now() + '.txt';
    
    // Sauvegarder
    let saveSuccess = false;
    try {
      if (window.MediaOperations) {
        await window.MediaOperations.saveMedia(testUrl, testBlob, 'image');
        saveSuccess = true;
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
    logTest('Sauvegarde média', saveSuccess);

    // Récupérer
    let retrieveSuccess = false;
    let retrievedData = null;
    try {
      if (window.MediaOperations) {
        retrievedData = await window.MediaOperations.getMedia(testUrl);
        retrieveSuccess = !!retrievedData;
      }
    } catch (error) {
      console.error('Erreur récupération:', error);
    }
    logTest('Récupération média', retrieveSuccess, retrievedData ? `Taille: ${retrievedData.size} bytes` : '');

    // Test 4: Statistiques du cache
    console.log('\n📋 4. Test des statistiques du cache');
    let statsSuccess = false;
    let stats = null;
    try {
      if (window.MediaOperations) {
        stats = await window.MediaOperations.getCacheStats();
        statsSuccess = !!(stats && typeof stats.totalSize === 'number' && typeof stats.fileCount === 'number');
      }
    } catch (error) {
      console.error('Erreur stats:', error);
    }
    logTest('Statistiques du cache', statsSuccess, stats ? `${stats.fileCount} fichiers, ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB` : '');

    // Test 5: Service de cache complet
    console.log('\n📋 5. Test du service de cache');
    let cacheServiceSuccess = false;
    let cachedUrl = null;
    try {
      if (window.MediaCacheService) {
        // Test avec une vraie image du site
        cachedUrl = await window.MediaCacheService.getOrFetchMedia('/images/flags/france.svg', 'image');
        cacheServiceSuccess = !!(cachedUrl && typeof cachedUrl === 'string');
      }
    } catch (error) {
      console.error('Erreur service cache:', error);
    }
    logTest('Service de cache', cacheServiceSuccess, cachedUrl ? (cachedUrl.startsWith('blob:') ? 'URL Blob générée' : 'URL directe') : '');

    // Test 6: Gestionnaire Blob URL
    console.log('\n📋 6. Test du gestionnaire Blob URL');
    let blobManagerSuccess = false;
    try {
      if (window.BlobURLManager) {
        const blobStats = window.BlobURLManager.getStats();
        blobManagerSuccess = !!(blobStats && typeof blobStats.totalUrls === 'number');
      }
    } catch (error) {
      console.error('Erreur blob manager:', error);
    }
    logTest('Gestionnaire Blob URL', blobManagerSuccess);

    // Test 7: Test de performance (optionnel)
    console.log('\n📋 7. Test de performance');
    let performanceSuccess = false;
    try {
      if (window.MediaCacheService) {
        const startTime = performance.now();
        // Test avec la même image pour voir si elle est en cache
        await window.MediaCacheService.getOrFetchMedia('/images/flags/france.svg', 'image');
        const endTime = performance.now();
        const duration = endTime - startTime;
        performanceSuccess = duration < 100; // Moins de 100ms devrait indiquer un cache hit
        logTest('Performance cache', performanceSuccess, `${duration.toFixed(2)}ms`);
      }
    } catch (error) {
      console.error('Erreur test performance:', error);
    }

    // Test 8: Nettoyage (optionnel)
    console.log('\n📋 8. Test de nettoyage');
    let cleanupSuccess = false;
    try {
      if (window.MediaOperations && retrievedData) {
        await window.MediaOperations.deleteMedia(retrievedData.id);
        // Vérifier que le fichier a bien été supprimé
        const deletedFile = await window.MediaOperations.getMedia(testUrl);
        cleanupSuccess = !deletedFile;
      }
    } catch (error) {
      console.error('Erreur nettoyage:', error);
    }
    logTest('Nettoyage', cleanupSuccess);

    // Test 9: Vérification des hooks React (si disponible)
    console.log('\n📋 9. Vérification de l\'intégration React');
    const hasReactHooks = typeof window.useMediaCache !== 'undefined' || typeof window.useAutoMediaCache !== 'undefined';
    logTest('Hooks React disponibles', hasReactHooks, 'Vérification indirecte via les composants');

    // Résumé final
    console.log('\n🎯 === RÉSUMÉ DES TESTS ===');
    console.log(`✅ Tests réussis: ${testsPassed}`);
    console.log(`❌ Tests échoués: ${testsFailed}`);
    console.log(`📊 Taux de réussite: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);
    
    if (testsFailed === 0) {
      console.log('🎉 TOUS LES TESTS SONT PASSÉS ! Le système IndexedDB fonctionne parfaitement.');
    } else if (testsFailed <= 2) {
      console.log('⚠️ Quelques tests ont échoué, mais le système semble fonctionnel.');
    } else {
      console.log('🚨 Plusieurs tests ont échoué, le système nécessite une vérification.');
    }

    return {
      passed: testsPassed,
      failed: testsFailed,
      success: testsFailed === 0
    };

  } catch (error) {
    console.error('💥 Erreur fatale lors des tests:', error);
    return {
      passed: testsPassed,
      failed: testsFailed + 1,
      success: false,
      error: error.message
    };
  }
}

// Exposer la fonction globalement
if (typeof window !== 'undefined') {
  window.runCompleteIndexedDBTest = runCompleteIndexedDBTest;
  console.log('🧪 Test complet IndexedDB chargé. Exécutez: runCompleteIndexedDBTest()');
}
