import {Offer, PlacesSortType, OfferReview} from './offer';
import {AuthorizationStatus} from '../const';

export type Store = {
  currentCity: string,
  currentEmail: string,
  hotels: Offer[],
  currentHotel: Offer | any,
  reviews: OfferReview[],
  nearHotel: Offer[],
  typeSort: PlacesSortType,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOffersLoading: boolean,
  authInfo: any,
}
