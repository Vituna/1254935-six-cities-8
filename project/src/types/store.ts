import {Offer, PlacesSortType, OfferReview} from './offer';
import {AuthorizationStatus, ReviewPostStatus} from '../const';
import { RootStore } from '../store/root-reducer';

export type Data = {
  email: string
  avatarUrl: string
}

export type MenuStore = {
  currentCity: string,
  typeSort: string,
}

export type AuthStore = {
  currentEmail: string,
  authorizationStatus: AuthorizationStatus,
  authInfo: Data,
  isDataLoaded: boolean,
}

export type OfferStore = {
  hotels: Offer[],
  currentHotel: Offer | null,
  nearHotel: Offer[],
  isOffersLoading: boolean,
  isLoadCurrentHotelError: boolean,
}

export type ReviewsStore = {
  reviews: OfferReview[],
  reviewPostStatus : ReviewPostStatus,
}

export type FavoriteStore = {
  favoritesHotels: Offer[] | [];
};

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

export type Stores = RootStore;
