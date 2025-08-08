import { db } from './index';
import { MediaFile, CacheStats } from './models';
import { CACHE_CONFIG } from '../cache/config';

export class MediaOperations {
  // Sauvegarder un fichier média
  static async saveMedia(url: string, blob: Blob, type: 'image' | 'video'): Promise<number> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + CACHE_CONFIG.CACHE_DURATION); // Cache pendant la durée configurée

    return await db.mediaFiles.add({
      url,
      type,
      data: blob,
      size: blob.size,
      mimeType: blob.type,
      lastAccessed: new Date(),
      expiresAt
    });
  }

  // Récupérer un fichier média
  static async getMedia(url: string): Promise<MediaFile | undefined> {
    const media = await db.mediaFiles.where('url').equals(url).first();
    
    if (media) {
      // Vérifier si le fichier n'est pas expiré
      if (media.expiresAt < new Date()) {
        await this.deleteMedia(media.id!);
        return undefined;
      }
      
      // Mettre à jour la date de dernier accès
      await db.mediaFiles.update(media.id!, { lastAccessed: new Date() });
    }
    
    return media;
  }

  // Supprimer les fichiers expirés
  static async cleanExpiredFiles(): Promise<number> {
    const now = new Date();
    const expiredFiles = await db.mediaFiles.where('expiresAt').below(now).toArray();
    
    if (expiredFiles.length > 0) {
      const ids = expiredFiles.map(file => file.id!);
      await db.mediaFiles.bulkDelete(ids);
    }
    
    return expiredFiles.length;
  }

  // Supprimer un fichier spécifique
  static async deleteMedia(id: number): Promise<void> {
    await db.mediaFiles.delete(id);
  }

  // Nettoyer le cache (supprimer les plus anciens si limite dépassée)
  static async cleanOldFiles(maxSizeMB: number = 100): Promise<number> {
    const stats = await this.getCacheStats();
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    if (stats.totalSize <= maxSizeBytes) {
      return 0;
    }
    
    // Récupérer les fichiers triés par date d'accès (plus ancien en premier)
    const files = await db.mediaFiles.orderBy('lastAccessed').toArray();
    let currentSize = stats.totalSize;
    let deletedCount = 0;
    
    for (const file of files) {
      if (currentSize <= maxSizeBytes) break;
      
      await this.deleteMedia(file.id!);
      currentSize -= file.size;
      deletedCount++;
    }
    
    return deletedCount;
  }

  // Obtenir les statistiques du cache
  static async getCacheStats(): Promise<CacheStats> {
    const files = await db.mediaFiles.toArray();
    
    if (files.length === 0) {
      return {
        totalSize: 0,
        fileCount: 0,
        oldestFile: null,
        newestFile: null
      };
    }
    
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const dates = files.map(file => file.lastAccessed);
    
    return {
      totalSize,
      fileCount: files.length,
      oldestFile: new Date(Math.min(...dates.map(d => d.getTime()))),
      newestFile: new Date(Math.max(...dates.map(d => d.getTime())))
    };
  }

  // Vider complètement le cache
  static async clearCache(): Promise<void> {
    await db.mediaFiles.clear();
    await db.cacheMetadata.clear();
  }

  // Vérifier si un fichier existe dans le cache
  static async hasMedia(url: string): Promise<boolean> {
    const count = await db.mediaFiles.where('url').equals(url).count();
    return count > 0;
  }
}
