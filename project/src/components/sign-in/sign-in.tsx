import {useRef, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {loginAction} from '../../store/api-actions';
import Logo from '../logo/logo';
import {ThunkAppDispatch} from '../../types/action';
import {AuthData} from '../../types/auth-data';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignIn(props: PropsFromRedux): JSX.Element {
  const {onSubmit} = props;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value,
      });
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
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>

                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} id="name" required/>

              </div>
              <div className="login__input-wrapper form__input-wraFpper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} id="password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={() => history.push('/')}>Sign in</button>
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
export default connector(SignIn);
