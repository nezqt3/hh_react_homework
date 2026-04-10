export const REPO_TYPES = ['repo', 'owner'] as const;
export type Repo = (typeof REPO_TYPES)[number];
