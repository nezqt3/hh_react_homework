import { getBlackListCache } from '@/shared/lib/utils/storage/blacklist';
import { getRepoCache } from '@/shared/lib/utils/storage/repo';
import { getLoginCache } from '@/shared/lib/utils/storage/users';

import type { SettingsState } from '@/shared/models/states';

export const initialSettingsState: SettingsState = {
  login: getLoginCache() || '',
  repo: getRepoCache() || '',
  blacklist: getBlackListCache() || [],
};
