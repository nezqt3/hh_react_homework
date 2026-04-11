import { useAppSelector } from '../../store/hooks';

import { BlackListCard } from './BlackListCard/BlackListCard';
import './BlackList.css';

export function BlackList() {
  const blacklist = useAppSelector((state) => state.settings.blacklist);

  if (blacklist.length === 0) {
    return <p className="blacklist__empty">Черный список пока пуст</p>;
  }

  return (
    <div className="blacklist">
      <p className="blacklist__label">Черный список</p>
      <div className="blacklist__list">
        {blacklist.map((item) => (
          <BlackListCard key={item} login={item} />
        ))}
      </div>
    </div>
  );
}
