import { useAppSelector } from '../../store/hooks';

import { BlackListCard } from './BlackListCard/BlackListCard';

export function BlackList() {
  const blacklist = useAppSelector((state) => state.settings.blacklist);

  if (blacklist.length === 0) {
    return <p>Черный список пока пуст</p>;
  }

  return (
    <div className="settings__blacklist">
      <label className="settings__label">Черный список</label>
      <div className="settings__blacklist-list">
        {blacklist.map((item) => (
          <BlackListCard key={item} login={item} />
        ))}
      </div>
    </div>
  );
}
