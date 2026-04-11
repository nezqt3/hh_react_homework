import { useCallback, useEffect } from 'react';

import './ReviewersList.css';
import { settingsSlice } from '../../features/settings/settingsSlice';
import {
  selectReviewerCandidates,
  selectSelectedReviewer,
} from '../../features/users/usersSelector';
import { usersSlice } from '../../features/users/usersSlice';
import { normalizeLogin } from '../../shared/lib/utils/normalize';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Reviewer } from '../Reviewer/Reviewer';

export function ReviewersList() {
  const reviewers = useAppSelector(selectReviewerCandidates);
  const reviewer = useAppSelector(selectSelectedReviewer);
  const dispatch = useAppDispatch();

  const { addToBlackList } = settingsSlice.actions;
  const { clearSelectedReviewer, setSelectedReviewer } = usersSlice.actions;

  const getRandomReviewer = useCallback((): void => {
    if (!reviewers.length) return;

    const index = Math.floor(Math.random() * reviewers.length);
    dispatch(setSelectedReviewer(reviewers[index]));
  }, [dispatch, setSelectedReviewer, reviewers]);

  const chooseReviewer = useCallback(() => {
    if (!reviewers.length) return;

    const interval = setInterval(() => {
      getRandomReviewer();
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [getRandomReviewer, reviewers]);

  useEffect(() => chooseReviewer(), [chooseReviewer]);

  const addSelectedReviewerToBlackList = () => {
    if (!reviewer) return;

    const selectedLogin = normalizeLogin(reviewer.login);
    const nextReviewers = reviewers.filter(
      (candidate) => normalizeLogin(candidate.login) !== selectedLogin
    );

    dispatch(addToBlackList(reviewer.login));

    if (!nextReviewers.length) {
      dispatch(clearSelectedReviewer());
      return;
    }

    const nextReviewerIndex = Math.floor(Math.random() * nextReviewers.length);
    dispatch(setSelectedReviewer(nextReviewers[nextReviewerIndex]));
  };

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
            {reviewers.length > 0
              ? 'Нажмите "Выбрать", чтобы запустить поиск'
              : 'Список кандидатов пуст'}
          </div>
        )}
      </div>

      <div className="reviewers-selection__actions">
        <button
          type="button"
          className="reviewers-selection__button reviewers-selection__button--primary"
          onClick={chooseReviewer}
          disabled={!reviewers.length}
        >
          {reviewer ? 'Выбрать другого' : 'Выбрать ревьюера'}
        </button>

        <button
          type="button"
          className="reviewers-selection__button reviewers-selection__button--secondary"
          onClick={addSelectedReviewerToBlackList}
          disabled={!reviewer}
        >
          В черный список
        </button>
      </div>
    </div>
  );
}
