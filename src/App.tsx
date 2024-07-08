import React from 'react';
import MainPage from './pages/MainPage';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
