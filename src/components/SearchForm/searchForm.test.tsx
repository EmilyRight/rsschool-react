import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';
import useLocalStorage from '../../hooks/localStorage';

vi.mock('../../hooks/localStorage.tsx');

describe('SearchForm component', () => {
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    localStorageMock = {};
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(
      key => localStorageMock[key] || null,
    );
    vi.spyOn(window.localStorage, 'setItem').mockImplementation((key, value) => {
      localStorageMock[key] = value;
    });

    vi.clearAllMocks();
  });

  it('saves the entered value to local storage upon clicking the Search button', () => {
    const onQuerySubmit = vi.fn();

    (useLocalStorage as jest.Mock).mockImplementation(() => {
      let value = '';
      return [
        value,
        (newValue: string) => {
          value = newValue;
          localStorageMock['person'] = value;
        },
      ];
    });

    render(<SearchForm onQuerySubmit={onQuerySubmit} />);

    const inputElement = screen.getByPlaceholderText(
      'Enter number from 1 to 826',
    ) as HTMLInputElement;
    const buttonElement = screen.getByRole('search-btn');

    userEvent.type(inputElement, '123');
    screen.debug();
    fireEvent.click(buttonElement);
    screen.debug();

    expect(localStorageMock['person']).toEqual('123');
    screen.debug();

    expect(onQuerySubmit).toHaveBeenCalledWith('123');
  });

  it('retrieves the value from local storage upon mounting', () => {
    const onQuerySubmit = vi.fn();

    (useLocalStorage as jest.Mock).mockImplementation(() => ['123', vi.fn()]);

    render(<SearchForm onQuerySubmit={onQuerySubmit} />);

    const inputElement = screen.getByPlaceholderText(
      'Enter number from 1 to 826',
    ) as HTMLInputElement;
    expect(inputElement.value).toBe('123');
  });
});
