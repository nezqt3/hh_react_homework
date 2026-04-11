import type { GithubUserData } from '../../shared/models/api';

export function User({ login, html_url }: GithubUserData) {
  return (
    <div>
      <p>{login}</p>
      <p>{html_url}</p>
    </div>
  );
}
