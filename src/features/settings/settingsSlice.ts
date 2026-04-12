import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { SETTINGS_SLICE } from '@/shared/constants/variables/states';
import { normalize } from '@/shared/lib/utils/normalize';

import { initialSettingsState } from './settingsTypes';

import type { RepositoryFullName } from '@/shared/models/settings';

export const settingsSlice = createSlice({
  name: SETTINGS_SLICE,
  initialState: initialSettingsState,
  reducers: {
    addToBlackList: (state, action: PayloadAction<string>) => {
      const login: string = normalize(action.payload);
      const loginUser: string = normalize(state.login);
      const blacklist = state.blacklist.map(normalize);

      if (login && !blacklist.includes(login) && loginUser !== login) state.blacklist.push(login);
    },
    removeFromBlackList: (state, action: PayloadAction<string>) => {
      const login: string = normalize(action.payload);
      state.blacklist = state.blacklist.filter((item) => normalize(item) !== login);
    },
    addLogin: (state, action: PayloadAction<string>) => {
      state.login = normalize(action.payload);
    },
    addRepo: (state, action: PayloadAction<RepositoryFullName>) => {
      state.repo = action.payload.trim();
    },
  },
});
