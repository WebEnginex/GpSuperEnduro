// Script de test pour vérifier le changement de catégories
(function() {
  console.log('🧪 Test des changements de catégories de pilotes...');
  
  function testCategoryChange() {
    // Obtenir les boutons de catégorie
    const buttons = document.querySelectorAll('[data-testid], button');
    const categoryButtons = Array.from(buttons).filter(btn => 
      btn.textContent?.includes('125cc') || 
      btn.textContent?.includes('250cc') || 
      btn.textContent?.includes('450cc')
    );
    
    if (categoryButtons.length === 0) {
      console.log('❌ Boutons de catégorie non trouvés');
      return;
    }
    
    console.log(`✅ Trouvé ${categoryButtons.length} boutons de catégorie`);
    
    // Fonction pour tester une catégorie
    function testCategory(categoryBtn, categoryName) {
      return new Promise((resolve) => {
        console.log(`🔄 Test de la catégorie: ${categoryName}`);
        
        // Cliquer sur le bouton
        categoryBtn.click();
        
        // Attendre que les images changent
        setTimeout(() => {
          const images = document.querySelectorAll('img[alt*="BRUNEAU"], img[alt*="DESPREY"], img[alt*="SOUBEYRAS"]');
          const imagesSrc = Array.from(images).map(img => img.src);
          
          console.log(`📊 Images visibles après clic sur ${categoryName}:`, imagesSrc);
          
          // Vérifier si les images correspondent à la catégorie
          const has125Images = imagesSrc.some(src => src.includes('pilotes_125'));
          const has250Images = imagesSrc.some(src => src.includes('pilotes_250'));
          const has450Images = imagesSrc.some(src => src.includes('pilotes_450'));
          
          console.log(`🔍 Résultats pour ${categoryName}:`, {
            has125Images,
            has250Images,
            has450Images
          });
          
          resolve({ categoryName, has125Images, has250Images, has450Images });
        }, 2000);
      });
    }
    
    // Tester chaque catégorie
    async function runTests() {
      const results = [];
      
      for (const btn of categoryButtons) {
        const categoryName = btn.textContent?.trim() || 'Unknown';
        const result = await testCategory(btn, categoryName);
        results.push(result);
      }
      
      console.log('\n📈 RÉSULTATS FINAUX:');
      results.forEach(result => {
        console.log(`${result.categoryName}:`, {
          '125 images': result.has125Images,
          '250 images': result.has250Images,
          '450 images': result.has450Images
        });
      });
      
      // Vérifier la cohérence
      const issues = results.filter(result => {
        if (result.categoryName.includes('125')) return !result.has125Images;
        if (result.categoryName.includes('250')) return !result.has250Images;
        if (result.categoryName.includes('450')) return !result.has450Images;
        return false;
      });
      
      if (issues.length === 0) {
        console.log('✅ Tous les tests sont réussis !');
      } else {
        console.log('❌ Problèmes détectés:', issues);
      }
    }
    
    runTests();
  }
  
  // Attendre que la page soit chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testCategoryChange);
  } else {
    setTimeout(testCategoryChange, 3000);
  }
  
  // Exposer la fonction pour tests manuels
  window.testCategoryChange = testCategoryChange;
  
  console.log('💡 Tapez testCategoryChange() pour lancer les tests manuellement');
})();
