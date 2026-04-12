import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { USERS_SLICE } from '@/shared/constants/variables/states';

import { fetchUserDetails, fetchUsers } from './usersThunk';
import { initialUsersState } from './usersTypes';

import type { GithubUserData, GithubUserDetails } from '@/shared/models/api';

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

      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true;
        state.usersError = null;
        state.data = null;
        state.selectedReviewer = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<GithubUserData[]>) => {
        state.loadingUsers = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.data = null;
        state.selectedReviewer = null;
        state.usersError = action.error.message || 'Что-то пошло не так';
      })

      // fetchUserDetails
      .addCase(fetchUserDetails.pending, (state) => {
        state.loadingUserDetails = true;
        state.userDetailsError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<GithubUserDetails>) => {
        state.loadingUserDetails = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loadingUserDetails = false;
        state.userDetailsError = action.error.message || 'Что-то пошло не так';
      });
  },
});
