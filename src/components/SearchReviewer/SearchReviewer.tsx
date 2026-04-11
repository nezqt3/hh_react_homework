import './SearchReviewer.css';
import { fetchUsers } from '../../features/users/usersThunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function SearchReviewer() {
  const dispatch = useAppDispatch();
  const repo = useAppSelector((state) => state.settings.repo);

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
          onClick={() => dispatch(fetchUsers(repo))}
          disabled={!repo}
        >
          Запустить поиск
        </button>
      </div>
    </div>
  );
}
