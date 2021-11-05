import { AuthorizationStatus } from '../../const';
import { Actions, ActionType } from '../../types/action';
import { AuthStore } from '../../types/store';

const initialState: AuthStore = {
  currentEmail: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: {email: '', avatarUrl: ''},
  isDataLoaded: false,
};

export const authReducer = (state = initialState, action: Actions): AuthStore => {
  switch (action.type) {
    case ActionType.ChangeEmail:
      return {
        ...state, currentEmail: action.payload,
      };
    case ActionType.RequireAuthorization:
      return {
        ...state, authorizationStatus: action.payload, isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {
        ...state, authorizationStatus: AuthorizationStatus.NoAuth,
      };
    case ActionType.SetAuthInfo: {
      const userData = action.payload;
      return { ...state, authInfo: userData };
    }

    default:
      return state;
  }
};
