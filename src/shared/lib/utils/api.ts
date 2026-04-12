import { GITHUB_API_URL } from '@/shared/constants/variables/api';

import { isRepositoryFullName } from './settings';

import type { GithubUserData, GithubUserDetails } from '@/shared/models/api';

const getGithubErrorMessage = (response: Response, entityName: string): string => {
  if (response.status === 404) {
    return `${entityName} не найден`;
  }

  if (response.status === 403) {
    return 'Превышен лимит запросов GitHub API';
  }

  return response.statusText || `Ошибка GitHub API: ${response.status}`;
};

export const handleGetUserDetails = async (login: string): Promise<GithubUserDetails> => {
  const response: Response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(getGithubErrorMessage(response, 'Пользователь'));
  }

  const data: GithubUserDetails = await response.json();

  return data;
};

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
    throw new Error(getGithubErrorMessage(response, 'Репозиторий'));
  }

  if (response.status === 204) {
    return [];
  }

  const data: GithubUserData[] = await response.json();

  return data;
};
