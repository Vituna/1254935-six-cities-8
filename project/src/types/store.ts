import {Offer, PlacesSortType} from './offer';
import {AuthorizationStatus} from '../const';

export type Store = {
  currentCity: string,
  hotels: Offer[],
  typeSort: PlacesSortType,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isOffersLoaded: boolean,
}
