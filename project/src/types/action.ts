import {Offer, PlacesSortType} from './offer';
import { requireAuthorization, requireLogout } from '../store/action';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {Store} from '../types/store';

export const enum ActionType {
  ChangeCity = 'app/changeCity',
  ChangeOffers = 'app/changeOffers',
  ChangeSort = 'app/changeSort',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadHotels = 'data/loadHotels',
  LoadOffersStart = 'data/loading',

}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCity;
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

export type LoadOffersStart = {
  type: ActionType.LoadOffersStart,
  payload: boolean,
}

export type Actions = ChangeCurrentCityAction | ChangeOffersAction | ChangePlacesSortAction | ReturnType<typeof requireAuthorization> | ReturnType<typeof requireLogout> | LoadOffersAction | LoadOffersStart;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, Store, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<Store, AxiosInstance, Actions>;
