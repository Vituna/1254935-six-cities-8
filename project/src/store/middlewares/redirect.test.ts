import { AnyAction } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { redirectToRoute } from '../action';
import { APIRoute } from '../../const';
import { redirect } from './redirect';
import { Stores } from '../../types/store';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<Stores, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(APIRoute.Login));
    expect(fakeHistory.location.pathname).toBe(APIRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(APIRoute.Login),
    ]);
  });

  it('should not to be redirect /lose because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: APIRoute.Favorites});
    expect(fakeHistory.location.pathname).not.toBe(APIRoute.Favorites);
  });
});
