import { Link } from 'react-router-dom';
import {AuthorizationStatus} from '../../const';

type UserProps = {
  authorizationStatus: string;
}

function User(props: UserProps): JSX.Element {
  const {authorizationStatus} = props;

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
            <li className="header__nav-item">
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

export default User;

// import { Link } from 'react-router-dom';
// import {AuthorizationStatus} from '../../const';

// type UserProps = {
//   authorizationStatus: string;
// }

// function User(props: UserProps): JSX.Element {
//   const { authorizationStatus } = props;

//   return (
//     <nav className="header__nav">
//       <ul className="header__nav-list">
//         {AuthorizationStatus.Auth === authorizationStatus ? (
//           <>
//             <li className="header__nav-item user">
//               <Link className="header__nav-link header__nav-link--profile" to={'/favorites'}>
//                 <div className="header__avatar-wrapper user__avatar-wrapper"></div>
//                 <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
//               </Link>
//             </li>
//             <li className="header__nav-item">
//               <a className="header__nav-link" href="#!">
//                 <span className="header__signout">Sign out</span>
//               </a>
//             </li>
//           </>
//         ) : (
//           <li className="header__nav-item user">
//             <Link className="header__nav-link header__nav-link--profile" to={'/login'}>
//               {/* <div className="header__avatar-wrapper user__avatar-wrapper"></div> */}
//               <span className="header__login">Sign in</span>
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default User;
