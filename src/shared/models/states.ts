import type { GithubUserData, GithubUserDetails } from './api';
import type { RepositoryFullName } from './settings';

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
