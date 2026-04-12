export const isRepositoryFullName = (value: string): boolean => {
  const [owner, repo, extra] = value.split('/').map((part) => part.trim());

  return Boolean(owner && repo && !extra);
};
