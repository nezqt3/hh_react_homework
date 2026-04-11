import { useCallback, useEffect, useRef, useState } from 'react';

import './ModalOverlay.css';

import { CLOSE_ANIMATION_MS } from '../../../constants/variables/time';

import type { ModalOverlayProps } from '../../../models/ui';

export function ModalOverlay({ children, close }: ModalOverlayProps) {
  useEffect(() => {
    const originalOverflow: string = document.body.style.overflowX;

    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = originalOverflow;
    };
  }, []);

  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const handleClose = useCallback(() => {
    if (closeTimeoutRef.current !== null) return;

    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      close();
    }, CLOSE_ANIMATION_MS);
  }, [close]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`modal-overlay ${isClosing ? 'modal-overlay_closing' : ''}`}
      onClick={handleClose}
    >
      <aside
        className={`modal-overlay__panel ${isClosing ? 'modal-overlay__panel_closing' : ''}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children(handleClose)}
      </aside>
    </div>
  );
}
