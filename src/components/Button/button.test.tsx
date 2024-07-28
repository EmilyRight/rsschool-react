import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

vi.mock('../../ContextProvider/ContextProvider.tsx', () => ({
  useTheme: () => ({ theme: 'dark' }),
}));

describe('Button Component', () => {
  it('should assign class from props', () => {
    const { container } = render(<Button text="Click me" className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class btn btn_dark');
  });

  it('should trigger action on click', () => {
    const actionMock = vi.fn();
    render(<Button text="Click me" className="custom-class" action={actionMock} />);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it('should display text from props', () => {
    render(<Button text="Submit" className="custom-class" />);
    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });

  it('should set type from props when provided', () => {
    render(<Button text="Click me" className="custom-class" type="submit" />);
    const button = screen.getByText('Click me');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should set role from props when provided', () => {
    render(<Button text="Click me" className="custom-class" role="button" />);
    const button = screen.getByText(/Click me/i);
    expect(button).toHaveAttribute('role', 'button');
  });
});
