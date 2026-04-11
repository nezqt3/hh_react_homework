import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { USERS_SLICE } from '../../shared/constants/variables/states';

import { fetchUsers } from './usersThunk';
import { initialUsersState } from './usersTypes';

import type { GithubUserData } from '../../shared/models/api';

export const usersSlice = createSlice({
  name: USERS_SLICE,
  initialState: initialUsersState,
  reducers: {
    setSelectedReviewer: (state, action: PayloadAction<GithubUserData>) => {
      state.selectedReviewer = action.payload;
    },
    clearSelectedReviewer: (state) => {
      state.selectedReviewer = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedReviewer = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<GithubUserData[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Что-то пошло не так';
      });
  },
});
