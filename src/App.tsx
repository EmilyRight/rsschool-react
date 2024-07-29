import { MAIN_PAGE_PATH } from './constants/constants';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Card from './components/Card/Card';

function App() {
  return (
    <div data-testid="app-root">
      <Routes>
        <Route
          path={`${MAIN_PAGE_PATH}/`}
          element={
            <ErrorBoundary>
              <MainPage />
            </ErrorBoundary>
          }
        >
          <Route path={`:id`} element={<Card />} />
          <Route path={`${MAIN_PAGE_PATH}/`} element={<Card />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
export default App;
