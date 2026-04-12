import { GITHUB_API_URL } from '@/shared/constants/variables/api';

import { isRepositoryFullName } from './settings';

import type { GithubErrorBody, GithubUserData, GithubUserDetails } from '@/shared/models/api';

const getGithubErrorMessage = async (response: Response, entityName: string): Promise<string> => {
  let body: GithubErrorBody | null = null;

  try {
    body = (await response.json()) as GithubErrorBody;
  } catch {
    body = null;
  }

  const message = body?.message?.toLowerCase() ?? '';
  const remaining = response.headers.get('x-ratelimit-remaining');
  const retryAfter = response.headers.get('retry-after');

  if (
    response.status === 429 ||
    ((response.status === 403 || response.status === 429) &&
      (remaining === '0' || retryAfter || message.includes('rate limit')))
  ) {
    return 'Превышен лимит запросов GitHub API';
  }

  if (response.status === 404) {
    return `${entityName} не найден или нет доступа`;
  }

  if (response.status === 403) {
    return `Нет доступа к ${entityName.toLowerCase()}`;
  }

  return body?.message || `Ошибка GitHub API: ${response.status}`;
};

export const handleGetUserDetails = async (login: string): Promise<GithubUserDetails> => {
  const response: Response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(await getGithubErrorMessage(response, 'Пользователь'));
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
    throw new Error(await getGithubErrorMessage(response, 'Репозиторий'));
  }

  if (response.status === 204) {
    return [];
  }

  const data: GithubUserData[] = await response.json();

  return data;
};
