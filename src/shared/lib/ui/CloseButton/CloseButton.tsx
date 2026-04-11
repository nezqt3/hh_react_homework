import './CloseButton.css';

import type { CloseProps } from '../../../models/props';

export function CloseButton({ close }: CloseProps) {
  return (
    <button className="close-button" type="button" onClick={close} aria-label="Закрыть">
      <span className="close-button__line" />
      <span className="close-button__line" />
    </button>
  );
}
