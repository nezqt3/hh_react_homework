import type { NotificationProps } from '../../../models/props';
import './Notification.css';

export function Notification({ message }: NotificationProps) {
  if (!message) return null;

  return (
    <div className="notification" role="alert">
      <div className="notification__icon">!</div>
      <p className="notification__message">{message}</p>
    </div>
  );
}
