import { Offer } from '../../types/offer';
import { Stores } from '../../types/store';
import { StoreNameSpace } from '../root-reducer';

export const getFavoriteHotelItems = (store: Stores): Offer[] =>
  store[StoreNameSpace.favorite].favoritesHotels;
