// Script de test pour la production - changement de catégories
(function() {
  console.log('🔥 Test Production - Changement de catégories de pilotes');
  
  function testProductionCategoryChange() {
    console.log('🎯 Mode: Production');
    console.log('📍 URL:', window.location.href);
    
    // Fonction pour extraire les informations d'image
    function getImageInfo() {
      const images = document.querySelectorAll('img');
      const pilotImages = Array.from(images).filter(img => 
        img.alt && (img.alt.includes('BRUNEAU') || img.alt.includes('DESPREY') || img.alt.includes('SOUBEYRAS'))
      );
      
      return pilotImages.map(img => ({
        alt: img.alt,
        src: img.src,
        category: img.src.includes('pilotes_125') ? '125' : 
                 img.src.includes('pilotes_250') ? '250' : 
                 img.src.includes('pilotes_450') ? '450' : 'unknown',
        isBlob: img.src.startsWith('blob:'),
        hasRefreshParam: img.src.includes('refresh=') || img.src.includes('v=')
      }));
    }
    
    // Fonction pour obtenir la catégorie active
    function getActiveCategory() {
      const activeButton = document.querySelector('button[class*="bg-gradient"]');
      if (activeButton) {
        if (activeButton.textContent?.includes('125')) return '125';
        if (activeButton.textContent?.includes('250')) return '250';
        if (activeButton.textContent?.includes('450')) return '450';
      }
      return 'unknown';
    }
    
    // Test initial
    console.log('📊 État initial:');
    const initialCategory = getActiveCategory();
    const initialImages = getImageInfo();
    console.log(`Catégorie active: ${initialCategory}`);
    console.log('Images:', initialImages);
    
    // Fonction pour tester le changement vers une catégorie
    function testCategorySwitch(targetCategory) {
      return new Promise((resolve) => {
        console.log(`\n🔄 Test changement vers ${targetCategory}cc`);
        
        // Trouver et cliquer sur le bouton
        const buttons = document.querySelectorAll('button');
        const targetButton = Array.from(buttons).find(btn => 
          btn.textContent?.includes(`${targetCategory}cc`)
        );
        
        if (!targetButton) {
          console.log(`❌ Bouton ${targetCategory}cc non trouvé`);
          resolve({ success: false, reason: 'Button not found' });
          return;
        }
        
        // Cliquer sur le bouton
        targetButton.click();
        console.log(`👆 Clic sur ${targetCategory}cc`);
        
        // Attendre et vérifier
        setTimeout(() => {
          const newCategory = getActiveCategory();
          const newImages = getImageInfo();
          
          console.log(`📊 Après clic sur ${targetCategory}cc:`);
          console.log(`Catégorie active: ${newCategory}`);
          console.log('Nouvelles images:', newImages);
          
          // Vérifier la cohérence
          const correctImages = newImages.filter(img => img.category === targetCategory);
          const incorrectImages = newImages.filter(img => img.category !== targetCategory && img.category !== 'unknown');
          
          const success = newCategory === targetCategory && incorrectImages.length === 0;
          
          console.log(`✅ Images correctes (${targetCategory}): ${correctImages.length}`);
          console.log(`❌ Images incorrectes: ${incorrectImages.length}`);
          
          if (incorrectImages.length > 0) {
            console.log('🚨 Images incorrectes détectées:', incorrectImages);
          }
          
          resolve({
            success,
            targetCategory,
            actualCategory: newCategory,
            correctImages: correctImages.length,
            incorrectImages: incorrectImages.length,
            allImages: newImages
          });
        }, 3000); // Attendre 3 secondes pour le chargement
      });
    }
    
    // Tester toutes les catégories
    async function runFullTest() {
      const categories = ['125', '250', '450'];
      const results = [];
      
      for (const category of categories) {
        const result = await testCategorySwitch(category);
        results.push(result);
        
        // Pause entre les tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('\n📈 RÉSULTATS FINAUX:');
      results.forEach(result => {
        const status = result.success ? '✅' : '❌';
        console.log(`${status} ${result.targetCategory}cc: ${result.success ? 'OK' : 'ÉCHEC'}`);
        if (!result.success) {
          console.log(`   Raison: ${result.incorrectImages || 0} images incorrectes`);
        }
      });
      
      const allSuccess = results.every(r => r.success);
      console.log(`\n🎯 Test global: ${allSuccess ? '✅ RÉUSSI' : '❌ ÉCHEC'}`);
      
      return results;
    }
    
    // Lancer le test complet
    runFullTest();
  }
  
  // Attendre que la page soit chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(testProductionCategoryChange, 2000);
    });
  } else {
    setTimeout(testProductionCategoryChange, 2000);
  }
  
  // Exposer pour test manuel
  window.testProductionCategoryChange = testProductionCategoryChange;
  
  console.log('💡 Tapez testProductionCategoryChange() pour lancer le test manuellement');
})();
