import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pagination from './Pagination';
import { describe, it, expect } from 'vitest';
import { store } from '../../redux/store';
import { ThemeProvider } from '../../ContextProvider/ContextProvider';

describe('Pagination component', () => {
  it('should update URL query parameter when page changes', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Pagination />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>,
    );

    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);
    expect(window.location.search).toBe('?page=2');
  });
});
