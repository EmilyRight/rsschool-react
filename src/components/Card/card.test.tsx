import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import * as ReactRedux from 'react-redux';
import Card from './Card';
import { testCard } from '../../mock/mockData';
import { ThemeProvider } from '../../ContextProvider/ContextProvider';
import { MAIN_PAGE_PATH } from '../../constants/constants';

const { name, gender, image, species, status } = testCard;
const Wrapper = ({ children }: { children: ReactNode }) => (
  <ReactRouterDom.BrowserRouter>
    <ThemeProvider>{children}</ThemeProvider>
  </ReactRouterDom.BrowserRouter>
);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('Card Component', () => {
  let mockDispatch: Mock;
  const spyNavigate = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();

    mockDispatch = vi.fn();
    vi.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(spyNavigate);
    const mockSearchParams = new URLSearchParams('?page=1');
    (ReactRouterDom.useSearchParams as unknown as jest.Mock).mockReturnValue([mockSearchParams]);
    (ReactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (ReactRedux.useSelector as unknown as jest.Mock).mockReturnValue({
      detailedCard: testCard,
    });
    vi.spyOn(ReactRouterDom, 'useParams').mockReturnValue({ id: '1' });
    vi.spyOn(ReactRedux, 'useSelector').mockReturnValue({ detailedCard: testCard });
  });

  it('should navigate when close button is clicked', () => {
    render(<Card />, { wrapper: Wrapper });

    const closeButton = screen.getByRole('close-card-btn');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(window.location.href).toBe(`http://localhost:3000${MAIN_PAGE_PATH}/?page=1`);
  });
});

it('should render the relevant card data', () => {
  render(<Card />, { wrapper: Wrapper });

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(gender)).toBeInTheDocument();
  expect(screen.getByText(species)).toBeInTheDocument();
  expect(screen.getByText(status)).toBeInTheDocument();
  const imgElement = screen.getByAltText('');
  expect(imgElement).toHaveAttribute('src', image);
});

it('should trigger additional API call when card is clicked', () => {
  const spyDispatch = vi.spyOn(ReactRedux, 'useDispatch');

  render(<Card />, { wrapper: Wrapper });
  const closeButton = screen.getByRole('close-card-btn');
  fireEvent.click(closeButton);

  expect(spyDispatch).toHaveBeenCalled();
});
