import { CacheType } from '../../../constants/enum/cache';
import { BLACK_LIST } from '../../../constants/variables/cache';
import { normalizeLogin } from '../normalize';

import { readCache, removeCache, writeCache } from './cache';

export const getBlackListCache = () => {
  return readCache<string[]>(BLACK_LIST, CacheType.LOCAL);
};

export const setBlackListCache = (values: string[]) => {
  return writeCache<string[]>(BLACK_LIST, values, CacheType.LOCAL);
};

export const removeItemFromBlackListCache = (value: string): void => {
  const blacklist: string[] | undefined = getBlackListCache()?.map(normalizeLogin);
  if (blacklist === undefined) return;

  writeCache<string[]>(
    BLACK_LIST,
    blacklist.filter((item) => item !== normalizeLogin(value)),
    CacheType.LOCAL
  );
};

export const removeBlackListCache = (): void => {
  return removeCache(BLACK_LIST, CacheType.LOCAL);
};
