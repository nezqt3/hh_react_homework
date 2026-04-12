import './SearchReviewer.css';
import { useEffect, useRef } from 'react';

import { selectUsersLoading } from '@/features/users/usersSelector';
import { fetchUsers } from '@/features/users/usersThunk';
import { isRepositoryFullName } from '@/shared/lib/utils/settings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import type { SearchReviewerProps } from './SearchReviewer.types';

export function SearchReviewer({ onChooseReviewer, isChoosing }: SearchReviewerProps) {
  const dispatch = useAppDispatch();
  const repo = useAppSelector((state) => state.settings.repo);
  const repoRef = useRef(repo);
  const isLoading = useAppSelector(selectUsersLoading);
  const isSearchDisabled = isLoading || !isRepositoryFullName(repo);

  useEffect(() => {
    repoRef.current = repo;
  }, [repo]);

  const handleSearch = async () => {
    const requestedRepo = repo;

    try {
      const users = await dispatch(fetchUsers(requestedRepo)).unwrap();

      if (repoRef.current !== requestedRepo) {
        return;
      }

      onChooseReviewer(users);
    } catch {
      // noop
    }
  };

  return (
    <div className="search-reviewer">
      <div className="search-reviewer__container">
        <h2 className="search-reviewer__title">Найти ревьюера</h2>
        <p className="search-reviewer__subtitle">
          Поиск активных контрибьюторов для репозитория: <span>{repo || 'Не указано'}</span>
        </p>

        <button
          type="button"
          className="search-reviewer__button"
          onClick={handleSearch}
          disabled={isSearchDisabled || isChoosing}
        >
          {isLoading ? 'Ищем...' : 'Запустить поиск'}
        </button>
      </div>
    </div>
  );
}
