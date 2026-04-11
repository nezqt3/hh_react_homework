import { createSelector } from '@reduxjs/toolkit';

import { normalizeLogin } from '../../shared/lib/utils/normalize';

import type { RootState } from '../../store/store';

export const selectUsers = (state: RootState) => state.users.data ?? [];
export const selectCurrentLogin = (state: RootState) => state.settings.login;
export const selectBlackList = (state: RootState) => state.settings.blacklist;
export const selectSelectedReviewer = (state: RootState) => state.users.selectedReviewer;
export const selectUsersLoading = (state: RootState) => state.users.loadingUsers;
export const selectUserDetailsLoading = (state: RootState) => state.users.loadingUserDetails;
export const selectUsersError = (state: RootState) => state.users.usersError;
export const selectUserDetailsError = (state: RootState) => state.users.userDetailsError;

export const selectReviewerCandidates = createSelector(
  [selectUsers, selectCurrentLogin, selectBlackList],
  (users, currentLogin, blacklist) => {
    const excludedLogins = new Set(
      [currentLogin, ...blacklist].map(normalizeLogin).filter(Boolean)
    );

    return users.filter((user) => !excludedLogins.has(normalizeLogin(user.login)));
  }
);
