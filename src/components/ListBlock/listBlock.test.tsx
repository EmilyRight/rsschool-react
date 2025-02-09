import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import List from './ListBlock';
import { testCards } from '../../mock/mockData';

const cards = [...testCards];

describe('List Component', () => {
  const mockOpenCard = vi.fn();

  it('renders "No cards available" when cards array is empty', () => {
    render(<List cards={[]} openCard={mockOpenCard} />);
    expect(screen.getByText('No cards available')).toBeInTheDocument();
  });

  it('renders "No cards available" when cards is null', () => {
    render(<List cards={null} openCard={mockOpenCard} />);
    expect(screen.getByText('No cards available')).toBeInTheDocument();
  });

  it('renders correct number of PersonCard components', () => {
    render(<List cards={cards} openCard={mockOpenCard} />);
    cards.forEach(card => {
      expect(screen.getByText(card.name)).toBeInTheDocument();
    });

    const cardElements = screen.getAllByRole('img');
    expect(cardElements).toHaveLength(cards.length);
  });
});
