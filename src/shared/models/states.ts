import type { GithubUserData } from './api';

export type UsersState = {
  data: GithubUserData[];
  loading: boolean;
  error: string | null;
};
