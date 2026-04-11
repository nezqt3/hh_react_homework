export type GithubUrl = `https://${string}`;
export type GithubUserType = 'User' | 'Bot' | 'Organization' | 'Mannequin';
export type GithubUserViewType = 'public' | 'private';
export type GithubUserCardData = Pick<
  GithubUserData,
  'login' | 'html_url' | 'avatar_url' | 'contributions'
>;

export type GithubUserData = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: GithubUrl;
  gravatar_id: string;
  url: GithubUrl;
  html_url: GithubUrl;
  followers_url: GithubUrl;
  following_url: GithubUrl;
  gists_url: GithubUrl;
  starred_url: GithubUrl;
  subscriptions_url: GithubUrl;
  organizations_url: GithubUrl;
  repos_url: GithubUrl;
  events_url: GithubUrl;
  received_events_url: GithubUrl;
  type: GithubUserType;
  user_view_type?: GithubUserViewType;
  site_admin: boolean;
  contributions: number;
};

export type GithubUserDetails = Omit<GithubUserData, 'contributions'> & {
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
