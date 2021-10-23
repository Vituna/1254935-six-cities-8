import {ActionType, ChangeCurrentCityAction, ChangePlacesSortAction} from '../types/action';

export const changeCurrentCity = (currentCity: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCity,
  payload: currentCity,
});

export const changePlacesSort = (typeSort: string): ChangePlacesSortAction => ({
  type: ActionType.ChangeSort,
  payload: typeSort,
});
