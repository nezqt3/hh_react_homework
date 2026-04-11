import { GITHUB_API_URL } from '../../constants/variables/api';

import { isRepositoryFullName } from './settings';

import type { GithubUserData } from '../../models/api';

export const handleGetUsers = async (fullRepoName: string): Promise<GithubUserData[]> => {
  if (!isRepositoryFullName(fullRepoName)) {
    throw new Error('Репозиторий должен быть в формате owner/repo');
  }

  const [owner, repo] = fullRepoName.trim().split('/');

  const response: Response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/contributors?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: GithubUserData[] = await response.json();

  return data;
};
