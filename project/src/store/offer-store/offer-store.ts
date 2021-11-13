import { Actions, ActionType } from '../../types/action';
import { OfferStore } from '../../types/store';

const initialState: OfferStore = {
  currentHotel: null,
  hotels: [],
  nearHotels: [],
  isOffersLoading: false,
  isLoadCurrentHotelError: false,
};

export const offerReducer = (state = initialState, action: Actions): OfferStore => {
  switch (action.type) {
    case ActionType.LoadCurrentHotel:
      return {
        ...state,
        currentHotel: action.payload,
      };
    case ActionType.LoadHotels:
      return {
        ...state,
        hotels: action.payload,
        isOffersLoading: false,
      };
    case ActionType.LoadNearHotelComplete:
      return {
        ...state,
        nearHotels: action.payload,
      };
    case ActionType.LoadOffersStart:
      return {
        ...state,
        isOffersLoading: true,
      };
    case ActionType.LoadCurrentHotelError:
      return {
        ...state,
        isLoadCurrentHotelError: true,
      };
    case ActionType.UpdateCurrentOffer:
      return {
        ...state,
        currentHotel: action.payload,
      };
    case ActionType.UpdateNearbyOffers:
      return {
        ...state,
        nearHotels: state.nearHotels.map((offer) => {
          if (offer.id !== action.payload.id) {
            return offer;
          }
          return action.payload;
        }),
      };
    case ActionType.UpdateHotel:
      return {
        ...state,
        hotels: state.hotels.map((offer) => {
          if (offer.id !== action.payload.id) {
            return offer;
          }
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
