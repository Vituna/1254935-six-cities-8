import { Router } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth } from '../../utils/test-mocks';
import Logo from './logo';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

describe('Component: Logo', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <Logo />
        </Router>,
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
