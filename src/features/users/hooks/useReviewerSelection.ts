import { useCallback, useEffect, useRef, useState } from 'react';

import { settingsSlice } from '@/features/settings/settingsSlice';
import { selectReviewerCandidates, selectSelectedReviewer } from '@/features/users/usersSelector';
import { usersSlice } from '@/features/users/usersSlice';
import { normalize } from '@/shared/lib/utils/normalize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function useReviewerSelection() {
  const [isChoosing, setIsChoosing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reviewers = useAppSelector(selectReviewerCandidates);
  const reviewer = useAppSelector(selectSelectedReviewer);
  const currentLogin = useAppSelector((state) => state.settings.login);
  const blacklist = useAppSelector((state) => state.settings.blacklist);

  const { addToBlackList } = settingsSlice.actions;
  const { clearSelectedReviewer, setSelectedReviewer } = usersSlice.actions;

  const dispatch = useAppDispatch();

  const clearSelectionTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = null;
    timeoutRef.current = null;
  }, []);

  const getAvailableCandidates = useCallback(
    (candidates = reviewers) => {
      const excludedLogins = new Set([currentLogin, ...blacklist].map(normalize).filter(Boolean));

      return candidates.filter((candidate) => !excludedLogins.has(normalize(candidate.login)));
    },
    [blacklist, currentLogin, reviewers]
  );

  const getRandomReviewer = useCallback(
    (candidates = reviewers): void => {
      if (!candidates.length) return;

      const index = Math.floor(Math.random() * candidates.length);
      dispatch(setSelectedReviewer(candidates[index]));
    },
    [dispatch, setSelectedReviewer, reviewers]
  );

  const chooseReviewer = useCallback(
    (candidates = reviewers) => {
      clearSelectionTimers();
      const availableCandidates = getAvailableCandidates(candidates);

      if (!availableCandidates.length) {
        dispatch(clearSelectedReviewer());
        return;
      }

      setIsChoosing(true);

      intervalRef.current = setInterval(() => {
        getRandomReviewer(availableCandidates);
      }, 160);

      timeoutRef.current = setTimeout(() => {
        clearSelectionTimers();
        getRandomReviewer(availableCandidates);

        setIsChoosing(false);
      }, 1000);
    },
    [
      clearSelectionTimers,
      reviewers,
      getAvailableCandidates,
      dispatch,
      clearSelectedReviewer,
      getRandomReviewer,
    ]
  );

  const addSelectedReviewerToBlackList = useCallback(() => {
    if (!reviewer) return;

    const selectedLogin = normalize(reviewer.login);
    const nextReviewers = reviewers.filter(
      (candidate) => normalize(candidate.login) !== selectedLogin
    );

    dispatch(addToBlackList(reviewer.login));

    if (!nextReviewers.length) {
      dispatch(clearSelectedReviewer());
      return;
    }

    chooseReviewer(nextReviewers);
  }, [dispatch, reviewers, reviewer, addToBlackList, clearSelectedReviewer, chooseReviewer]);

  useEffect(() => {
    return clearSelectionTimers;
  }, [clearSelectionTimers]);

  return {
    reviewer,
    reviewersCount: reviewers.length,
    isChoosing,
    chooseReviewer,
    addSelectedReviewerToBlackList,
  };
}
