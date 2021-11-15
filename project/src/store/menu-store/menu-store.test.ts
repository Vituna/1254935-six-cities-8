import { menuReducer } from './menu-store';
import { City, PlacesSortType } from '../../types/offer';
import { changeCurrentCity, changePlacesSort } from '../action';

describe('Reducer: menu', () => {
  const state = {
    currentCity: 'Paris',
    typeSort: PlacesSortType.Popular,
  };

  it('should update curent city by current value currentCity', () => {

    expect(menuReducer(state, changeCurrentCity(City.Amsterdam)))
      .toEqual( {currentCity: City.Amsterdam, typeSort: PlacesSortType.Popular,
      },
      );
  });

  it('should update curent sort option by current value typeSort', () => {

    expect(menuReducer(state, changePlacesSort( PlacesSortType.Top)))
      .toEqual( {currentCity: City.Paris, typeSort: PlacesSortType.Top,
      },
      );
  });
});
