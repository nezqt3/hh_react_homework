import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { setBlackListCache } from '../../shared/lib/utils/storage/blacklist';
import { setRepoCache } from '../../shared/lib/utils/storage/repo';
import { setLoginCache } from '../../shared/lib/utils/storage/users';

import { settingsSlice } from './settingsSlice';

import type { SettingsState } from '../../shared/models/states';

export const settingsMiddleware = createListenerMiddleware();

const { addLogin, addToBlackList, addRepo, removeFromBlackList } = settingsSlice.actions;

settingsMiddleware.startListening({
  matcher: isAnyOf(addLogin, addToBlackList, addRepo, removeFromBlackList),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as { settings: SettingsState };

    const { login, blacklist, repo } = state.settings;

    setLoginCache(login);
    setBlackListCache(blacklist);
    setRepoCache(repo);
  },
});
