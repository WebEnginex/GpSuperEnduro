# 🔧 DIAGNOSTIC ET SOLUTIONS - PROBLÈME DE BACKGROUND SUR MOBILE

## 🎯 **PROBLÈME IDENTIFIÉ**
- L'ancien background reste en cache IndexedDB après mise à jour
- L'image ne s'affiche pas sur mobile en production
- Problème de cache busting insuffisant

## ✅ **SOLUTIONS IMPLEMENTÉES**

### 1. **Versioning des images (Cache Busting)**
```typescript
// Avant: /images/background/supercross-sxtour-bg.webp
// Après: /images/background/supercross-sxtour-bg.webp?v=2025011
```

### 2. **Nettoyage automatique des anciennes versions**
- `MediaCacheService.cleanOldVersions()` supprime les anciennes versions
- Nettoyage au démarrage dans `CacheInitializer`
- Nettoyage automatique lors du téléchargement d'une nouvelle version

### 3. **Composant SimpleImage pour la production**
En production, utilisation d'un composant simple sans cache pour éviter les problèmes :
```typescript
{process.env.NODE_ENV === 'production' ? (
  <SimpleImage src="/images/background/supercross-sxtour-bg.webp" ... />
) : (
  <CachedImage src="/images/background/supercross-sxtour-bg.webp?v=2025011" ... />
)}
```

## 🧪 **TESTS À EFFECTUER SUR MOBILE**

### 1. **Test immédiat (après déploiement)**
1. Ouvrir l'app sur mobile
2. Si le background ne s'affiche pas :
   - Forcer le rafraîchissement (pull down)
   - Vider le cache du navigateur
   - Fermer/rouvrir l'onglet

### 2. **Test de diagnostic dans la console mobile**
Pour débugger sur mobile, utiliser les DevTools :
```javascript
// 1. Vérifier IndexedDB
console.log('IndexedDB supporté:', !!window.indexedDB);

// 2. Vérifier le cache
if (window.MediaOperations) {
  window.MediaOperations.getCacheStats().then(stats => {
    console.log('Stats cache:', stats);
  });
}

// 3. Vérifier les images en cache
if (window.MediaOperations) {
  // Vérifier ancienne version
  window.MediaOperations.getMedia('/images/background/supercross-sxtour-bg.webp').then(result => {
    console.log('Ancienne version en cache:', !!result);
  });
  
  // Vérifier nouvelle version
  window.MediaOperations.getMedia('/images/background/supercross-sxtour-bg.webp?v=2025011').then(result => {
    console.log('Nouvelle version en cache:', !!result);
  });
}

// 4. Forcer le nettoyage du cache
if (window.MediaCacheService) {
  window.MediaCacheService.clearAllCache().then(() => {
    console.log('Cache vidé - rechargez la page');
    location.reload();
  });
}
```

### 3. **Test de l'image directement**
```javascript
// Tester si l'image est accessible
const img = new Image();
img.onload = () => console.log('✅ Image accessible');
img.onerror = () => console.log('❌ Image inaccessible');
img.src = '/images/background/supercross-sxtour-bg.webp';
```

## 🚨 **SOLUTIONS D'URGENCE SI LE PROBLÈME PERSISTE**

### Solution 1: Forcer SimpleImage en production
Modifier `src/app/page.tsx` :
```typescript
// Remplacer la condition par:
{true ? ( // Force SimpleImage
  <SimpleImage ... />
) : (
  <CachedImage ... />
)}
```

### Solution 2: Désactiver complètement le cache pour le background
Modifier `src/hooks/useAutoCache.ts` :
```typescript
// Ajouter dans la fonction checkCacheSupport():
if (url.includes('background')) {
  console.log('Cache désactivé pour le background');
  setShouldDisableCache(true);
  return;
}
```

### Solution 3: Utiliser une URL absolue temporaire
```typescript
src="https://votre-domaine.com/images/background/supercross-sxtour-bg.webp"
```

## 📱 **INSTRUCTIONS POUR TESTER SUR MOBILE**

### iPhone/Safari:
1. Ouvrir Safari > Réglages > Avancé > Inspecteur web
2. Connecter à un Mac avec Safari
3. Ouvrir l'onglet dans l'inspecteur web
4. Utiliser la console pour les tests

### Android/Chrome:
1. Activer les options développeur
2. Activer le débogage USB
3. Chrome Desktop > chrome://inspect
4. Sélectionner l'onglet mobile
5. Utiliser la console pour les tests

### Test rapide sans DevTools:
1. Ajouter `?debug=1` à l'URL
2. Le DebugPanel devrait s'afficher
3. Vérifier les stats du cache
4. Bouton "Clear" pour vider le cache

## 🔍 **MONITORING EN PRODUCTION**

Ajout de logs pour surveiller le comportement :
```typescript
// Dans CachedImage
console.log(`🖼️ [${process.env.NODE_ENV}] Loading background:`, src);

// Dans useAutoCache
console.log(`📱 [Mobile] Cache disabled:`, shouldDisableCache);

// Dans MediaCacheService
console.log(`💾 [Cache] Hit/Miss for:`, url, result ? 'HIT' : 'MISS');
```

## ✅ **CHECKLIST FINAL**

- [ ] Vérifier que l'image `/images/background/supercross-sxtour-bg.webp` existe
- [ ] Confirmer que la version avec `?v=2025011` fonctionne en dev
- [ ] Tester sur plusieurs appareils mobiles
- [ ] Vérifier les logs de la console sur mobile
- [ ] Confirmer que SimpleImage fonctionne en production
- [ ] Tester le nettoyage du cache
- [ ] Vérifier les temps de chargement

## 🎯 **RÉSULTAT ATTENDU**

Après ces modifications :
1. ✅ En développement : CachedImage avec versioning
2. ✅ En production : SimpleImage sans cache pour éviter les problèmes
3. ✅ Nettoyage automatique des anciennes versions
4. ✅ Fallback robuste en cas d'erreur
5. ✅ Background toujours visible grâce au gradient de fallback
