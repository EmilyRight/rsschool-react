import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { MAIN_PAGE_PATH } from './constants/constants';

vi.mock('./pages/MainPage.tsx', () => ({
  default: vi.fn(() => <div>Main Page</div>),
}));

vi.mock('./components/ErrorPage/ErrorPage.tsx', () => ({
  default: vi.fn(() => <div>Error Page</div>),
}));

vi.mock('./components/Card/Card.tsx', () => ({
  default: vi.fn(() => <div role="card">Card Component</div>),
}));

describe('App component', () => {
  it('renders MainPage inside ErrorBoundary for MAIN_PAGE_PATH', () => {
    render(
      <MemoryRouter initialEntries={[MAIN_PAGE_PATH]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  it('renders ErrorPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-path']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Error Page')).toBeInTheDocument();
  });
});
