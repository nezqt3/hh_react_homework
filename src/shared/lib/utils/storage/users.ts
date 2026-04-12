import { CacheType } from '@/shared/constants/enum/cache';
import { LOGIN, MAIN_USER } from '@/shared/constants/variables/cache';

import { readCache, removeCache, writeCache } from './cache';

import type { GithubUserDetails } from '@/shared/models/api';

export const getUserInfoCache = (): GithubUserDetails | null => {
  return readCache<GithubUserDetails>(MAIN_USER, CacheType.LOCAL);
};

export const setUserInfoCache = (data: GithubUserDetails): void => {
  writeCache<GithubUserDetails>(MAIN_USER, data, CacheType.LOCAL);
};

export const removeUserInfoCache = () => {
  removeCache(MAIN_USER, CacheType.LOCAL);
};

export const getLoginCache = (): string | null => {
  return readCache<string>(LOGIN, CacheType.LOCAL);
};

export const setLoginCache = (value: string): void => {
  writeCache<string>(LOGIN, value, CacheType.LOCAL);
};

export const removeLoginCache = () => {
  removeCache(LOGIN, CacheType.LOCAL);
};
