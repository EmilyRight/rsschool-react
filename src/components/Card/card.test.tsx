import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card.tsx';
import { MAIN_PAGE_PATH } from '../../constants/constants.ts';
import userEvent from '@testing-library/user-event';

const mockFetchItems = vi.fn();
vi.mock('../../api/api', () => ({
  fetchItems: () => mockFetchItems(),
}));

const mockCharacterData = {
  id: 1,
  image: 'http://example.com/image.jpg',
  name: 'Test Name',
  gender: 'Test Gender',
  species: 'Test Species',
  status: 'Test Status',
};

describe('Card component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={[`${MAIN_PAGE_PATH}1?page=1`]}>
        <Routes>
          <Route path={`${MAIN_PAGE_PATH}:id`} element={<Card />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('shows loading indicator while fetching data', () => {
    mockFetchItems.mockImplementation(() => new Promise(() => {}));
    renderComponent();

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('displays character details after loading', async () => {
    mockFetchItems.mockResolvedValue(mockCharacterData);
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText(mockCharacterData.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacterData.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacterData.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacterData.status)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacterData.image);
  });

  it('closes the card when clicking the close button', async () => {
    const user = userEvent.setup();
    mockFetchItems.mockResolvedValue(mockCharacterData);
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const closeButton = screen.getByRole('close-card-btn');
    await user.click(closeButton);

    expect(screen.queryByTestId('person-card')).not.toBeInTheDocument();
  });

  it('navigates to error page when fetch fails', async () => {
    mockFetchItems.mockRejectedValue(new Error('Fetch failed'));
    const { container } = renderComponent();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    expect(container.innerHTML).toBe('');
  });
});
