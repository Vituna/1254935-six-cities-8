import {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../store/api-actions';
import Logo from '../logo/logo';
import {changeCurrentEmail} from '../../store/action';
import {AuthorizationStatus, EMAIL_VALIDATION_MESSAGE, EMAIL_VALID_REGEX, PASSWORD_VALIDATION_MESSAGE, PASSWORD_VALID_REGEX} from '../../const';
import { Redirect } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/auth-store/selectors';

const isEmailValid = (email: string) => EMAIL_VALID_REGEX.test(String(email).toLowerCase());
const isPasswordValid = (password: string) => PASSWORD_VALID_REGEX.test(String(password).toLowerCase());

function SignIn(): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const email = evt?.currentTarget?.value;
    const emailInput = evt?.target;

    if (!isEmailValid(email)) {
      emailInput.setCustomValidity(EMAIL_VALIDATION_MESSAGE);
    } else {
      emailInput.setCustomValidity('');
    }

    emailInput.reportValidity();
    setEmailValue(email);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e?.currentTarget?.value;
    const passwordInput = e?.target;

    if (!isPasswordValid(password)) {
      passwordInput.setCustomValidity(PASSWORD_VALIDATION_MESSAGE);
    } else {
      passwordInput.setCustomValidity('');
    }

    passwordInput.reportValidity();
    setPasswordValue(password);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailValue !== null && passwordValue !== null) {
      dispatch(loginAction({login: emailValue, password: passwordValue}));
      dispatch(changeCurrentEmail(emailValue));
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Redirect to={'/'} />;
  }

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
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post" >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>

                <input value={emailValue} onChange={handleChangeEmail} className="login__input form__input" type="email" name="email" placeholder="Email" id="name" required/>

              </div>
              <div className="login__input-wrapper form__input-wraFpper">
                <label className="visually-hidden">Password</label>
                <input value={passwordValue} onChange={handleChangePassword} className="login__input form__input" type="password" name="password" placeholder="Password"  id="password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit" >Sign in</button>
            </form>

          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export  {SignIn};
export default SignIn;
