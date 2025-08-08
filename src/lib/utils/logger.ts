// Utilitaire pour les logs en développement uniquement
export class DevLogger {
  private static isDev = process.env.NODE_ENV === 'development';

  static log(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.log(`🔧 [DEV] ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.info(`ℹ️ [CACHE] ${message}`, ...args);
    }
  }

  static success(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.log(`✅ [CACHE] ${message}`, ...args);
    }
  }

  static warn(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.warn(`⚠️ [CACHE] ${message}`, ...args);
    }
  }

  static error(message: string, ...args: unknown[]) {
    if (this.isDev) {
      console.error(`❌ [CACHE] ${message}`, ...args);
    }
  }

  static cache(action: string, url: string, size?: number) {
    if (this.isDev) {
      const sizeText = size ? ` (${this.formatSize(size)})` : '';
      console.log(`💾 [CACHE] ${action}: ${url}${sizeText}`);
    }
  }

  static performance(label: string, startTime: number) {
    if (this.isDev) {
      const duration = Date.now() - startTime;
      console.log(`⚡ [PERF] ${label}: ${duration}ms`);
    }
  }

  static stats(stats: Record<string, unknown>) {
    if (this.isDev) {
      console.group('📊 [CACHE STATS]');
      console.table(stats);
      console.groupEnd();
    }
  }

  private static formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
