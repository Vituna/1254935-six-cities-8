import { Data, Stores } from '../../types/store';
import { StoreNameSpace } from '../root-reducer';

import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (store: Stores): AuthorizationStatus =>
  store[StoreNameSpace.auth].authorizationStatus;

export const getCurrentEmail = (store: Stores): string =>
  store[StoreNameSpace.auth].currentEmail;

export const getAuthInfo = (store: Stores): Data =>
  store[StoreNameSpace.auth].authInfo;

export const getIsDataLoaded = (store: Stores): boolean =>
  store[StoreNameSpace.auth].isDataLoaded;

