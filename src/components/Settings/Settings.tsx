import { useState } from 'react';

import './Settings.css';
import { BlackList } from '@/components/BlackList/BlackList';
import { settingsSlice } from '@/features/settings/settingsSlice';
import { selectUserDetailsLoading } from '@/features/users/usersSelector';
import { fetchUserDetails } from '@/features/users/usersThunk';
import { CloseButton } from '@/shared/lib/ui/CloseButton/CloseButton';
import { normalize } from '@/shared/lib/utils/normalize';
import { isRepositoryFullName } from '@/shared/lib/utils/settings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import type { SettingsProps } from './Settings.types';

export function Settings({ close }: SettingsProps) {
  const dispatch = useAppDispatch();
  const { addLogin, addRepo, addToBlackList } = settingsSlice.actions;

  const userData = useAppSelector((state) => state.users.userData);

  const cacheLogin = useAppSelector((state) => state.settings.login);
  const cacheRepo = useAppSelector((state) => state.settings.repo);

  const isLoading = useAppSelector(selectUserDetailsLoading);

  const [repo, setRepo] = useState<string>(useAppSelector((state) => state.settings.repo));
  const [userLogin, setUserLogin] = useState<string>(
    useAppSelector((state) => state.settings.login)
  );
  const [blackList, setBlackList] = useState('');

  const normalizedLogin = normalize(userLogin);
  const normalizedRepo = normalize(repo);
  const isLoginChanged = normalizedLogin !== cacheLogin;
  const isRepoChanged = normalizedRepo !== cacheRepo;
  const hasSettingsChanges = isLoginChanged || isRepoChanged;
  const isSaveDisabled =
    isLoading || !hasSettingsChanges || !normalizedLogin || !isRepositoryFullName(normalizedRepo);
  const isBlackListAddDisabled = !blackList.trim();

  const saveSettings = () => {
    if (isSaveDisabled) return;

    if (isLoginChanged) {
      dispatch(fetchUserDetails(normalizedLogin));
      dispatch(addLogin(normalizedLogin));
    }
    if (isRepoChanged) dispatch(addRepo(normalizedRepo));
  };

  const handleAddToBlackList = () => {
    if (isBlackListAddDisabled) return;

    blackList.split(',').forEach((item) => dispatch(addToBlackList(item)));
    setBlackList('');
  };

  return (
    <div className="settings">
      <div className="settings__body">
        <div className="settings__header">
          <h2 className="settings__title">Настройки</h2>
          <CloseButton close={close} />
        </div>

        <div className="settings__profile">
          <div className="settings__avatar-wrapper">
            {isLoading ? (
              <div className="settings__avatar-skeleton" aria-label="Загружаем аватар" />
            ) : userData?.avatar_url ? (
              <img src={userData.avatar_url} alt="Avatar" className="settings__avatar" />
            ) : (
              <div className="settings__avatar-placeholder" />
            )}
          </div>
          <div className="settings__profile-info">
            <p className="settings__profile-name">
              {isLoading ? 'Загружаем...' : userData?.login || 'Профиль не загружен'}
            </p>
            <p className="settings__profile-repos">
              Публичных репозиториев:{' '}
              <span>{isLoading ? 'Загружаем...' : (userData?.public_repos ?? 0)}</span>
            </p>
          </div>
        </div>

        <div className="settings__group">
          <label className="settings__label">GitHub Login</label>
          <input
            className="settings__input"
            value={userLogin}
            placeholder="Например: nezqt3"
            onChange={(e) => {
              setUserLogin(e.target.value);
            }}
          />
        </div>

        <div className="settings__group">
          <label className="settings__label">Репозиторий</label>
          <input
            className="settings__input"
            value={repo}
            placeholder="owner/repo"
            onChange={(e) => setRepo(e.target.value)}
          />
        </div>

        <div className="settings__group">
          <label className="settings__label">Добавить в черный список</label>
          <div className="settings__group-blacklist-add">
            <input
              className="settings__input"
              value={blackList}
              placeholder="nezqt3,acdlite"
              onChange={(e) => setBlackList(e.target.value)}
            />
            <button
              type="button"
              className="settings__blacklist-add-button"
              aria-label="Добавить в черный список"
              onClick={handleAddToBlackList}
              disabled={isBlackListAddDisabled}
            >
              +
            </button>
          </div>
        </div>

        <BlackList />
      </div>

      <button
        type="button"
        className="settings__save-button"
        onClick={saveSettings}
        disabled={isSaveDisabled}
      >
        Сохранить изменения
      </button>
    </div>
  );
}
