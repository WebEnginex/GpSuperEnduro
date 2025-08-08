import Dexie, { Table } from 'dexie';
import { MediaFile, CacheMetadata } from './models';

export class MediaDatabase extends Dexie {
  mediaFiles!: Table<MediaFile>;
  cacheMetadata!: Table<CacheMetadata>;

  constructor() {
    super('MediaCacheDB');
    
    this.version(1).stores({
      mediaFiles: '++id, url, type, size, lastAccessed, expiresAt',
      cacheMetadata: '++id, key, value, createdAt'
    });
  }
}

export const db = new MediaDatabase();
