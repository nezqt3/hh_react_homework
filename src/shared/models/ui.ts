export interface CloseProps {
  close: () => void;
}

export interface ModalOverlayProps extends CloseProps {
  children: (close: () => void) => React.ReactNode;
}
