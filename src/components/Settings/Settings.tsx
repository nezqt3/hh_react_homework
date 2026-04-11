import { useState } from 'react';

import './Settings.css';
import { settingsSlice } from '../../features/settings/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function Settings() {
  const dispatch = useAppDispatch();
  const { addLogin, addRepo, removeFromBlackList } = settingsSlice.actions;
  const [userLogin, setUserLogin] = useState<string>(
    useAppSelector((state) => state.settings.login)
  );
  const [repo, setRepo] = useState<string>(useAppSelector((state) => state.settings.repo));
  const blacklist = useAppSelector((state) => state.settings.blacklist);

  const saveSettings = () => {
    dispatch(addLogin(userLogin));
    dispatch(addRepo(repo));
  };

  return (
    <div>
      <input
        value={userLogin ?? ''}
        onChange={(e) => {
          const value: string = e.target.value;

          setUserLogin(value);
        }}
      />
      <input
        value={repo}
        placeholder="owner/repo"
        onChange={(e) => {
          setRepo(e.target.value);
        }}
      />

      {blacklist.map((item) => {
        return (
          <div
            key={item}
            onClick={() => {
              dispatch(removeFromBlackList(item));
            }}
          >
            {item}
          </div>
        );
      })}
      <button onClick={saveSettings}>Сохранить</button>
    </div>
  );
}
