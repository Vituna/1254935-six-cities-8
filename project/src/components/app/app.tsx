import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {AuthorizationStatus, cities} from '../../const';
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
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <Main offers={offers} cities={cities} authorizationStatus={AuthorizationStatus.Auth} />
        </Route>
        <Route exact path={'/login'}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={'/favorites'}
          render={() => <Favorites offers={offers} authorizationStatus={AuthorizationStatus.Auth} />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={'/offer/:id'}>
          <Property authorizationStatus={AuthorizationStatus.Auth} />
        </Route>
        <Route>
          <NoFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
