
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader component', () => {
  it('should render the Loader component correctly', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveTextContent('Loading...');
  });
});
