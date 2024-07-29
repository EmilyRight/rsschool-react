import { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { clearFavorites } from '../../redux/slices/favorites';
import Flyout from './Flyout';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../ContextProvider/ContextProvider';
import { store } from '../../redux/store';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  </BrowserRouter>
);

vi.mock('react-redux', async () => {
  const actualModule = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actualModule,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock('./pathToYourActions', () => ({
  clearFavorites: vi.fn(),
}));

describe('Flyout', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockReturnValue({ favorites: [{ id: 1, name: 'Rick' }] });
  });

  it('renders the component correctly', () => {
    render(<Flyout />, { wrapper: Wrapper });
    expect(screen.getByText('1 item(s) are selected')).toBeInTheDocument();
  });

  it('отображение Flyout зависит от списка избранного', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ favorites: [] });
    const { rerender } = render(<Flyout />, { wrapper: Wrapper });
    expect(screen.queryByText('item(s) are selected')).not.toBeInTheDocument();

    (useSelector as unknown as jest.Mock).mockReturnValue({ favorites: [{ id: 1, name: 'Rick' }] });
    rerender(<Flyout />);
    expect(screen.getByText('1 item(s) are selected')).toBeInTheDocument();
  });

  it('кнопка "Unselect all" вызывает соответствующую функцию', () => {
    render(<Flyout />, { wrapper: Wrapper });
    const button = screen.getByText('Unselect all');
    fireEvent.click(button);
    expect(dispatchMock).toHaveBeenCalledWith(clearFavorites());
  });

  it('ссылка "Download" вызывает функцию загрузки при наличии избранного', () => {
    Object.defineProperty(global, 'URL', {
      writable: true,
      value: {
        createObjectURL: vi.fn().mockReturnValue('blob:url'),
      },
    });

    render(<Flyout />, { wrapper: Wrapper });
    const downloadLink = screen.getByText('Download');

    fireEvent.click(downloadLink);
    // После клика состояние должно обновиться и содержать url для загрузки
    expect(screen.getByText('Download')).toHaveAttribute('href', 'blob:url');
  });

  it('ссылка "Download" не вызывает функцию загрузки, если избранное пустое', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ favorites: [] });
    render(<Flyout />, { wrapper: Wrapper });
    const downloadLink = screen.getByText('Download');
    fireEvent.click(downloadLink);
    expect(downloadLink).not.toHaveAttribute('href', 'blob:url');
  });
});
