import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';

import { describe, it, expect, vi } from 'vitest';
import PersonCard from '../ListItem/ListItem';

const cardData = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  openCard: vi.fn(),
};

vi.mock('../../api/api', () => ({
  fetchItems: vi.fn(),
}));

describe('PersonCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders the card data', () => {
    render(
      <Router>
        <PersonCard {...cardData} />
      </Router>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    );
  });

  it('opens detailed card component on click', async () => {
    render(
      <Router>
        <PersonCard {...cardData} />
      </Router>,
    );
    const linkElement = screen.getByRole('card');
    fireEvent.click(linkElement);
    expect(cardData.openCard).toHaveBeenCalled();
  });

  it('triggers openCard function on click with correct id', async () => {
    render(
      <MemoryRouter>
        <PersonCard {...cardData} />
      </MemoryRouter>,
    );

    const card = screen.getByRole('card');
    await fireEvent.click(card);

    expect(cardData.openCard).toHaveBeenCalledWith(cardData.id);
  });
});
