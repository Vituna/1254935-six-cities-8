import { favoriteReducer } from './favorite-store';
import { setFavoriteHotelsAction } from '../action';
import { ActionType } from '../../types/action';
import { fakeFavoritesOffers} from '../../utils/test-mocks';

const hotel = fakeFavoritesOffers;

describe('Reducer: favoriteReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoriteReducer(void 0, {type: ActionType.SetFavoriteHotels, payload: hotel,
    }))
      .toEqual({favoritesHotels: hotel});
  });

  it('should update Hotels', () => {
    const state = {favoritesHotels: []};
    expect(favoriteReducer(state, setFavoriteHotelsAction(hotel)))
      .toEqual({favoritesHotels: hotel});
  });
});
