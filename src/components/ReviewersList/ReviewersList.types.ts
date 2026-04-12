import type { GithubUserData } from '@/shared/models/api';

export type ReviewersListProps = {
  reviewer: GithubUserData | null;
  reviewersCount: number;
  isChoosing: boolean;
  onChooseReviewer: () => void;
  onAddToBlackList: () => void;
};
