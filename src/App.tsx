import { useEffect, useState } from 'react';

import { ChooseReviewer } from '@/components/ChooseReviewer/ChooseReviewer';
import { Header } from '@/components/Header/Header';
import { selectUserDetailsError, selectUsersError } from '@/features/users/usersSelector';
import { Notification } from '@/shared/lib/ui/Notification/Notification';
import { useAppSelector } from '@/store/hooks';

import './style/main.css';

function App() {
  const usersError = useAppSelector(selectUsersError);
  const userDetailsError = useAppSelector(selectUserDetailsError);
  const notificationMessage = usersError || userDetailsError;
  const [hiddenNotificationMessage, setHiddenNotificationMessage] = useState<string | null>(null);
  const isNotificationVisible =
    Boolean(notificationMessage) && notificationMessage !== hiddenNotificationMessage;

  useEffect(() => {
    if (!notificationMessage) {
      setHiddenNotificationMessage(null);
    }
  }, [notificationMessage]);

  return (
    <>
      <Notification
        message={isNotificationVisible ? notificationMessage : null}
        onClose={() => setHiddenNotificationMessage(notificationMessage)}
      />
      <Header />
      <ChooseReviewer />
    </>
  );
}

export default App;
