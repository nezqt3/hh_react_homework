import type { GithubUserData } from './api';
import type { RepositoryFullName } from './settings';

export type UsersState = {
  data: GithubUserData[] | null;
  selectedReviewer: GithubUserData | null;
  loading: boolean;
  error: string | null;
};

export type SettingsState = {
  login: string;
  repo: RepositoryFullName;
  blacklist: string[];
};
