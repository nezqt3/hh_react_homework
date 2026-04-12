import { CacheType } from '@/shared/constants/enum/cache';

export function getStorage(type: CacheType): Storage {
  return type === CacheType.LOCAL ? localStorage : sessionStorage;
}

function readStorage(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    // noop
  }
}

function removeStorage(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // noop
  }
}

export const getLocalItem = (key: string): string | null => readStorage(localStorage, key);
export const setLocalItem = (key: string, value: string): void =>
  writeStorage(localStorage, key, value);
export const removeLocalItem = (key: string): void => removeStorage(localStorage, key);

export const getSessionItem = (key: string): string | null => readStorage(sessionStorage, key);
export const setSessionItem = (key: string, value: string): void =>
  writeStorage(sessionStorage, key, value);
export const removeSessionItem = (key: string): void => removeStorage(sessionStorage, key);
