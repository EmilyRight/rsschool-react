import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import List from './ListBlock';
import { TCard } from '../../types/types';
import * as ContextProvider from '../../ContextProvider/ContextProvider';
import { testCards } from '../../mock/mockData';
import { vi } from 'vitest';

vi.mock('../ListItem/ListItem', () => ({
  default: ({ cardId }: { cardId: string }) => <div data-testid="person-card">{cardId}</div>,
}));

describe('List component', () => {
  vi.spyOn(ContextProvider, 'useTheme').mockReturnValue({ theme: 'light', toggleTheme: () => {} });
  it('renders the specified number of cards', () => {
    const cards: TCard[] = testCards;
    render(<List cardsList={cards} />);

    const renderedCards = screen.getAllByTestId('person-card');
    expect(renderedCards).toHaveLength(cards.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(<List cardsList={[]} />);
    const noCardsMessage = screen.getByText(/no cards available/i);
    expect(noCardsMessage).toBeInTheDocument();
  });
});
