import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Card from './components/Card/Card';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/rsschool-react/public/"
          element={
            <ErrorBoundary>
              <MainPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/rsschool-react/public/page"
          element={
            <ErrorBoundary>
              <MainPage />
            </ErrorBoundary>
          }
        />
        <Route path="/rsschool-react/public/:id" element={<Card />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
