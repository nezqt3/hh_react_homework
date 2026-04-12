import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleGetUserDetails, handleGetUsers } from '@/shared/lib/utils/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', handleGetUsers);

export const fetchUserDetails = createAsyncThunk('users/fetchUserDetails', handleGetUserDetails);
