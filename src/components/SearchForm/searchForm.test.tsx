import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    const user = userEvent.setup();
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('search');

    await user.type(inputElement, 'morty');
    await user.click(buttonElement);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('person', JSON.stringify('morty'));
  });

  test('retrieves value from local storage upon mounting', async () => {
    mockLocalStorage.getItem.mockReturnValue('456');

    render(<SearchForm />, { wrapper: Wrapper });

    const input = (await screen.findByPlaceholderText('Enter the name')) as HTMLInputElement;
    expect(input.value).toBe('456');
  });
});
