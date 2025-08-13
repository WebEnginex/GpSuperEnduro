// Script de test pour vérifier le chargement des images
(function() {
  console.log('🔍 Démarrage du test d\'images...');
  
  // Liste des images à tester
  const imagesToTest = [
    '/images/pilotes_125/Bruneau_Liam.webp',
    '/images/pilotes_125/Camps_Fauria_Xavier.webp',
    '/images/pilotes_125/Simo_Maho.webp',
    '/images/marques/yamaha.svg',
    '/images/marques/ktm.svg',
    '/images/marques/gasgas.svg',
    '/images/marques/honda.svg',
    '/images/marques/kawasaki.svg',
    '/images/marques/husqvarna.svg',
    '/images/marques/suzuki.svg',
    '/images/marques/stark.webp'
  ];
  
  const results = [];
  let tested = 0;
  
  function testImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      const start = Date.now();
      
      img.onload = function() {
        const loadTime = Date.now() - start;
        console.log(`✅ ${src} - Chargé en ${loadTime}ms`);
        resolve({ src, success: true, loadTime, error: null });
      };
      
      img.onerror = function() {
        const loadTime = Date.now() - start;
        console.log(`❌ ${src} - Erreur après ${loadTime}ms`);
        resolve({ src, success: false, loadTime, error: 'Erreur de chargement' });
      };
      
      img.src = src;
      
      // Timeout après 10 secondes
      setTimeout(() => {
        if (!img.complete) {
          console.log(`⏰ ${src} - Timeout après 10s`);
          resolve({ src, success: false, loadTime: 10000, error: 'Timeout' });
        }
      }, 10000);
    });
  }
  
  async function runTests() {
    console.log(`🧪 Test de ${imagesToTest.length} images...`);
    
    for (const src of imagesToTest) {
      const result = await testImage(src);
      results.push(result);
      tested++;
      
      console.log(`📊 Progression: ${tested}/${imagesToTest.length}`);
    }
    
    // Résumé
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const avgLoadTime = results.filter(r => r.success).reduce((sum, r) => sum + r.loadTime, 0) / successful;
    
    console.log('\n📈 RÉSULTATS:');
    console.log(`✅ Succès: ${successful}/${imagesToTest.length}`);
    console.log(`❌ Échecs: ${failed}/${imagesToTest.length}`);
    console.log(`⏱️ Temps moyen: ${Math.round(avgLoadTime)}ms`);
    
    if (failed > 0) {
      console.log('\n❌ Images en échec:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${r.src}: ${r.error}`);
      });
    }
    
    return results;
  }
  
  // Lancer les tests
  window.testImages = runTests;
  
  // Auto-run si on est sur la page pilotes
  if (window.location.pathname === '/pilotes') {
    setTimeout(() => {
      console.log('🏁 Lancement automatique des tests d\'images...');
      runTests();
    }, 2000);
  } else {
    console.log('💡 Tapez testImages() pour lancer les tests manuellement');
  }
})();
