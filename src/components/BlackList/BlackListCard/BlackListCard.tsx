import { settingsSlice } from '@/features/settings/settingsSlice';
import { useAppDispatch } from '@/store/hooks';

import type { BlackListCardProps } from './BlackListCard.types';
import './BlackListCard.css';

export function BlackListCard({ login }: BlackListCardProps) {
  const { removeFromBlackList } = settingsSlice.actions;
  const dispatch = useAppDispatch();
  const githubProfileUrl = `https://github.com/${login}`;

  return (
    <div className="blacklist-card" title="Элемент черного списка">
      <a href={githubProfileUrl} target="_blank" rel="noreferrer" className="blacklist-card__link">
        <span className="blacklist-card__login">{login}</span>
        <span className="blacklist-card__profile-link">Перейти на GitHub</span>
      </a>

      <button
        type="button"
        className="blacklist-card__remove"
        aria-label={`Удалить ${login} из черного списка`}
        onClick={() => dispatch(removeFromBlackList(login))}
      >
        ×
      </button>
    </div>
  );
}
