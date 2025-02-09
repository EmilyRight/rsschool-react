import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

vi.mock('../../hooks/localStorage', () => ({
  default: () => ['', vi.fn()],
}));

describe('SearchForm component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saves the entered value to local storage upon clicking the Search button', async () => {
    const user = userEvent.setup();
    const onQuerySubmit = vi.fn();
    render(<SearchForm onQuerySubmit={onQuerySubmit} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    await user.type(inputElement, 'morty');
    await user.click(buttonElement);

    expect(onQuerySubmit).toHaveBeenCalledWith('morty');
  });

  it('retrieves the value from local storage upon mounting', () => {
    const onQuerySubmit = vi.fn();

    render(<SearchForm onQuerySubmit={onQuerySubmit} />);

    const inputElement = screen.getByPlaceholderText('Enter the name') as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });
});
