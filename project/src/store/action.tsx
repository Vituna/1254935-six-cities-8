import {ActionType, ChangeCurrentCityAction, ChangePlacesSortAction, LoadOffersStart, LoadOffersAction} from '../types/action';
import {Offer, PlacesSortType} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const changeCurrentCity = (currentCity: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCity,
  payload: currentCity,
});

export const changePlacesSort = (typeSort: PlacesSortType): ChangePlacesSortAction => ({
  type: ActionType.ChangeSort,
  payload: typeSort,
});

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const loadHotels = (hotels: Offer[]): LoadOffersAction => ({
  type: ActionType.LoadHotels,
  payload: hotels,
});

export const loadOffersStart = (isOffersLoaded: boolean): LoadOffersStart => ({
  type: ActionType.LoadOffersStart,
  payload: isOffersLoaded,
});
