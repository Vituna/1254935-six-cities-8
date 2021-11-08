import { Stores } from '../../types/store';
import { StoreNameSpace } from '../root-reducer';

export const getCurrentCity = (store: Stores): string =>
  store[StoreNameSpace.menu].currentCity;

export const getTypeSort = (store: Stores): string =>
  store[StoreNameSpace.menu].typeSort;
