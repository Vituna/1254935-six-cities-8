import {connect, ConnectedProps} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {useState} from 'react';

import {AuthorizationStatus, cities, PlacesSort} from '../../const';
import {Offer} from '../../types/offer';

// import Preloader from '../loading-screen/loading-screen';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import NoFound from '../no-found/no-found';
import PrivateRoute from '../private-route/private-route';
import {Store} from '../../types/store';

import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({hotels, authorizationStatus, isDataLoaded, isOffersLoaded}: Store) => ({
  authorizationStatus,
  isDataLoaded,
  hotels,
  isOffersLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {hotels: offers, authorizationStatus} = props;

  const [focusedCard, setFocusedCard] = useState<Offer | undefined>(undefined);

  // if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
  //   return (
  //     <Preloader />
  //   );
  // }
  // if (isOffersLoaded) {
  //   <Preloader />;
  // }


  const onListItemHover = (listItemName: string) => {
    const currentPoint = offers.find((offer) => offer.title === listItemName);
    setFocusedCard(currentPoint);
  };

  const onListItemLeave = () => {
    setFocusedCard(undefined);
  };

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={'/'}>
          <Main cities={cities} placesSort={PlacesSort} authorizationStatus={authorizationStatus} focusedCard={focusedCard} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
        </Route>
        <Route exact path={'/login'}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={'/favorites'}
          render={() => <Favorites offers={offers} authorizationStatus={authorizationStatus} onListItemHover={onListItemHover}  onListItemLeave={onListItemLeave}/>}
        >
        </PrivateRoute>
        <Route exact path={'/offer/:id'}>
          <Property offers={offers} authorizationStatus={authorizationStatus} focusedCard={focusedCard} onListItemHover={onListItemHover} onListItemLeave={onListItemLeave}/>
        </Route>
        <Route>
          <NoFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
