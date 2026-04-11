import { Header } from './components/Header/Header';
import { ReviewersList } from './components/ReviewersList/ReviewersList';
import { SearchReviewer } from './components/SearchReviewer/SearchReviewer';
import { selectUserDetailsError, selectUsersError } from './features/users/usersSelector';
import { Notification } from './shared/lib/ui/Notification/Notification';
import { useAppSelector } from './store/hooks';

import './style/main.css';

function App() {
  const usersError = useAppSelector(selectUsersError);
  const userDetailsError = useAppSelector(selectUserDetailsError);

  return (
    <>
      <Notification message={usersError || userDetailsError} />
      <Header />
      <div className="main-section">
        <SearchReviewer />
        <ReviewersList />
      </div>
    </>
  );
}

export default App;
