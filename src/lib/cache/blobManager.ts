/**
 * Gestionnaire global des URLs blob pour éviter les révocations prématurées
 */
class BlobURLManager {
  private static urlRefs = new Map<string, { blobUrl: string; refCount: number; originalUrl: string }>();

  /**
   * Obtenir ou créer une URL blob et incrémenter le compteur de références
   */
  static getOrCreateBlobURL(originalUrl: string, blob: Blob): string {
    const existingEntry = this.urlRefs.get(originalUrl);
    
    if (existingEntry) {
      existingEntry.refCount++;
      console.log(`🔗 [BlobManager] Réutilisation blob URL pour ${originalUrl} (refs: ${existingEntry.refCount})`);
      return existingEntry.blobUrl;
    }

    const blobUrl = URL.createObjectURL(blob);
    this.urlRefs.set(originalUrl, {
      blobUrl,
      refCount: 1,
      originalUrl
    });
    
    console.log(`🆕 [BlobManager] Nouvelle blob URL pour ${originalUrl}`);
    return blobUrl;
  }

  /**
   * Libérer une référence à une URL blob
   */
  static releaseBlobURL(originalUrl: string): void {
    const entry = this.urlRefs.get(originalUrl);
    
    if (!entry) {
      return;
    }

    entry.refCount--;
    console.log(`📉 [BlobManager] Libération référence pour ${originalUrl} (refs restantes: ${entry.refCount})`);

    if (entry.refCount <= 0) {
      URL.revokeObjectURL(entry.blobUrl);
      this.urlRefs.delete(originalUrl);
      console.log(`🗑️ [BlobManager] URL blob révoquée pour ${originalUrl}`);
    }
  }

  /**
   * Obtenir les statistiques des URLs blob en cours
   */
  static getStats() {
    return {
      totalUrls: this.urlRefs.size,
      urls: Array.from(this.urlRefs.entries()).map(([originalUrl, entry]) => ({
        originalUrl,
        blobUrl: entry.blobUrl,
        refCount: entry.refCount
      }))
    };
  }

  /**
   * Nettoyer toutes les URLs blob (pour le debug)
   */
  static cleanup(): void {
    console.log(`🧹 [BlobManager] Nettoyage de ${this.urlRefs.size} URLs blob`);
    for (const [, entry] of this.urlRefs.entries()) {
      URL.revokeObjectURL(entry.blobUrl);
    }
    this.urlRefs.clear();
  }
}

export { BlobURLManager };
