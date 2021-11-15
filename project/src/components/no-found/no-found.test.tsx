import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth } from '../../utils/test-mocks';
import NoFound from './no-found';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component NoFound', () => {

  it('should render ByText "404. Requested page is not available" for NoFound', () => {

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <NoFound />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/404. Requested page is not available/i)).toBeInTheDocument();
  });
});
