import type { GithubUserData } from '@/shared/models/api';

export type SearchReviewerProps = {
  onChooseReviewer: (reviewers?: GithubUserData[]) => void;
};
