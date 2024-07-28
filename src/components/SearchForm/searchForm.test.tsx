import { ReactNode } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from './SearchForm';
import { ThemeProvider } from '../../ContextProvider/ContextProvider';
import { vi } from 'vitest';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider>{children}</ThemeProvider>
  </BrowserRouter>
);

describe('SearchForm', () => {

  let mockLocalStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
    removeItem: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('saves entered value to local storage when Search button is clicked', async () => {
    render(<SearchForm />, { wrapper: Wrapper });

    const input = screen.getByPlaceholderText('Enter number from 1 to 826') as HTMLInputElement;
    const button = screen.getByText(/Search/i);

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('person', JSON.stringify('123'));
    });
  });

  test('retrieves value from local storage upon mounting', async () => {
    mockLocalStorage.getItem.mockReturnValue('456');

    render(<SearchForm />, { wrapper: Wrapper });

    const input = (await screen.findByPlaceholderText(
      'Enter number from 1 to 826',
    )) as HTMLInputElement;
    expect(input.value).toBe('456');
  });
});
