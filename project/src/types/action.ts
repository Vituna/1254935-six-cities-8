import {Offer} from './offer';

export const enum ActionType {
  ChangeCity = 'app/changeCity',
  ChangeOffers = 'app/changeOffers',
}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type ChangeOffersAction = {
  type: ActionType.ChangeOffers;
  payload: Offer[];
}

export type Actions = ChangeCurrentCityAction | ChangeOffersAction;
