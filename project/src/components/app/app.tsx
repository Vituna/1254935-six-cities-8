import { useSelector } from 'react-redux';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getAuthorizationStatus, getIsDataLoaded } from '../../store/auth-store/selectors';

import PrivateRoute from '../private-route/private-route';
import Preloader from '../loading-screen/loading-screen';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Property from '../property/property';
import NoFound from '../no-found/no-found';

import { isCheckedAuth } from '../../utils';
import { APIRoute } from '../../const';

const browserHistory = createBrowserHistory();

function App(): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <Preloader />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={APIRoute.Main}>
          <Main />
        </Route>
        <Route exact path={APIRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute
          exact
          path={APIRoute.Favorite}
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
    </BrowserRouter>
  );
}

export {App};
export default App;
