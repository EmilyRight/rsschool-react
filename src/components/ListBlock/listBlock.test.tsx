// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import List from './ListBlock.tsx';
// import { describe, it, expect } from 'vitest';
// import { testCards } from '../../mock/mockData.ts';
// import { MemoryRouter } from 'react-router';

// describe('List Component', () => {
//   it('renders the specified number of cards', () => {
//     const cards = [...testCards];

//     render(
//       <MemoryRouter>
//         <List cards={cards} openCard={() => {}} />
//       </MemoryRouter>,
//     );
//     const renderedCards = screen.getAllByRole('card');
//     expect(renderedCards.length).toBe(3);
//   });

//   it('displays an appropriate message if no cards are present', () => {
//     render(
//       <MemoryRouter>
//         <List cards={null} openCard={() => {}} />
//       </MemoryRouter>,
//     );
//     const message = screen.getByText(/No cards available/i);
//     expect(message).toBeInTheDocument();
//   });
// });
