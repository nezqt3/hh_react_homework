import { useState } from 'react';

import './Settings.css';
import { settingsSlice } from '../../features/settings/settingsSlice';
import { CloseButton } from '../../shared/lib/ui/CloseButton/CloseButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BlackList } from '../BlackList/BlackList';

import type { SettingsProps } from '../../shared/models/settings';

export function Settings({ close }: SettingsProps) {
  const dispatch = useAppDispatch();
  const { addLogin, addRepo } = settingsSlice.actions;
  const [repo, setRepo] = useState<string>(useAppSelector((state) => state.settings.repo));
  const [userLogin, setUserLogin] = useState<string>(
    useAppSelector((state) => state.settings.login)
  );

  const saveSettings = () => {
    dispatch(addLogin(userLogin));
    dispatch(addRepo(repo));
  };

  return (
    <div className="settings">
      <div className="settings__body">
        <div className="settings__header">
          <h2 className="settings__title">Настройки</h2>
          <CloseButton close={close} />
        </div>

        <div className="settings__group">
          <label className="settings__label">GitHub Login</label>
          <input
            className="settings__input"
            value={userLogin ?? ''}
            placeholder="Напр: octocat"
            onChange={(e) => setUserLogin(e.target.value)}
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

        <BlackList />
      </div>

      <button className="settings__save-button" onClick={saveSettings}>
        Сохранить изменения
      </button>
    </div>
  );
}
