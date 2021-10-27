import { Link } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../types/action';
import {logoutAction} from '../../store/api-actions';


import {AuthorizationStatus} from '../../const';

type UserProps = {
  authorizationStatus: string;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logoutGame() {
    dispatch(logoutAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & UserProps;


function User(props: ConnectedComponentProps): JSX.Element {
  const {authorizationStatus, logoutGame} = props;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {AuthorizationStatus.Auth === authorizationStatus ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
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
export default connector(User);
