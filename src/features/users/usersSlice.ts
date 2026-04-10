import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { GET_USERS } from '../../shared/constants/variables/states';

import { fetchUsers } from './usersThunk';
import { initialUsersState } from './usersTypes';

import type { GithubUserData } from '../../shared/models/api';

export const userSlicer = createSlice({
  name: GET_USERS,
  initialState: initialUsersState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
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
