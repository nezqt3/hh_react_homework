import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleGetUsers } from '../../shared/lib/utils/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', handleGetUsers);
