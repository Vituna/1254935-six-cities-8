import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Stores } from '../types/store';
import { createAPI } from '../components/services/api';
import { APIRoute, AuthorizationStatus, ReviewPostStatus } from '../const';
import { fakeOffer, fakeOfferFromServer, fakeOffers, fakeOffersFromServer, fakeReviews, fakeReviewsFromServer, fakeUserAdapt, fakeUserFromServer } from '../utils/test-mocks';
import { loadCurrentHotel, loadHotels, loadNearHotelComplete, loadOffersStart, loadReviews, requireAuthorization, requireLogout, sendReviewStatus, setAuthInfoAction, setFavoriteHotelsAction } from './action';
import { checkAuthAction, fetchCurrentHotelAction, fetchHotelsAction, fetchNearHotelAction, fetchReviewsAction, loadFavoriteAction, loginAction, logoutAction, sendReviewAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import browserHistory from '../browser-history';

const ID_TEST = 1;

enum HttpCode {
  Ok = 200,
  NoContent = 204,
}

const fakeHistory = {
  location: {pathname: 0},
  go(path: number) {
    this.location.pathname = path;
  },
};
jest.mock('../browser-history', () => fakeHistory);


describe('Async actions', () => {
  const onUnauthorized = jest.fn();
  const api = createAPI(
    () => onUnauthorized(),
  );
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  Stores,
      Action,
      ThunkDispatch<Stores, typeof api, Action>
    >(middlewares);

  beforeEach(() => {
    fakeHistory.go(0);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(HttpCode.Ok, fakeUserFromServer, AuthorizationStatus.Auth);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions())
      .toEqual([setAuthInfoAction(fakeUserAdapt), requireAuthorization(AuthorizationStatus.Auth)]);
  });


  it('should dispatch LogOut when logoutAction', async () => {
    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();


    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(HttpCode.NoContent, fakeHistory.location.pathname);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());


    expect(store.getActions()).toEqual([
      requireLogout(),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch loginAction when POST /login', async () => {
    const fakeUser: AuthData = { login: 'vituna9@bk.ru', password: '12345' };

    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(HttpCode.Ok, fakeUserFromServer, AuthorizationStatus.Auth);
    browserHistory.go(0);

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token','secret');
  });

  it('should dispatch fetchHotelsAction when GET /offers', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(HttpCode.Ok, fakeOffersFromServer);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchHotelsAction());

    expect(store.getActions()).toEqual([
      loadOffersStart(),
      loadHotels(fakeOffers),
    ]);
  });

  it('should dispatch fetchNearHotelAction when GET /hotels/id/nearby', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Hotels}/${ID_TEST}/nearby`)
      .reply(HttpCode.Ok, fakeOffersFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearHotelAction(ID_TEST));

    expect(store.getActions())
      .toEqual([
        loadNearHotelComplete(fakeOffers),
      ]);
  });

  it('should dispatch fetchCurrentHotelAction when GET /hotels/id', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Hotels}/${ID_TEST}`)
      .reply(HttpCode.Ok, fakeOfferFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentHotelAction(ID_TEST));

    expect(store.getActions())
      .toEqual([
        loadCurrentHotel(fakeOffer),
      ]);
  });

  it('should dispatch fetchReviewsAction when GET /comments/id', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Reviews}/${ID_TEST}`)
      .reply(HttpCode.Ok, fakeReviewsFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsAction(ID_TEST));

    expect(store.getActions())
      .toEqual([
        loadReviews(fakeReviews)]);
  });

  it('should dispatch sendReviewAction, sendReviewStatus when POST /comments/id', async() => {
    const store = mockStore();

    mockAPI
      .onPost(`${APIRoute.Reviews}/${ID_TEST}`)
      .reply(HttpCode.Ok,  fakeReviewsFromServer);

    await store.dispatch(sendReviewAction({
      comment: 'Comment test',
      rating: 5,
    }, ID_TEST));

    expect(store.getActions())
      .toEqual([
        sendReviewStatus(ReviewPostStatus.Posting),
        loadReviews(fakeReviews),
        sendReviewStatus(ReviewPostStatus.Posted),
      ]);
  });

  it('should dispatch loadFavoriteAction when GET / favoriteOffers', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(HttpCode.Ok, fakeOffersFromServer);

    await store.dispatch(loadFavoriteAction());

    expect(store.getActions()).toEqual([
      setFavoriteHotelsAction(fakeOffers),
    ]);
  });
});
