import Logo from '../logo/logo';
import User from '../user/user';

type HeaderProps = {
  authorizationStatus: string;
}

function Header(props: HeaderProps): JSX.Element {

  const {authorizationStatus} = props;


  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">

            <Logo />

          </div>

          <User authorizationStatus={authorizationStatus}/>

        </div>
      </div>
    </header>
  );
}

export default Header;
