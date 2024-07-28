import { ReactNode } from 'react';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';

import { vi, it, expect, describe, beforeEach } from 'vitest';
import PersonCard, { TDetailedCardProps } from './ListItem';
import { ThemeProvider } from '../../ContextProvider/ContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { testCard } from '../../mock/mockData';
import { useGetPersonByIdQuery } from '../../redux/services/api';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  </BrowserRouter>
);

vi.mock('../../redux/services/api', async () => {
  const actual = await vi.importActual('../../redux/services/api');
  return {
    ...actual,
    useGetPersonByIdQuery: vi.fn(), //
  };
});

const mockUseGetPersonByIdQuery = useGetPersonByIdQuery as unknown as ReturnType<typeof vi.fn>;

describe('PersonCard Component', () => {
  beforeEach(() => {
    mockUseGetPersonByIdQuery.mockReturnValue({
      data: testCard,
      isLoading: false,
    });
  });

  afterEach(() => {
    mockUseGetPersonByIdQuery.mockRestore();
  });

  it('displays loading state initially', () => {
    mockUseGetPersonByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isSuccess: false,
    });

    render(<PersonCard cardId={1} />, { wrapper: Wrapper });
    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('renders the relevant card data', () => {
    const props: TDetailedCardProps = { cardId: 4 };
    mockUseGetPersonByIdQuery.mockReturnValue({
      data: testCard,
      isLoading: false,
      isSuccess: false,
    });
    render(<PersonCard cardId={props.cardId} />, { wrapper: Wrapper });

    const imgElement = screen.getByAltText('image');
    expect(imgElement).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    );
    expect(screen.getByText('Beth Smith')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('triggers an API call to fetch detailed information', () => {
    const props: TDetailedCardProps = { cardId: 1 };

    render(<PersonCard cardId={props.cardId} />, { wrapper: Wrapper });

    expect(useGetPersonByIdQuery).toHaveBeenCalledWith('1');
  });
});
