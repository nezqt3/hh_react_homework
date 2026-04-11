export const isRepositoryFullName = (value: string): boolean => {
  const [owner, repo, extra] = value.trim().split('/');

  return Boolean(owner && repo && !extra);
};
