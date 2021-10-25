import {Offer} from './offer';

export const enum ActionType {
  ChangeCity = 'app/changeCity',
  ChangeOffers = 'app/changeOffers',
  ChangeSort = 'app/changeSort'
}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type ChangeOffersAction = {
  type: ActionType.ChangeOffers;
  payload: Offer[];
}

export type ChangePlacesSortAction = {
  type: ActionType.ChangeSort;
  payload: string;
}

export type Actions = ChangeCurrentCityAction | ChangeOffersAction | ChangePlacesSortAction;
