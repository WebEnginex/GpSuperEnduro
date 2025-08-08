import { MediaCacheService } from './mediaCache';

export class CacheStrategies {
  // Stratégie: Cache First (recommandée pour médias statiques)
  static async cacheFirst(url: string, type: 'image' | 'video'): Promise<string> {
    return await MediaCacheService.getOrFetchMedia(url, type);
  }

  // Stratégie: Network First (pour contenu dynamique)
  static async networkFirst(url: string, type: 'image' | 'video'): Promise<string> {
    try {
      // Essayer d'abord le réseau
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        // Mettre à jour le cache avec la nouvelle version
        await MediaCacheService.getOrFetchMedia(url, type);
        return URL.createObjectURL(blob);
      }
      throw new Error('Network failed');
    } catch {
      // Fallback vers le cache
      console.log('Network failed, falling back to cache');
      return await MediaCacheService.getOrFetchMedia(url, type);
    }
  }

  // Stratégie: Stale While Revalidate
  static async staleWhileRevalidate(url: string, type: 'image' | 'video'): Promise<string> {
    // Retourner immédiatement depuis le cache
    const cachedUrl = await MediaCacheService.getOrFetchMedia(url, type);
    
    // En parallèle, mettre à jour le cache en arrière-plan
    this.updateCacheInBackground(url, type);
    
    return cachedUrl;
  }

  // Mise à jour en arrière-plan
  private static async updateCacheInBackground(url: string, type: 'image' | 'video'): Promise<void> {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await response.blob(); // Consommer la réponse
        // Mettre à jour silencieusement le cache
        await MediaCacheService.getOrFetchMedia(url, type);
      }
    } catch (error) {
      console.log('Background update failed:', error);
    }
  }
}
