import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider} from '../../ContextProvider/ContextProvider';
const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  </BrowserRouter>
);

vi.mock('../SearchForm/SearchForm.tsx', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="search-form">SearchForm</div>,
  };
});

vi.mock('../Pagination/Pagination.tsx', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="pagination">Pagination</div>,
  };
});

vi.mock('../Button/Button.tsx', () => {
  return {
    __esModule: true,
    default: ({
      text,
      action,
      className,
    }: {
      text: string;
      action: () => void;
      className: string;
    }) => (
      <button className={className} onClick={action} role="theme">
        {text}
      </button>
    ),
  };
});


const mockToggleTheme = vi.fn();
vi.mock('../../ContextProvider/ContextProvider.tsx', () => ({
  useTheme: () => ({
    theme: 'dark',
    toggleTheme: mockToggleTheme,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Header component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render header correctly', () => {
    render(<Header />, { wrapper: Wrapper });
    expect(screen.getByRole('header')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    const themeButton = screen.getByRole('theme');
    expect(themeButton).toBeInTheDocument();
    expect(screen.getByText(/Switch theme/i)).toBeInTheDocument();
  });

  it('should call toggleTheme when the theme button is clicked', () => {
    render(<Header />, { wrapper: Wrapper });

    const themeButton = screen.getByRole('theme');
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
