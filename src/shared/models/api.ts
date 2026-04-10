export interface GithubResponse {
  total_count: number;
  items: GithubUserData[];
}

export type GithubUserData = {
  login: string;
  id: number;
  html_url: string;
};
