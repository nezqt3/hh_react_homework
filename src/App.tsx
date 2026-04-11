import { Header } from './components/Header/Header';
import { ReviewersList } from './components/ReviewersList/ReviewersList';
import { SearchReviewer } from './components/SearchReviewer/SearchReviewer';

import './style/main.css';

function App() {
  return (
    <div>
      <Header />
      <SearchReviewer />
      <ReviewersList />
    </div>
  );
}

export default App;
