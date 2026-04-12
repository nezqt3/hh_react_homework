import { createListenerMiddleware } from '@reduxjs/toolkit';

import { removeUserInfoCache, setUserInfoCache } from '@/shared/lib/utils/storage/users';

import { usersSlice } from './usersSlice';
import { fetchUserDetails } from './usersThunk';

export const usersMiddleware = createListenerMiddleware();

const { clearUserData } = usersSlice.actions;

usersMiddleware.startListening({
  actionCreator: fetchUserDetails.fulfilled,
  effect: (action) => {
    setUserInfoCache(action.payload);
  },
});

usersMiddleware.startListening({
  actionCreator: clearUserData,
  effect: () => {
    removeUserInfoCache();
  },
});
