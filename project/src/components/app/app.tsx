import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {useState} from 'react';

import {AuthorizationStatus, cities, PlacesSort} from '../../const';
import {Offers} from '../../types/offer';

import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import NoFound from '../no-found/no-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offers[]
}

function App({offers}: AppProps): JSX.Element {

  const [focusedCard, setFocusedCard] = useState<Offers | undefined>(undefined);

  const onListItemHover = (listItemName: string) => {
    const currentPoint = offers.find((offer) => offer.title === listItemName);
    setFocusedCard(currentPoint);
  };


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <Main offers={offers} cities={cities} placesSort={PlacesSort} authorizationStatus={AuthorizationStatus.Auth} focusedCard={focusedCard} onListItemHover={onListItemHover}/>
        </Route>
        <Route exact path={'/login'}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={'/favorites'}
          render={() => <Favorites offers={offers} authorizationStatus={AuthorizationStatus.Auth} onListItemHover={onListItemHover} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={'/offer/:id'}>
          <Property offers={offers} authorizationStatus={AuthorizationStatus.Auth} focusedCard={focusedCard} onListItemHover={onListItemHover}/>
        </Route>
        <Route>
          <NoFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
