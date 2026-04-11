import { CacheType } from '../../../constants/enum/cache';

import {
  getLocalItem,
  getSessionItem,
  removeLocalItem,
  removeSessionItem,
  setLocalItem,
  setSessionItem,
} from './core';

import type { CachedValue } from '../../../models/cache';

export function readCache<T>(key: string, type: CacheType = CacheType.LOCAL): T | null {
  try {
    const raw: string | null = type === CacheType.LOCAL ? getLocalItem(key) : getSessionItem(key);

    if (raw === null) {
      return null;
    }

    const parsed: CachedValue<T> = JSON.parse(raw) as CachedValue<T>;

    if (!parsed || typeof parsed !== 'object' || !('data' in parsed)) {
      return null;
    }

    return parsed.data ?? null;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, data: T, type: CacheType = CacheType.LOCAL): void {
  const payload: CachedValue<T> = {
    data,
    savedAt: Date.now(),
  };

  if (type === CacheType.LOCAL) {
    setLocalItem(key, JSON.stringify(payload));
  } else {
    setSessionItem(key, JSON.stringify(payload));
  }
}

export function removeCache(key: string, type: CacheType = CacheType.LOCAL) {
  if (type === CacheType.LOCAL) {
    removeLocalItem(key);
  } else {
    removeSessionItem(key);
  }
}
