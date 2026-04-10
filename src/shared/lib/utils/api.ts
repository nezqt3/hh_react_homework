import { GITHUB_API_URL } from '../../constants/variables/github';

import type { GithubUserData } from '../../models/api';

export const handleGetUsers = async (): Promise<GithubUserData[]> => {
  const response: Response = await fetch(`${GITHUB_API_URL}/users?per_page=15`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: GithubUserData[] = await response.json();

  return data;
};
