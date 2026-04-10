import { useState } from 'react';

import './Settings.css';
import { isRepoType } from '../../shared/lib/utils/settings';

import type { Repo } from '../../shared/models/settings';

export function Settings() {
  const [login, setLogin] = useState<string>('');
  const [_, setRepo] = useState<Repo>('owner');
  const [blacklist, setBlacklist] = useState<string[]>([]);

  const handleSelectTypeRepo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isRepoType(value)) {
      setRepo(value);
    }
  };

  return (
    <div>
      <input value={login} onChange={(e) => setLogin(e.target.value)} />
      <div>
        <input type="checkbox" value="repo" onChange={handleSelectTypeRepo} />
        <input type="checkbox" value="owner" onChange={handleSelectTypeRepo} />
      </div>

      <input value={blacklist} onChange={(e) => setBlacklist(e.target.value.split(','))} />
    </div>
  );
}
