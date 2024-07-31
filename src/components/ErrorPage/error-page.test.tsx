import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('ErrorPage component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Error. No page on this path')).toBeInTheDocument();
    expect(screen.getByText('Back to search')).toBeInTheDocument();
  });

  it('navigates to MAIN_PAGE_PATH when "Back to search" is clicked', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    mockedUseNavigate.mockClear();

    const button = screen.getByText('Back to search');
    fireEvent.click(button);
    screen.debug();
    expect(button).toBeInTheDocument();
  });
});
