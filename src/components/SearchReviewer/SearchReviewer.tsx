import { handleGetUsers } from '../../shared/lib/utils/api';
import './SearchReviewer.css';

export function SearchReviewer() {
  return (
    <div>
      <h1>Найти ревьюера</h1>
      <button onClick={handleGetUsers}>Найти ревьюера</button>
    </div>
  );
}
