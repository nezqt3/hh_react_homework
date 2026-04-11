import { ReviewersList } from './components/ReviewersList/ReviewersList';
import { SearchReviewer } from './components/SearchReviewer/SearchReviewer';
import { Settings } from './components/Settings/Settings';
import './style/main.css';

function App() {
  return (
    <>
      <Settings />
      <SearchReviewer />
      <ReviewersList />
    </>
  );
}

export default App;
