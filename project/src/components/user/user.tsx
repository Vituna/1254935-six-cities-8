import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '../../store/api-actions';

import {AuthorizationStatus} from '../../const';
import { getAuthInfo, getAuthorizationStatus, getCurrentEmail } from '../../store/auth-store/selectors';

function User(): JSX.Element {

  const currentEmail = useSelector(getCurrentEmail);
  const authInfo = useSelector(getAuthInfo);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const logoutGame = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {AuthorizationStatus.Auth === authorizationStatus ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                <img className="header__avatar-wrapper user__avatar-wrapper" src={authInfo.avatarUrl} alt="avatar" />
                <span className="header__user-name user__name">{currentEmail || authInfo.email}</span>
              </Link>
            </li>
            <li className="header__nav-item" onClick={(evt) => {
              evt.preventDefault();

              logoutGame();
            }}
            >
              <Link className="header__nav-link" to="/login">
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={'/login'}>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export {User};
export default User;
