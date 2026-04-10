import { REPO_TYPES, type Repo } from '../../models/settings';

export const isRepoType = (value: string): value is Repo => {
  return REPO_TYPES.includes(value as Repo);
};
