import { getUsersCache } from '../../shared/lib/utils/storage/users';

import type { UsersState } from '../../shared/models/states';

export const initialUsersState: UsersState = {
  data: getUsersCache(),
  selectedReviewer: null,
  loading: false,
  error: null,
};
