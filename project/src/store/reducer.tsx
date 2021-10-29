import {Store} from '../types/store';
import {Actions, ActionType} from '../types/action';
import {PlacesSortType} from '../types/offer';
import {AuthorizationStatus} from '../const';

const initialState = {
  currentCity: 'Paris',
  currentHotel: null,
  currentEmail: '',
  hotels: [],
  reviews: [],
  nearHotel: [],
  typeSort: PlacesSortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: {},
  isDataLoaded: false,
  isOffersLoading: false,
};

const reducer = (state: Store = initialState, action: Actions): Store => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state, currentCity: action.payload,
      };
    case ActionType.ChangeEmail:
      return {
        ...state, currentEmail: action.payload,
      };
    case ActionType.ChangeSort:
      return {
        ...state, typeSort: action.payload,
      };
    case ActionType.RequireAuthorization:
      return {
        ...state, authorizationStatus: action.payload, isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {
        ...state, authorizationStatus: AuthorizationStatus.NoAuth,
      };
    case ActionType.SetAuthInfo: {
      const userData = action.payload;

      return { ...state, authInfo: userData };
    }
    case ActionType.LoadHotels:
      return {
        ...state, hotels: action.payload, isOffersLoading: false,
      };
    case ActionType.LoadCurrentHotel:
      return {
        ...state, currentHotel: action.payload,
      };
    case ActionType.LoadReviews:
      return {
        ...state, reviews: action.payload,
      };
    case ActionType.LoadNearHotelComplete:
      return {
        ...state, nearHotel: action.payload,
      };
    case ActionType.LoadOffersStart:
      return {
        ...state, isOffersLoading: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
