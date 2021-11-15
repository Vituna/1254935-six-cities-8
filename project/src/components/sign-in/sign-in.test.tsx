import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { storeNoAuth } from '../../utils/test-mocks';
import SignIn from './sign-in';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: SignIn', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore(storeNoAuth)}>
        <Router history={history}>
          <SignIn />
        </Router>,
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'vituna');
    userEvent.type(screen.getByPlaceholderText(/Password/i), '123456');

    expect(screen.getByDisplayValue(/vituna/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
