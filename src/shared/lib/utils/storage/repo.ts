import { CacheType } from '@/shared/constants/enum/cache';
import { REPO } from '@/shared/constants/variables/cache';

import { readCache, writeCache } from './cache';

import type { RepositoryFullName } from '@/shared/models/settings';

export function getRepoCache(): RepositoryFullName | null {
  return readCache<RepositoryFullName>(REPO, CacheType.LOCAL);
}

export function setRepoCache(value: RepositoryFullName): void {
  writeCache<RepositoryFullName>(REPO, value, CacheType.LOCAL);
}
