import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { SETTINGS_SLICE } from '../../shared/constants/variables/states';
import { normalizeLogin } from '../../shared/lib/utils/normalize';

import { initialSettingsState } from './settingsTypes';

import type { RepositoryFullName } from '../../shared/models/settings';

export const settingsSlice = createSlice({
  name: SETTINGS_SLICE,
  initialState: initialSettingsState,
  reducers: {
    addToBlackList: (state, action: PayloadAction<string>) => {
      const login: string = normalizeLogin(action.payload);
      const loginUser: string = normalizeLogin(state.login);
      const blacklist = state.blacklist.map(normalizeLogin);

      if (login && !blacklist.includes(login) && loginUser !== login) state.blacklist.push(login);
    },
    removeFromBlackList: (state, action: PayloadAction<string>) => {
      const login: string = normalizeLogin(action.payload);
      state.blacklist = state.blacklist.filter((item) => normalizeLogin(item) !== login);
    },
    addLogin: (state, action: PayloadAction<string>) => {
      state.login = normalizeLogin(action.payload);
    },
    addRepo: (state, action: PayloadAction<RepositoryFullName>) => {
      state.repo = action.payload.trim();
    },
  },
});
