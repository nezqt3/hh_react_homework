import type { GithubUserCardData } from '@/shared/models/api';

import './Reviewer.css';

export function Reviewer({ avatar_url, contributions, login, html_url }: GithubUserCardData) {
  return (
    <div className="reviewer-card">
      <div className="reviewer-card__avatar-container">
        <img src={avatar_url} alt={login} className="reviewer-card__avatar" />
      </div>

      <div className="reviewer-card__info">
        <h3 className="reviewer-card__login">{login}</h3>

        <div className="reviewer-card__stats">
          <span className="reviewer-card__label">Контрибуций:</span>
          <span className="reviewer-card__value">{contributions}</span>
        </div>

        <a href={html_url} target="_blank" rel="noreferrer" className="reviewer-card__link">
          Профиль GitHub
        </a>
      </div>
    </div>
  );
}
