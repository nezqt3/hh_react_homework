import { getUserInfoCache } from '@/shared/lib/utils/storage/users';

import type { UsersState } from '@/shared/models/states';

export const initialUsersState: UsersState = {
  data: null,
  selectedReviewer: null,
  userData: getUserInfoCache(),
  loadingUsers: false,
  loadingUserDetails: false,
  usersError: null,
  userDetailsError: null,
};
