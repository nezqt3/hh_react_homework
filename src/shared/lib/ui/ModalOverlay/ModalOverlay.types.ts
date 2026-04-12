import type { ReactNode } from 'react';

export type ModalOverlayProps = {
  close: () => void;
  children: (close: () => void) => ReactNode;
};
