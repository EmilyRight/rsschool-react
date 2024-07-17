import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockedSetSearchParams = vi.fn();
  const mockedOnTogglePage = vi.fn();

  beforeEach(() => {
    const useSearchParamsMock = useSearchParams as jest.Mock;
    useSearchParamsMock.mockImplementation(() => [{ get: () => '1' }, mockedSetSearchParams]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should update URL query parameter when page changes', () => {
    render(
      <Pagination
        pages={10}
        setSearchParams={mockedSetSearchParams}
        onTogglePage={mockedOnTogglePage}
      />,
    );

    const page2 = screen.getByText('2');
    fireEvent.click(page2);

    expect(mockedSetSearchParams).toHaveBeenCalledWith({ page: '2' });
    expect(mockedOnTogglePage).toHaveBeenCalled();
  });

  test('should initialize with correct page based on URL search param', () => {
    const useSearchParamsMock = useSearchParams as jest.Mock;
    useSearchParamsMock.mockImplementation(() => [{ get: () => '3' }, mockedSetSearchParams]);

    render(
      <Pagination
        pages={10}
        setSearchParams={mockedSetSearchParams}
        onTogglePage={mockedOnTogglePage}
      />,
    );

    const activePage = screen.getByText('3');
    expect(activePage).toHaveClass('list__item active');
  });
});
