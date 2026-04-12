import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setUserInfoCache } from '@/shared/lib/utils/storage/users';

import { fetchUserDetails } from './usersThunk';

export const usersMiddleware = createListenerMiddleware();

usersMiddleware.startListening({
  actionCreator: fetchUserDetails.fulfilled,
  effect: (action) => {
    setUserInfoCache(action.payload);
  },
});
