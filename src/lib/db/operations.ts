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
      
      // NE PLUS mettre à jour lastAccessed à chaque lecture pour éviter les écritures inutiles
      // La date sera mise à jour seulement lors du nettoyage si nécessaire
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
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    // Calculer la taille totale plus efficacement
    let totalSize = 0;
    await db.mediaFiles.each(file => {
      totalSize += file.size;
    });
    
    if (totalSize <= maxSizeBytes) {
      return 0;
    }
    
    // Récupérer seulement les IDs et tailles, triés par date d'accès
    const filesToCheck = await db.mediaFiles
      .orderBy('lastAccessed')
      .toArray();
    
    let currentSize = totalSize;
    const idsToDelete: number[] = [];
    
    for (const file of filesToCheck) {
      if (currentSize <= maxSizeBytes) break;
      
      idsToDelete.push(file.id!);
      currentSize -= file.size;
    }
    
    // Supprimer en une seule opération
    if (idsToDelete.length > 0) {
      await db.mediaFiles.bulkDelete(idsToDelete);
    }
    
    return idsToDelete.length;
  }

  // Obtenir les statistiques du cache (version ultra-optimisée)
  static async getCacheStats(): Promise<CacheStats> {
    // Compter seulement
    const fileCount = await db.mediaFiles.count();
    
    if (fileCount === 0) {
      return {
        totalSize: 0,
        fileCount: 0,
        oldestFile: null,
        newestFile: null
      };
    }
    
    // Pour la taille, on utilise une transaction optimisée
    const totalSize = await db.transaction('r', db.mediaFiles, async () => {
      let sum = 0;
      await db.mediaFiles.each(file => {
        sum += file.size;
      });
      return sum;
    });
    
    // Pour les dates, récupérer seulement les extrêmes
    const oldestFile = await db.mediaFiles.orderBy('lastAccessed').first();
    const newestFile = await db.mediaFiles.orderBy('lastAccessed').last();
    
    return {
      totalSize,
      fileCount,
      oldestFile: oldestFile?.lastAccessed || null,
      newestFile: newestFile?.lastAccessed || null
    };
  }

  // Vider complètement le cache
  static async clearCache(): Promise<void> {
    await db.mediaFiles.clear();
    await db.cacheMetadata.clear();
  }

  // Vérifier si un fichier existe dans le cache
  static async hasMedia(url: string): Promise<boolean> {
    const media = await db.mediaFiles.where('url').equals(url).first();
    
    if (!media) {
      return false;
    }
    
    // Vérifier si le fichier n'est pas expiré
    if (media.expiresAt < new Date()) {
      // Supprimer le fichier expiré
      await this.deleteMedia(media.id!);
      return false;
    }
    
    return true;
  }
}
