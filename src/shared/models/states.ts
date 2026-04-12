import type { GithubUserData, GithubUserDetails } from '@/shared/models/api';
import type { RepositoryFullName } from '@/shared/models/settings';

export type UsersState = {
  data: GithubUserData[] | null;
  selectedReviewer: GithubUserData | null;
  userData: GithubUserDetails | null;
  loadingUsers: boolean;
  loadingUserDetails: boolean;
  usersError: string | null;
  userDetailsError: string | null;
};

export type SettingsState = {
  login: string;
  repo: RepositoryFullName;
  blacklist: string[];
};
