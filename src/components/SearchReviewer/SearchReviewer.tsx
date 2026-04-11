import './SearchReviewer.css';
import { fetchUsers } from '../../features/users/usersThunk';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function SearchReviewer() {
  const dispatch = useAppDispatch();
  const repo = useAppSelector((state) => state.settings.repo);

  return (
    <div>
      <h1>Найти ревьюера</h1>
      <button onClick={() => dispatch(fetchUsers(repo))}>Найти ревьюера</button>
    </div>
  );
}
