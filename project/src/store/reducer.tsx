import {mockOffers} from '../mocks/offers';
import {Store} from '../types/store';
import {Actions, ActionType} from '../types/action';

const initialState: Store = {
  currentCity: 'Paris',
  offers: mockOffers,
};

const reducer = (state: Store = initialState, action: Actions): Store => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state, currentCity: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
