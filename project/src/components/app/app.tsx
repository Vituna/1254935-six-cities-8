import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import NoFound from '../no-found/no-found';

import { APIRoute } from '../../const';

function App(): JSX.Element {

  return (
    <Switch>
      <Route exact path={APIRoute.Main}>
        <Main />
      </Route>
      <Route exact path={APIRoute.Login}>
        <SignIn />
      </Route>
      <PrivateRoute
        exact
        path={APIRoute.Favorites}
        render={() => <Favorites />}
      >
      </PrivateRoute>
      <Route exact path={'/offer/:id'}>
        <Property />
      </Route>
      <Route>
        <NoFound />
      </Route>
    </Switch>
  );
}

export {App};
export default App;
