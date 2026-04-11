import { CacheType } from '../../../constants/enum/cache';
import { GITHUB_USERS, LOGIN, MAIN_USER } from '../../../constants/variables/cache';

import { readCache, removeCache, writeCache } from './cache';

import type { GithubUserData, GithubUserDetails } from '../../../models/api';

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

export const getUsersCache = (): GithubUserData[] | null => {
  return readCache<GithubUserData[]>(GITHUB_USERS, CacheType.LOCAL);
};

export const setUsersCache = (value: GithubUserData[]): void => {
  writeCache<GithubUserData[]>(GITHUB_USERS, value, CacheType.LOCAL);
};

export const removeUsersCache = () => {
  removeCache(GITHUB_USERS, CacheType.LOCAL);
};
