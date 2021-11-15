import { render, screen } from '@testing-library/react';
import Preloader from './loading-screen';

describe('Preloader', () => {

  it('render Loading', () => {
    render(<Preloader />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
