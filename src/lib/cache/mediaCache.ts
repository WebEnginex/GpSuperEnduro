import { MediaOperations } from '../db/operations';
import { MediaType } from '../db/models';
import { DevLogger } from '../utils/logger';
import { BlobURLManager } from './blobManager';
import { db } from '../db/index';

export class MediaCacheService {
  private static readonly MAX_CACHE_SIZE_MB = 150; // Limite à 150MB
  private static readonly CACHE_DURATION_DAYS = 7;
  
  // Cache des promesses pour éviter les téléchargements multiples
  private static readonly pendingDownloads = new Map<string, Promise<string>>();

  // Récupérer un média depuis le cache ou le télécharger
  static async getOrFetchMedia(url: string, type: MediaType): Promise<string> {
    const startTime = Date.now();
    const isBackground = url.includes('background');
    
    try {
      if (isBackground) {
        console.log(`🎨 [MediaCache] Getting background image: ${url}`);
      }
      
      // Vérifier d'abord dans le cache
      const cachedMedia = await MediaOperations.getMedia(url);
      
      if (cachedMedia) {
        if (isBackground) {
          console.log(`🎯 [MediaCache] Background found in cache, size: ${cachedMedia.size} bytes`);
        }
        DevLogger.cache('HIT', url, cachedMedia.size);
        DevLogger.performance('Cache Hit', startTime);
        return BlobURLManager.getOrCreateBlobURL(url, cachedMedia.data);
      }

      if (isBackground) {
        console.log(`📥 [MediaCache] Background not in cache, downloading...`);
      }

      // Vérifier si un téléchargement est déjà en cours
      if (this.pendingDownloads.has(url)) {
        DevLogger.info(`Téléchargement déjà en cours pour: ${url}`);
        return await this.pendingDownloads.get(url)!;
      }

      // Si pas en cache, télécharger
      const downloadPromise = this.downloadAndCache(url, type, startTime);
      this.pendingDownloads.set(url, downloadPromise);
      
      try {
        const result = await downloadPromise;
        return result;
      } finally {
        // Nettoyer la promesse en cours
        this.pendingDownloads.delete(url);
      }
    } catch (error) {
      DevLogger.error(`Erreur lors du chargement de ${url}:`, error);
      // Retourner l'URL originale en cas d'erreur
      return url;
    }
  }

  // Méthode privée pour télécharger et mettre en cache
  private static async downloadAndCache(url: string, type: MediaType, startTime: number): Promise<string> {
    const isBackground = url.includes('background');
    
    if (isBackground) {
      console.log(`🌐 [MediaCache] Downloading background from: ${url}`);
    } else {
      DevLogger.info(`Téléchargement du media: ${url}`);
    }
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorMsg = `Erreur HTTP: ${response.status} pour ${url}`;
        if (isBackground) {
          console.error(`❌ [MediaCache] Background download failed:`, errorMsg);
        }
        DevLogger.warn(`Fichier non trouvé (${response.status}): ${url}`);
        throw new Error(errorMsg);
      }

      const blob = await response.blob();
      
      if (isBackground) {
        console.log(`✅ [MediaCache] Background downloaded, size: ${blob.size} bytes, type: ${blob.type}`);
      }
      
      // Sauvegarder dans le cache
      await MediaOperations.saveMedia(url, blob, type);
      if (isBackground) {
        console.log(`💾 [MediaCache] Background saved to IndexedDB`);
      }
      DevLogger.cache('STORE', url, blob.size);
      
      // Nettoyer les anciennes versions si l'URL contient un paramètre de version
      if (url.includes('?v=')) {
        await this.cleanOldVersions(url);
      }
      
      // Nettoyer le cache si nécessaire
      await this.cleanCacheIfNeeded();
      
      const blobUrl = BlobURLManager.getOrCreateBlobURL(url, blob);
      if (isBackground) {
        console.log(`🔗 [MediaCache] Background blob URL created:`, blobUrl.substring(0, 50) + '...');
      }
      
      DevLogger.performance('Cache Miss + Download', startTime);
      return blobUrl;
    } catch (error) {
      if (isBackground) {
        console.error(`💥 [MediaCache] Background download error:`, error);
      }
      DevLogger.error(`Échec téléchargement ${url}:`, error);
      throw error; // Re-lancer l'erreur pour que getOrFetchMedia puisse la gérer
    }
  }

  // Précharger des médias en arrière-plan
  static async preloadMedia(urls: { url: string; type: MediaType }[]): Promise<void> {
    DevLogger.info(`Préchargement de ${urls.length} médias...`);
    const startTime = Date.now();
    let successCount = 0;
    let errorCount = 0;
    
    const promises = urls.map(async ({ url, type }) => {
      try {
        const exists = await MediaOperations.hasMedia(url);
        if (!exists) {
          await this.getOrFetchMedia(url, type);
          DevLogger.cache('PRELOAD', url);
          successCount++;
        } else {
          DevLogger.cache('SKIP (already cached)', url);
          successCount++;
        }
      } catch (error) {
        errorCount++;
        DevLogger.error(`Erreur préchargement ${url}:`, error);
        // Continuer avec les autres fichiers même si celui-ci échoue
      }
    });

    await Promise.allSettled(promises);
    DevLogger.performance('Préchargement terminé', startTime);
    DevLogger.success(`Préchargement terminé: ${successCount} succès, ${errorCount} erreurs`);
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

  // Nettoyer les anciennes versions d'un fichier (cache busting)
  static async cleanOldVersions(baseUrl: string): Promise<void> {
    try {
      // Récupérer tous les fichiers qui commencent par l'URL de base
      const allFiles = await db.mediaFiles.where('url').startsWith(baseUrl.split('?')[0]).toArray();
      
      // Filtrer pour garder seulement l'ancienne version (sans paramètre de version)
      const oldVersions = allFiles.filter((file: { url: string; id?: number }) => 
        file.url === baseUrl.split('?')[0] || // Version sans paramètre
        (file.url.includes('?v=') && file.url !== baseUrl) // Anciennes versions avec paramètres
      );
      
      if (oldVersions.length > 0) {
        const idsToDelete = oldVersions.map((file: { id?: number }) => file.id!);
        await db.mediaFiles.bulkDelete(idsToDelete);
        DevLogger.success(`${oldVersions.length} anciennes versions supprimées pour ${baseUrl}`);
      }
    } catch (error) {
      DevLogger.error('Erreur lors du nettoyage des anciennes versions:', error);
    }
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
