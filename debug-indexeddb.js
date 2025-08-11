/* eslint-disable */
// Script de test des performances IndexedDB
// À exécuter dans la console du navigateur

async function testPerformance() {
  console.log('🧪 Test de performance IndexedDB');
  
  // Test 1: Lecture de média (ne devrait plus mettre à jour lastAccessed)
  console.time('getMedia');
  const testMedia = await MediaOperations.getMedia('/test/path');
  console.timeEnd('getMedia');
  
  // Test 2: Statistiques du cache (ne devrait plus charger les blobs)
  console.time('getCacheStats');
  const stats = await MediaOperations.getCacheStats();
  console.timeEnd('getCacheStats');
  console.log('📊 Stats:', stats);
  
  // Test 3: Nettoyage (devrait utiliser bulkDelete)
  console.time('cleanOldFiles');
  const cleaned = await MediaOperations.cleanOldFiles(50); // 50MB
  console.timeEnd('cleanOldFiles');
  console.log('🧹 Fichiers nettoyés:', cleaned);
  
  console.log('✅ Tests terminés');
}

// Fonction pour monitorer les opérations en temps réel
function monitorIndexedDB() {
  console.log('👀 Monitoring IndexedDB...');
  
  // Compteur d'opérations
  let readOps = 0;
  let writeOps = 0;
  
  // Hook sur les opérations de lecture
  const originalGet = IDBObjectStore.prototype.get;
  IDBObjectStore.prototype.get = function(...args) {
    readOps++;
    console.log(`📖 READ #${readOps}:`, this.name, args[0]);
    return originalGet.apply(this, args);
  };
  
  // Hook sur les opérations d'écriture
  const originalPut = IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put = function(...args) {
    writeOps++;
    console.log(`✏️ WRITE #${writeOps}:`, this.name);
    return originalPut.apply(this, args);
  };
  
  setInterval(() => {
    console.log(`📈 Total ops - Reads: ${readOps}, Writes: ${writeOps}`);
  }, 10000);
}

console.log('🛠️ Scripts de test disponibles:');
console.log('- testPerformance() : teste les performances des opérations');
console.log('- monitorIndexedDB() : monitore les opérations en temps réel');
