import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

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

describe('PersonCard Component', () => {
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

  it('opens detailed card component on click', () => {
    render(
      <Router>
        <PersonCard {...cardData} />
      </Router>,
    );
    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);
    expect(cardData.openCard).toHaveBeenCalled();
  });

  // it('triggers an additional API call on click to fetch detailed information', async () => {

  // });
});
