import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth } from '../../utils/test-mocks';
import Favorites from './favorites';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Component: Favorites', () => {

  it('should render all favorites places', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <Favorites />
        </Router>,
      </Provider>,
    );

    expect(screen.getAllByText(/night/i).length).toBe(storeAuth.FAVORITE.favoritesHotels.length);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
