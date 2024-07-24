import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Card from './components/Card/Card';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { MAIN_PAGE_PATH } from './constants/constants';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path={`${MAIN_PAGE_PATH}/`}
            element={
              <ErrorBoundary>
                <MainPage />
              </ErrorBoundary>
            }
          >
            <Route path={`${MAIN_PAGE_PATH}/:id`} element={<Card />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
