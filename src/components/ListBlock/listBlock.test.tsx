import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import List from './ListBlock';
import { TCard } from '../../types/types';

import { testCards } from '../../mock/mockData';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { ReactNode } from 'react';
import { ThemeProvider } from '../../ContextProvider/ContextProvider';
import { Provider } from 'react-redux';

vi.mock('../ListItem/ListItem', () => ({
  default: ({ cardId }: { cardId: string }) => <div data-testid="person-card">{cardId}</div>,
}));
const Wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  </BrowserRouter>
);

describe('List component', () => {
  it('renders the specified number of cards', () => {
    const cards: TCard[] = testCards;
    render(<List cardsList={cards} />, { wrapper: Wrapper });

    const renderedCards = screen.getAllByTestId('person-card');
    expect(renderedCards).toHaveLength(cards.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(<List cardsList={[]} />, { wrapper: Wrapper });
    const noCardsMessage = screen.getByText(/no cards available/i);
    expect(noCardsMessage).toBeInTheDocument();
  });
});
