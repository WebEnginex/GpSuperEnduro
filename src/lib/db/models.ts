export interface MediaFile {
  id?: number;
  url: string;
  type: 'image' | 'video';
  data: Blob;
  size: number;
  mimeType: string;
  lastAccessed: Date;
  expiresAt: Date;
  filename?: string;
}

export interface CacheMetadata {
  id?: number;
  key: string;
  value: string | number | boolean | object;
  createdAt: Date;
}

export interface CacheStats {
  totalSize: number;
  fileCount: number;
  oldestFile: Date | null;
  newestFile: Date | null;
}

export type MediaType = 'image' | 'video';
