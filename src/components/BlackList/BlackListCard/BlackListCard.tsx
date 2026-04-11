import { settingsSlice } from '../../../features/settings/settingsSlice';
import { useAppDispatch } from '../../../store/hooks';

import type { BlackListCardProps } from '../../../shared/models/blacklist';

export function BlackListCard({ login }: BlackListCardProps) {
  const { removeFromBlackList } = settingsSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <div
      className="settings__blacklist-item"
      onClick={() => dispatch(removeFromBlackList(login))}
      title="Удалить из списка"
    >
      {login}
      <span className="settings__blacklist-remove">×</span>
    </div>
  );
}
