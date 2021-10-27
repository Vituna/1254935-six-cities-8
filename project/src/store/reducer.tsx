import {Store} from '../types/store';
import {Actions, ActionType} from '../types/action';
import {PlacesSortType} from '../types/offer';
import {AuthorizationStatus} from '../const';

const initialState = {
  currentCity: 'Paris',
  hotels: [],
  typeSort: PlacesSortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isOffersLoaded: false,
};

const reducer = (state: Store = initialState, action: Actions): Store => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state, currentCity: action.payload,
      };
    case ActionType.ChangeSort:
      return {
        ...state, typeSort: action.payload,
      };
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth,
      };
    case ActionType.LoadHotels: {
      return {...state, hotels: action.payload, isOffersLoaded: false};
    }
    case ActionType.LoadOffersStart:
      return {
        ...state, isOffersLoaded: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
