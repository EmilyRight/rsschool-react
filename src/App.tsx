import React from 'react';
import MainPage from './pages/MainPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const url = 'https://rickandmortyapi.com/api/character/';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <ErrorBoundary fallback="Error =(">
          <MainPage url={url} />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
