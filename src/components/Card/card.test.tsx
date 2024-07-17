import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes} from 'react-router-dom';
import { afterEach, describe, it, expect, vi } from 'vitest';
import Card from './Card';
import MainPage from '../../pages/MainPage.tsx';
import { fetchItems } from '../../api/api.ts';
import { MAIN_PAGE_PATH } from '../../constants/constants.ts';


vi.mock('../../api/api.ts', () => {
  const originalModule = vi.importActual<typeof import('../../api/api.ts')>('../../api/api.ts');
  return {
    ...originalModule,
    fetchItems: vi.fn(),
  };
});

vi.mock('../../ContextProvider/ContextProvider.tsx', async () => {
  const actual = await vi.importActual<typeof import('../../ContextProvider/ContextProvider.tsx')>(
    '../../ContextProvider/ContextProvider.tsx',
  );
  return {
    ...actual,
    useAppContext: vi.fn(),
  };
});

type FetchItemsMock = jest.MockedFunction<typeof fetchItems>;
describe('Card Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays loading indicator while fetching data', () => {
    (fetchItems as FetchItemsMock).mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={[`${MAIN_PAGE_PATH}/:id`]}>
        <Routes>
          <Route path={`${MAIN_PAGE_PATH}`} element={<MainPage />}>
            <Route path={`${MAIN_PAGE_PATH}/:id`} element={<Card />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  // it('displays detailed card data correctly', async () => {
  //   const mockData = {
  //     image: 'http://example.com/image.jpg',
  //     name: 'Test Name',
  //     gender: 'Test Gender',
  //     species: 'Test Species',
  //     status: 'Test Status',
  //   };

  //   (fetchItems as FetchItemsMock).mockResolvedValue(mockData);

  //   render(
  //     <MemoryRouter initialEntries={[`${MAIN_PAGE_PATH}/:id`]}>
  //       <Routes>
  //         <Route path={`${MAIN_PAGE_PATH}`} element={<MainPage />}>
  //           <Route path={`${MAIN_PAGE_PATH}/:id`} element={<Card />} />
  //         </Route>
  //       </Routes>
  //     </MemoryRouter>,
  //   );

  //   expect(await screen.findByText(/test name/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/test name/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Test Gender/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Test Species/i)).toBeInTheDocument();
  //   expect(await screen.findByText(/Test Status/i)).toBeInTheDocument();
  // });

  // it('hides component when close button is clicked', async () => {
  //   const mockedUseAppContext = useAppContext as jest.MockedFunction<() => ContextValue>;
  //   mockedUseAppContext.mockReturnValue({
  //     toggleSingleCard: mockToggleSingleCard,
  //   });

  //   render(
  //     <MemoryRouter initialEntries={[`${MAIN_PAGE_PATH}/1`]}>
  //       <AppProvider>
  //         <Routes>
  //           <Route path={`${MAIN_PAGE_PATH}`} element={<MainPage />}>
  //             <Route path={`${MAIN_PAGE_PATH}/:id`} element={<Card />} />
  //           </Route>
  //         </Routes>
  //       </AppProvider>
  //       ,
  //     </MemoryRouter>,
  //   );

  //   const closeButton = await screen.findByRole('close-card-btn');
  //   expect(closeButton).toBeInTheDocument();
  //   fireEvent.click(closeButton);
  //   screen.debug();

  //   expect(mockToggleSingleCard).toHaveBeenCalled();
  // });
});
