import './ReviewersList.css';
import { Reviewer } from '@/components/Reviewer/Reviewer';

import type { ReviewersListProps } from './ReviewersList.types';

export function ReviewersList({
  reviewer,
  reviewersCount,
  isChoosing,
  onChooseReviewer,
  onAddToBlackList,
}: ReviewersListProps) {
  return (
    <div className="reviewers-selection">
      <div className="reviewers-selection__card">
        {reviewer ? (
          <Reviewer
            avatar_url={reviewer.avatar_url}
            contributions={reviewer.contributions}
            login={reviewer.login}
            html_url={reviewer.html_url}
            key={reviewer.id}
          />
        ) : (
          <div className="reviewers-selection__empty">
            {reviewersCount ? 'Нажмите "Выбрать", чтобы запустить поиск' : 'Список кандидатов пуст'}
          </div>
        )}
      </div>

      <div className="reviewers-selection__actions">
        <button
          type="button"
          className="reviewers-selection__button reviewers-selection__button--primary"
          onClick={() => onChooseReviewer()}
          disabled={!reviewersCount || isChoosing}
        >
          {isChoosing ? 'Выбираем' : reviewer ? 'Выбрать другого' : 'Выбрать ревьюера'}
        </button>

        <button
          type="button"
          className="reviewers-selection__button reviewers-selection__button--secondary"
          onClick={onAddToBlackList}
          disabled={!reviewer || isChoosing}
        >
          В черный список
        </button>
      </div>
    </div>
  );
}
