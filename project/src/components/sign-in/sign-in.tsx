import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { changeCurrentCity, changeCurrentEmail, redirectToRoute } from '../../store/action';
import { getAuthorizationStatus } from '../../store/auth-store/selectors';

import browserHistory from '../../browser-history';
import Logo from '../logo/logo';

import { getRandomCity, isEmailValid, isPasswordValid } from '../../utils';
import { APIRoute, AuthorizationStatus, Cities, EMAIL_VALIDATION_MESSAGE, PASSWORD_VALIDATION_MESSAGE } from '../../const';


const cities = Object.values(Cities);
const randomCity = getRandomCity(cities);

function SignIn(): JSX.Element {

  const dispatch = useDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);

  const passwordRef = useRef<HTMLInputElement | null>(null);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute(APIRoute.Main));
    browserHistory.go(0);
  }

  const handleCityLinkClick = (city: string) => {
    dispatch(changeCurrentCity(city));
  };

  const handleChangeEmail = () => {
    if (loginRef.current !== null) {
      const email = loginRef.current.value;
      const emailInput = loginRef.current;

      if (!isEmailValid(email)) {
        emailInput.setCustomValidity(EMAIL_VALIDATION_MESSAGE);
      } else {
        emailInput.setCustomValidity('');
      }
      emailInput.reportValidity();
    }
  };

  const handleValidityInput = () => {
    if (passwordRef.current !== null) {
      const password = passwordRef.current.value;
      const passwordInput = passwordRef.current;

      if (!isPasswordValid(password)) {
        passwordInput.setCustomValidity(PASSWORD_VALIDATION_MESSAGE);
      } else {
        passwordInput.setCustomValidity('');
      }
      passwordInput.reportValidity();
    }
    handleChangeEmail();
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({login: loginRef.current.value, password: passwordRef.current.value}));
      dispatch(changeCurrentEmail(loginRef.current.value));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} onChange={handleValidityInput} className="login__form form" action="#" method="post" >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" id="name" required/>
              </div>
              <div className="login__input-wrapper form__input-wraFpper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password"  id="password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit" >Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                onClick={() => handleCityLinkClick(randomCity)}
                className="locations__item-link"
                to={APIRoute.Main}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export  {SignIn};
export default SignIn;
