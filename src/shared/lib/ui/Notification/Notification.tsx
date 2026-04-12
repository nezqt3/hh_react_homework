import type { NotificationProps } from './Notification.types';
import './Notification.css';

export function Notification({ message, onClose }: NotificationProps) {
  if (!message) return null;

  return (
    <div className="notification" role="alert">
      <div className="notification__icon">!</div>
      <p className="notification__message">{message}</p>
      <button
        type="button"
        className="notification__close"
        onClick={onClose}
        aria-label="Закрыть уведомление"
      >
        <span className="notification__close-line" />
        <span className="notification__close-line" />
      </button>
    </div>
  );
}
