import { configureStore } from '@reduxjs/toolkit';

import { blackListSlicer } from '../features/blacklist/blacklistSlice';
import { userSlicer } from '../features/users/usersSlice';

export const store = configureStore({
  reducer: { users: userSlicer.reducer, blacklist: blackListSlicer.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
