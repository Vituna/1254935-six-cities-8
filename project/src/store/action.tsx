import {ActionType, ChangeCurrentCityAction, ChangePlacesSortAction, LoadOffersStart, LoadOffersAction, ChangeCurrentEmailAction, LoadReviewsAction, LoadCurrentHotelAction, LoadCurrentOfferErrorAction, LoadNearHotelCompleteAction} from '../types/action';
import {Offer, OfferReview, PlacesSortType} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const changeCurrentCity = (currentCity: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCity,
  payload: currentCity,
});

export const changePlacesSort = (typeSort: PlacesSortType): ChangePlacesSortAction => ({
  type: ActionType.ChangeSort,
  payload: typeSort,
});

export const requireAuthorization = (authInfo: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authInfo,
} as const);

export type UserInfo = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
};

export const setAuthInfoAction = (authInfo: UserInfo) =>
  ({
    type: ActionType.SetAuthInfo,
    payload: authInfo,
  } as const);


export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const loadHotels = (hotels: Offer[]): LoadOffersAction => ({
  type: ActionType.LoadHotels,
  payload: hotels,
});

export const loadCurrentHotel = (currentHotel: Offer): LoadCurrentHotelAction => ({
  type: ActionType.LoadCurrentHotel,
  payload: currentHotel,
});

export const loadNearHotelComplete = (nearbyOffers: Offer[]): LoadNearHotelCompleteAction => ({
  type: ActionType.LoadNearHotelComplete,
  payload: nearbyOffers,
});

export const loadCurrentOfferError = (): LoadCurrentOfferErrorAction => ({
  type: ActionType.LoadCurrentOfferError,
});

export const loadOffersStart = (isOffersLoaded: boolean): LoadOffersStart => ({
  type: ActionType.LoadOffersStart,
  payload: isOffersLoaded,
});

export const changeCurrentEmail = (currentEmail: string): ChangeCurrentEmailAction => ({
  type: ActionType.ChangeEmail,
  payload: currentEmail,
});

export const loadReviews = (reviews: OfferReview[]): LoadReviewsAction => ({
  type: ActionType.LoadReviews,
  payload: reviews,
});

export const sendReview = (status: unknown) => ({
  type: ActionType.SendReview,
  payload: status,
});


