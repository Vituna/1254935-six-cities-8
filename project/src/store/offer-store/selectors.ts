import { Stores } from '../../types/store';
import { StoreNameSpace } from '../root-reducer';
import { Offer } from '../../types/offer';

export const getCurrentHotel = (store: Stores): Offer | null =>
  store[StoreNameSpace.offer].currentHotel;

export const getHotels = (store: Stores): Offer[] =>
  store[StoreNameSpace.offer].hotels;

export const getNearHotel = (store: Stores): Offer[] =>
  store[StoreNameSpace.offer].nearHotel;

export const getIsOffersLoading = (store: Stores): boolean =>
  store[StoreNameSpace.offer].isOffersLoading;

export const getIsLoadCurrentHotelError = (store: Stores): boolean =>
  store[StoreNameSpace.offer].isLoadCurrentHotelError;
