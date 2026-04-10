import type { GithubUserData } from '../../shared/models/api';

export function Reviewer({ login, id, html_url }: GithubUserData) {
  return (
    <div key={id}>
      <p>{login}</p>
      <p>{html_url}</p>
    </div>
  );
}
