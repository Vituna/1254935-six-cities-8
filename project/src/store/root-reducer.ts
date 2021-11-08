import { combineReducers } from 'redux';
import { authReducer } from './auth-store/auth-store';
import { favoriteReducer } from './favorite-store/favorite-store';
import { menuReducer } from './menu-store/menu-store';
import { offerReducer } from './offer-store/offer-store';
import { reviewsReducer } from './reviews-store/reviews-store';

export enum StoreNameSpace {
  menu = 'MENU',
  auth = 'AUTH',
  offer = 'OFFER',
  reviews = 'REVIEWS',
  favorite = 'FAVORITE'
}

export const rootReducer = combineReducers({
  [StoreNameSpace.menu]: menuReducer,
  [StoreNameSpace.auth]: authReducer,
  [StoreNameSpace.offer]: offerReducer,
  [StoreNameSpace.reviews]: reviewsReducer,
  [StoreNameSpace.favorite]: favoriteReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;

