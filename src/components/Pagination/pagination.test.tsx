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
  const defaultProps = {
    pages: 5,
    isNewSearch: false,
    setSearchParams: mockedSetSearchParams,
  };
  beforeEach(() => {
    const useSearchParamsMock = useSearchParams as jest.Mock;
    useSearchParamsMock.mockImplementation(() => [{ get: () => '1' }, mockedSetSearchParams]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should update URL query parameter when page changes', () => {
    render(<Pagination {...defaultProps} />);
    const nextBtn = screen.getByRole('next');
    fireEvent.click(nextBtn);
    expect(mockedSetSearchParams).toHaveBeenCalledWith({ page: '2' });
  });
});
