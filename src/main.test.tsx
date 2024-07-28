import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from './ContextProvider/ContextProvider.tsx';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from './redux/store.ts';
import App from './App.tsx';
import { MAIN_PAGE_PATH } from './constants/constants.ts';

describe('App Component', () => {
  const renderWithProviders = (ui: React.ReactElement, route: string) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <ThemeProvider>{ui}</ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );
  };

  it('renders without crashing on root path', () => {
    renderWithProviders(<App />, `${MAIN_PAGE_PATH}`);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows error message on unhandled path', () => {
    renderWithProviders(<App />, '/some-non-existent-path');
    expect(screen.getByText('Error. No page on this path')).toBeInTheDocument();
  });

});
