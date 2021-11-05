import { Actions, ActionType } from '../../types/action';
import { PlacesSortType } from '../../types/offer';
import { MenuStore } from '../../types/store';

const initialState: MenuStore = {
  currentCity: 'Paris',
  typeSort: PlacesSortType.Popular,
};

export const menuReducer = (state = initialState, action: Actions): MenuStore => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state, currentCity: action.payload,
      };
    case ActionType.ChangeSort:
      return {
        ...state, typeSort: action.payload,
      };
    default:
      return state;
  }
};
