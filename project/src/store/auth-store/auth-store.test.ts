import { fakeUserAdapt } from '../../utils/test-mocks';
import { authReducer } from './auth-store';
import { AuthorizationStatus } from '../../const';
import { requireLogout, setAuthInfoAction } from '../action';

describe('Reducer: offersReducer', () => {

  it('should update authorizationStatus to "AUTH" on successful authorization', () => {
    const state = {
      currentEmail: '',
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: fakeUserAdapt,
      isDataLoaded: false,
    };
    expect(authReducer(state, setAuthInfoAction(fakeUserAdapt)))
      .toEqual({
        currentEmail: '',
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeUserAdapt,
        isDataLoaded: false,
      });
  });

  it('should update authorizationStatus to "NOAUTH" when the user logs out', () => {
    const state = {
      currentEmail: '',
      authorizationStatus: AuthorizationStatus.NoAuth,
      authInfo: {email: '', avatarUrl: ''},
      isDataLoaded: false,
    };
    expect(authReducer(state, requireLogout()))
      .toEqual({
        currentEmail: '',
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: {email: '', avatarUrl: ''},
        isDataLoaded: false,
      });
  });

});
