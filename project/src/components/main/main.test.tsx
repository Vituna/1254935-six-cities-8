import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { storeAuth, storeNoAuth } from '../../utils/test-mocks';
import Main from './main';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

describe('Component: Main', () => {

  describe('has offers', () => {

    it('should render correctly', () => {

      const {container} = render(
        <Provider store={mockStore(storeAuth)}>
          <Router history={history}>
            <Main />
          </Router>,
        </Provider>,
      );

      expect(container.querySelector('.cities')).toBeInTheDocument();
    });
  });

  describe('empty', () => {
    it('should render correctly', () => {

      render(
        <Provider store={mockStore(storeNoAuth)}>
          <Router history={history}>
            <Main />
          </Router>,
        </Provider>,
      );

      expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    });
  });
});

