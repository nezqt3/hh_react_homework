import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { USERS_SLICE } from '@/shared/constants/variables/states';

import { fetchUserDetails, fetchUsers } from './usersThunk';
import { initialUsersState } from './usersTypes';

import type { GithubUserData } from '@/shared/models/api';

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
    clearReviewers: (state) => {
      state.data = null;
      state.selectedReviewer = null;
      state.usersError = null;
      state.loadingUsers = false;
      state.usersRequestId = null;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.userDetailsError = null;
      state.loadingUserDetails = false;
    },
  },
  extraReducers(builder) {
    builder

      // fetchUsers
      .addCase(fetchUsers.pending, (state, action) => {
        state.loadingUsers = true;
        state.usersError = null;
        state.data = null;
        state.selectedReviewer = null;
        state.usersRequestId = action.meta.requestId;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (state.usersRequestId !== action.meta.requestId) {
          return;
        }

        state.loadingUsers = false;
        state.data = action.payload;
        state.usersRequestId = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (state.usersRequestId !== action.meta.requestId) {
          return;
        }

        state.loadingUsers = false;
        state.data = null;
        state.selectedReviewer = null;
        state.usersError = action.error.message || 'Что-то пошло не так';
        state.usersRequestId = null;
      })

      // fetchUserDetails
      .addCase(fetchUserDetails.pending, (state) => {
        state.loadingUserDetails = true;
        state.userDetailsError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loadingUserDetails = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loadingUserDetails = false;
        state.userDetailsError = action.error.message || 'Что-то пошло не так';
      });
  },
});
