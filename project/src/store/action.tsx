import {ActionType, ChangeCurrentCityAction, ChangePlacesSortAction, LoadOffersStart, LoadOffersAction, ChangeCurrentEmailAction, LoadReviewsAction,
  LoadCurrentHotelAction, LoadCurrentHotelErrorAction, LoadNearHotelCompleteAction, SendReviewStatusAction, SetFavoriteHotelsAction, UpdateHotelAction,
  RedirectToRouteAction, UpdateCurrentOfferAction, UpdateFavoriteOffersAction, UpdateNearbyOffersAction, RequireAuthorizationAction, SetAuthInfoAction, RequireLogoutAction} from '../types/action';
import {Offer, OfferReview, UserInfo} from '../types/offer';
import {APIRoute, AuthorizationStatus, ReviewPostStatus} from '../const';

export const changeCurrentCity = (currentCity: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCity,
  payload: currentCity,
});

export const changePlacesSort = (typeSort: string): ChangePlacesSortAction => ({
  type: ActionType.ChangeSort,
  payload: typeSort,
});

export const requireAuthorization = (authInfo: AuthorizationStatus): RequireAuthorizationAction => ({
  type: ActionType.RequireAuthorization,
  payload: authInfo,
});

export const setAuthInfoAction = (authInfo: UserInfo): SetAuthInfoAction =>
  ({
    type: ActionType.SetAuthInfo,
    payload: authInfo,
  });

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});

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

export const updateCurrentOffer = (offer: Offer): UpdateCurrentOfferAction => ({
  type: ActionType.UpdateCurrentOffer,
  payload: offer,
});

export const updateNearbyOffers = (offer: Offer): UpdateNearbyOffersAction => ({
  type: ActionType.UpdateNearbyOffers,
  payload: offer,
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

export const updateFavoriteOffers = (offer: Offer): UpdateFavoriteOffersAction => ({
  type: ActionType.UpdateFavoriteOffers,
  payload: offer,
});

export const updateHotelAction = (hotel: Offer): UpdateHotelAction => ({
  type: ActionType.UpdateHotel,
  payload: hotel,
});

export const redirectToRoute = (url: APIRoute): RedirectToRouteAction => ({
  type: ActionType.RedirectToRoute,
  payload: url,
});
