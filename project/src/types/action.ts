import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';

import {Store} from '../types/store';

import {Offer, OfferReview, UserInfo} from './offer';

import { APIRoute, AuthorizationStatus, ReviewPostStatus } from '../const';

export const enum ActionType {
  ChangeCity = 'app/changeCity',
  ChangeOffers = 'app/changeOffers',
  ChangeSort = 'app/changeSort',
  ChangeEmail = 'app/changeEmail',

  RequireAuthorization = 'user/requireAuthorization',
  SetAuthInfo = 'user/setAuthInfo',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'user/redirectToRoute',

  LoadHotels = 'data/loadHotels',
  LoadCurrentHotel = 'data/loadCurrentHotel',
  LoadNearHotelComplete = 'data/loadNearHotelComplete',
  LoadCurrentHotelError = 'data/loadCurrentOfferError',
  LoadOffersStart = 'data/loading',
  LoadReviews = 'data/loadReviews',
  SendReview = 'data/SendReview',
  SendReviewStatus = 'data/sendReviewStatus',
  UpdateHotel = 'data/updateHotel',
  FetchFavoriteHotels = 'data/fetchFavoriteHotels',
  SetFavoriteHotels = 'data/setFavoriteHotels',
  UpdateFavoriteOffers = 'data/updateFavoriteOffers',
  UpdateCurrentOffer = 'data/updateCurrentOffer',
  UpdateNearbyOffers = 'data/updateNearbyOffers',
}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type UpdateCurrentOfferAction = {
  type: ActionType.UpdateCurrentOffer,
  payload: Offer,
}

export type ChangeCurrentEmailAction = {
  type: ActionType.ChangeEmail;
  payload: string;
};


export type ChangeOffersAction = {
  type: ActionType.ChangeOffers;
  payload: Offer[];
}

export type ChangePlacesSortAction = {
  type: ActionType.ChangeSort;
  payload: string;
}

export type LoadOffersAction = {
  type: ActionType.LoadHotels,
  payload: Offer[],
}

export type LoadCurrentHotelAction = {
  type: ActionType.LoadCurrentHotel,
  payload: Offer,
}

export type LoadNearHotelCompleteAction = {
  type: ActionType.LoadNearHotelComplete,
  payload: Offer[],
}

export type LoadCurrentHotelErrorAction = {
  type: ActionType.LoadCurrentHotelError,
}

export type LoadOffersStart = {
  type: ActionType.LoadOffersStart,
}

export type LoadReviewsAction = {
  type: ActionType.LoadReviews,
  payload: OfferReview[],
}

export type SendReview = {
  type: ActionType.SendReview,
  payload: boolean,
}

export type SendReviewStatusAction = {
  type: ActionType.SendReviewStatus,
  payload: ReviewPostStatus,
}

export type SetFavoriteHotelsAction = ({
  type: ActionType.SetFavoriteHotels,
  payload: Offer[],
});

export type UpdateFavoriteOffersAction = {
  type: ActionType.UpdateFavoriteOffers,
  payload: Offer,
}

export type UpdateHotelAction =  ({
  type: ActionType.UpdateHotel,
  payload: Offer,
});

export type RedirectToRouteAction =({
  type: ActionType.RedirectToRoute,
  payload: APIRoute,
});

export type UpdateNearbyOffersAction = {
  type: ActionType.UpdateNearbyOffers,
  payload: Offer,
}

export type RequireAuthorizationAction = ({
  type: ActionType.RequireAuthorization,
  payload: AuthorizationStatus,
});

export type SetAuthInfoAction = ({
  type: ActionType.SetAuthInfo,
  payload: UserInfo,
});

export type RequireLogoutAction = ({
  type: ActionType.RequireLogout,
});

export type Actions = ChangeCurrentCityAction | ChangeOffersAction | ChangePlacesSortAction | RequireAuthorizationAction | SetAuthInfoAction | RequireLogoutAction |
LoadOffersAction | LoadOffersStart | ChangeCurrentEmailAction | LoadReviewsAction | LoadCurrentHotelAction | LoadCurrentHotelErrorAction | LoadNearHotelCompleteAction |
SendReview | SendReviewStatusAction | SetFavoriteHotelsAction | UpdateHotelAction | RedirectToRouteAction | UpdateCurrentOfferAction | UpdateFavoriteOffersAction | UpdateNearbyOffersAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, Store, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<Store, AxiosInstance, Actions>;
