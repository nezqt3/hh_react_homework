import { ReviewersList } from '@/components/ReviewersList/ReviewersList';
import { SearchReviewer } from '@/components/SearchReviewer/SearchReviewer';
import { useReviewerSelection } from '@/features/users/hooks/useReviewerSelection';

export function ChooseReviewer() {
  const reviewerSelection = useReviewerSelection();

  return (
    <div className="main-section">
      <SearchReviewer onChooseReviewer={reviewerSelection.chooseReviewer} />
      <ReviewersList
        reviewer={reviewerSelection.reviewer}
        reviewersCount={reviewerSelection.reviewersCount}
        isChoosing={reviewerSelection.isChoosing}
        onChooseReviewer={reviewerSelection.chooseReviewer}
        onAddToBlackList={reviewerSelection.addSelectedReviewerToBlackList}
      />
    </div>
  );
}
