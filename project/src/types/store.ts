import {Offer, PlacesSortType, OfferReview} from './offer';
import {AuthorizationStatus, ReviewPostStatus} from '../const';

type Data = {
  email: string
}

export type Store = {
  currentCity: string,
  currentEmail: string,
  hotels: Offer[],
  currentHotel: Offer | null,
  reviews: OfferReview[],
  nearHotel: Offer[],
  typeSort: PlacesSortType,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOffersLoading: boolean,
  authInfo: Data,
  reviewPostStatus : ReviewPostStatus,
}
