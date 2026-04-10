import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ADD_TO_BLACKLIST } from '../../shared/constants/variables/states';

export const blackListSlicer = createSlice({
  name: ADD_TO_BLACKLIST,
  initialState: [] as string[],
  reducers: {
    addToBlackList: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});
