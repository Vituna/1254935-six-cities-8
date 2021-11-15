import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth, storeNoAuth } from '../../utils/test-mocks';
import User from './user';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component User', () => {

  it('should render altText "6 cities" and "Sign Out" for AuthStatus.Auth', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <User />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  it('should render altText "6 cities" and "Sign In" for AuthStatus.NoAuth', () => {

    render(
      <Provider store={mockStore(storeNoAuth)}>
        <Router history={history}>
          <User />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
