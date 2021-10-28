import {Offer, OfferReview, PlacesSortType} from './offer';
import { requireAuthorization, requireLogout, setAuthInfoAction } from '../store/action';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {Store} from '../types/store';

export const enum ActionType {
  ChangeCity = 'app/changeCity',
  ChangeOffers = 'app/changeOffers',
  ChangeSort = 'app/changeSort',
  RequireAuthorization = 'user/requireAuthorization',
  SetAuthInfo = 'user/setAuthInfo',

  RequireLogout = 'user/requireLogout',
  LoadHotels = 'data/loadHotels',
  LoadCurrentHotel = 'data/loadCurrentHotel',
  LoadNearHotelComplete = 'data/loadNearHotelComplete',
  LoadCurrentOfferError = 'data/loadCurrentOfferError',
  LoadOffersStart = 'data/loading',
  ChangeEmail = 'app/changeEmail',
  LoadReviews = 'data/loadReviews',
  SendReview = 'data/SendReview',

}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

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
  payload: PlacesSortType;
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

export type LoadCurrentOfferErrorAction = {
  type: ActionType.LoadCurrentOfferError,
}

export type LoadOffersStart = {
  type: ActionType.LoadOffersStart,
  payload: boolean,
}

export type LoadReviewsAction = {
  type: ActionType.LoadReviews,
  payload: OfferReview[],
}

export type SendReview = {
  type: ActionType.SendReview,
  payload: boolean,
}

export type Actions = ChangeCurrentCityAction | ChangeOffersAction | ChangePlacesSortAction | ReturnType<typeof requireAuthorization> | ReturnType<typeof requireLogout> | ReturnType<typeof setAuthInfoAction> |
LoadOffersAction | LoadOffersStart | ChangeCurrentEmailAction | LoadReviewsAction | LoadCurrentHotelAction | LoadCurrentOfferErrorAction | LoadNearHotelCompleteAction | SendReview;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, Store, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<Store, AxiosInstance, Actions>;
