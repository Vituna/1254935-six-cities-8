import {ActionType, ChangeCurrentCityAction, ChangePlacesSortAction, LoadOffersStart, LoadOffersAction, ChangeCurrentEmailAction, LoadReviewsAction, LoadCurrentHotelAction, LoadCurrentHotelErrorAction, LoadNearHotelCompleteAction, SendReviewStatusAction, SetFavoriteHotelsAction, UpdateHotelAction} from '../types/action';
import {Offer, OfferReview, UserInfo} from '../types/offer';
import {AuthorizationStatus, ReviewPostStatus} from '../const';

export const changeCurrentCity = (currentCity: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCity,
  payload: currentCity,
});

export const changePlacesSort = (typeSort: string): ChangePlacesSortAction => ({
  type: ActionType.ChangeSort,
  payload: typeSort,
});

export const requireAuthorization = (authInfo: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authInfo,
} as const);

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

export const loadCurrentHotelError = (): LoadCurrentHotelErrorAction => ({
  type: ActionType.LoadCurrentHotelError,
});

export const loadOffersStart = (): LoadOffersStart => ({
  type: ActionType.LoadOffersStart,
});

export const changeCurrentEmail = (currentEmail: string): ChangeCurrentEmailAction => ({
  type: ActionType.ChangeEmail,
  payload: currentEmail,
});

export const loadReviews = (reviews: OfferReview[]): LoadReviewsAction => ({
  type: ActionType.LoadReviews,
  payload: reviews,
});

export const sendReviewStatus = (reviewPostStatus: ReviewPostStatus): SendReviewStatusAction => ({
  type: ActionType.SendReviewStatus,
  payload: reviewPostStatus,
});

export const setFavoriteHotelsAction = (favoritesHotels: Offer[]): SetFavoriteHotelsAction => ({
  type: ActionType.SetFavoriteHotels,
  payload: favoritesHotels,
});

export const updateHotelAction = (hotel: Offer): UpdateHotelAction => ({
  type: ActionType.UpdateHotel,
  payload: hotel,
});

