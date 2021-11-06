import { Actions, ActionType } from '../../types/action';
import { FavoriteStore } from '../../types/store';

const initialState: FavoriteStore = {
  favoritesHotels: [],
};

export const favoriteReducer = (state = initialState, action: Actions): FavoriteStore => {
  switch (action.type) {
    case ActionType.SetFavoriteHotels:
      return {
        ...state,
        favoritesHotels: action.payload,
      };
    case ActionType.UpdateFavoriteOffers:
      return {
        ...state,
        favoritesHotels: state.favoritesHotels.map((offer) => {
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
