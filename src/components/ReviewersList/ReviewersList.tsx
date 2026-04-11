import { useCallback, useEffect } from 'react';

import { settingsSlice } from '../../features/settings/settingsSlice';
import {
  selectReviewerCandidates,
  selectSelectedReviewer,
} from '../../features/users/usersSelector';
import { usersSlice } from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Reviewer } from '../User/User';

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

  useEffect(() => {
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
  }, [reviewers, getRandomReviewer]);

  return (
    <div className="reviewer-list">
      {reviewer ? (
        <Reviewer
          login={reviewer.login}
          id={reviewer.id}
          html_url={reviewer.html_url}
          key={reviewer.id}
        />
      ) : (
        'Ничего не нашлось'
      )}
      <div>
        <button onClick={getRandomReviewer} disabled={!reviewers.length}>
          Выбрать
        </button>
        <button
          onClick={() => {
            if (reviewer?.login) {
              dispatch(addToBlackList(reviewer.login));
              dispatch(clearSelectedReviewer());
            }
          }}
          disabled={!reviewer}
        >
          Черный список
        </button>
      </div>
    </div>
  );
}
