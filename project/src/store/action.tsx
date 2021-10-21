import {ActionType, ChangeCurrentCityAction} from '../types/action';

export const changeCurrentCity = (currentCity: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCity,
  payload: currentCity,
});
