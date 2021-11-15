
import { Router as BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { createAPI } from '../services/api';
import { storeAuth, storeNoAuth } from '../../utils/test-mocks';
import { APIRoute } from '../../const';
import App from './app';

const onUnauthorized = jest.fn();
const api = createAPI(
  () => onUnauthorized(),
);
const history = createMemoryHistory();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Application Routing', () => {
  it('should render "Main-Page" when user navigate to "/"', () => {
    history.push(APIRoute.Main);

    render(
      <Provider store={mockStore(storeAuth)}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "Login-Page" when user navigate to "/login"', () => {
    history.push(APIRoute.Login);

    render(
      <Provider store={mockStore(storeNoAuth)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render "Favorites-Page" when user navigate to "/favorites"', () => {
    history.push(APIRoute.Favorites);

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('The Pondhouse - A Magical Place')).toBeInTheDocument();
  });

  it('should render "Offer-Page" when user navigate to "/offer/:id"', () => {
    history.push('/offer/1');

    render(
      <Provider store={mockStore(storeAuth)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "Not-Found-Page" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(
      <Provider store={mockStore(storeNoAuth)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('404. Requested page is not available')).toBeInTheDocument();
  });
});


