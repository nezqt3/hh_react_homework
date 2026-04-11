import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setUserInfoCache, setUsersCache } from '../../shared/lib/utils/storage/users';

import { fetchUserDetails, fetchUsers } from './usersThunk';

export const usersMiddleware = createListenerMiddleware();

usersMiddleware.startListening({
  actionCreator: fetchUsers.fulfilled,
  effect: (action) => {
    setUsersCache(action.payload);
  },
});

usersMiddleware.startListening({
  actionCreator: fetchUserDetails.fulfilled,
  effect: (action) => {
    setUserInfoCache(action.payload);
  },
});
