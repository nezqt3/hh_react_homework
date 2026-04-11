import { configureStore } from '@reduxjs/toolkit';

import { settingsMiddleware } from '../features/settings/settingsMiddleware';
import { settingsSlice } from '../features/settings/settingsSlice';
import { usersSlice } from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    settings: settingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(settingsMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
