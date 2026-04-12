import './CloseButton.css';

import type { CloseButtonProps } from './CloseButton.types';

export function CloseButton({ close }: CloseButtonProps) {
  return (
    <button className="close-button" type="button" onClick={close} aria-label="Закрыть">
      <span className="close-button__line" />
      <span className="close-button__line" />
    </button>
  );
}
