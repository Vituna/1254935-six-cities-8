import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { City } from '../../types/offer';
import MainEmpty from './main-empty';

const history = createMemoryHistory();

describe('Component: MainEmpty', () => {

  it('should render correctly', () => {

    render(
      <Router history={history}>
        <MainEmpty currentCity={City.Paris}/>
      </Router>);

    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });
});
