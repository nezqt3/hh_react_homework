import { useState } from 'react';

import './Header.css';
import { ModalOverlay } from '../../shared/lib/ui/ModalOverlay/ModalOverlay';
import { Settings } from '../Settings/Settings';

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <header className="header">
      <h1 className="header__title">Поиск ревьюера</h1>

      <button className="header__settings-button" onClick={toggleModal}>
        Настройки
      </button>

      {isOpen && (
        <ModalOverlay close={() => setIsOpen(false)}>
          {(close) => <Settings close={close} />}
        </ModalOverlay>
      )}
    </header>
  );
}
