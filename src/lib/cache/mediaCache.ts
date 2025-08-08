import { MediaOperations } from '../db/operations';
import { MediaType } from '../db/models';
import { DevLogger } from '../utils/logger';

export class MediaCacheService {
  private static readonly MAX_CACHE_SIZE_MB = 150; // Limite à 150MB
  private static readonly CACHE_DURATION_DAYS = 7;

  // Récupérer un média depuis le cache ou le télécharger
  static async getOrFetchMedia(url: string, type: MediaType): Promise<string> {
    const startTime = Date.now();
    
    try {
      // Vérifier d'abord dans le cache
      const cachedMedia = await MediaOperations.getMedia(url);
      
      if (cachedMedia) {
        DevLogger.cache('HIT', url, cachedMedia.size);
        DevLogger.performance('Cache Hit', startTime);
        return URL.createObjectURL(cachedMedia.data);
      }

      // Si pas en cache, télécharger
      DevLogger.info(`Téléchargement du media: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const blob = await response.blob();
      
      // Sauvegarder dans le cache
      await MediaOperations.saveMedia(url, blob, type);
      DevLogger.cache('STORE', url, blob.size);
      
      // Nettoyer le cache si nécessaire
      await this.cleanCacheIfNeeded();
      
      DevLogger.performance('Cache Miss + Download', startTime);
      return URL.createObjectURL(blob);
    } catch (error) {
      DevLogger.error(`Erreur lors du chargement de ${url}:`, error);
      // Retourner l'URL originale en cas d'erreur
      return url;
    }
  }

  // Précharger des médias en arrière-plan
  static async preloadMedia(urls: { url: string; type: MediaType }[]): Promise<void> {
    DevLogger.info(`Préchargement de ${urls.length} médias...`);
    const startTime = Date.now();
    
    const promises = urls.map(async ({ url, type }) => {
      try {
        const exists = await MediaOperations.hasMedia(url);
        if (!exists) {
          await this.getOrFetchMedia(url, type);
          DevLogger.cache('PRELOAD', url);
        } else {
          DevLogger.cache('SKIP (already cached)', url);
        }
      } catch (error) {
        DevLogger.error(`Erreur préchargement ${url}:`, error);
      }
    });

    await Promise.allSettled(promises);
    DevLogger.performance('Préchargement terminé', startTime);
    DevLogger.success(`Préchargement de ${urls.length} médias terminé`);
  }

  // Nettoyer le cache si la limite est dépassée
  private static async cleanCacheIfNeeded(): Promise<void> {
    const stats = await MediaOperations.getCacheStats();
    const currentSizeMB = stats.totalSize / (1024 * 1024);
    
    if (currentSizeMB > this.MAX_CACHE_SIZE_MB) {
      DevLogger.warn(`Nettoyage du cache nécessaire (${currentSizeMB.toFixed(1)}MB > ${this.MAX_CACHE_SIZE_MB}MB)`);
      const deletedCount = await MediaOperations.cleanOldFiles(this.MAX_CACHE_SIZE_MB);
      DevLogger.success(`${deletedCount} fichiers supprimés du cache`);
      
      // Afficher les nouvelles stats
      const newStats = await this.getCacheInfo();
      DevLogger.stats(newStats);
    }
  }

  // Nettoyer les fichiers expirés
  static async cleanExpiredFiles(): Promise<void> {
    const deletedCount = await MediaOperations.cleanExpiredFiles();
    if (deletedCount > 0) {
      DevLogger.success(`${deletedCount} fichiers expirés supprimés`);
    }
  }

  // Obtenir les statistiques du cache
  static async getCacheInfo() {
    const stats = await MediaOperations.getCacheStats();
    return {
      ...stats,
      totalSizeMB: Number((stats.totalSize / (1024 * 1024)).toFixed(2)),
      maxSizeMB: this.MAX_CACHE_SIZE_MB,
      usagePercent: Number(((stats.totalSize / (1024 * 1024)) / this.MAX_CACHE_SIZE_MB * 100).toFixed(1))
    };
  }

  // Vider complètement le cache
  static async clearAllCache(): Promise<void> {
    await MediaOperations.clearCache();
    DevLogger.success(`Cache complètement vidé`);
  }

  // Formater la taille des fichiers
  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
