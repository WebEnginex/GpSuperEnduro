'use client';

import { useAutoCache } from '@/hooks/useAutoCache';

export function AutoCacheProvider() {
  useAutoCache();
  return null; // Ce composant ne rend rien mais active le cache automatique
}
